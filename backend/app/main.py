# backend/app/main.py
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from typing import List
import re
import os
from pathlib import Path
from app.models import QuestionnaireRequest, EligibilityResponse, OCRRequest, OCRResponse
from app.eligibility import calculate_eligibility
from app.pdf_utils import render_benefit_summary_to_html, generate_pdf_from_html
from app.config import settings

app = FastAPI(title="BenefitsFinder API", version="1.0.0")

origins = [o.strip() for o in settings.API_ALLOWED_ORIGINS.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {
        "message": "BenefitsFinder API",
        "version": "1.0.0",
        "endpoints": ["/api/eligibility", "/api/ocr", "/api/pdf"]
    }


@app.post("/api/eligibility", response_model=EligibilityResponse)
def check_eligibility(questionnaire: QuestionnaireRequest):
    """
    Calculate benefit eligibility based on questionnaire responses.
    """
    try:
        eligible_benefits: List = calculate_eligibility(questionnaire)
        return EligibilityResponse(eligible_benefits=eligible_benefits, user_data=questionnaire)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/ocr", response_model=OCRResponse)
def process_ocr_text(request: OCRRequest):
    """
    Extract structured data from OCR text.
    Simple regex-based extraction for demo purposes.
    """
    text = request.text or ""

    # Extract name (best-effort)
    name = None
    # look for lines starting 'Name:' or typical capitalized full names
    name_patterns = [
        r"Name[:\s]+([A-Z][a-zA-Z]+\s+[A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?)",
        r"([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+){1,2})"
    ]
    for pattern in name_patterns:
        match = re.search(pattern, text)
        if match:
            name = match.group(1).strip()
            break

    # Extract income (look for dollar amounts)
    income = None
    income_patterns = [
        r"\$?([\d,]+\.?\d*)\s*(?:per|/)\s*(?:year|annually)",
        r"Income[:\s]+\$?([\d,]+\.?\d*)",
        r"\$\s*([\d,]+\.?\d*)"
    ]
    for pattern in income_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            income_str = match.group(1).replace(",", "")
            try:
                income = float(income_str)
                break
            except ValueError:
                pass

    # Extract address (very simplified)
    address = None
    address_pattern = r"\d+\s+[A-Za-z0-9\.\s\,\-]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Court|Ct)"
    match = re.search(address_pattern, text, re.IGNORECASE)
    if match:
        address = match.group(0).strip()

    return OCRResponse(name=name, income=income, address=address)


@app.post("/api/pdf")
def create_benefit_pdf(questionnaire: QuestionnaireRequest):
    """
    Create a PDF summary for the provided questionnaire and return path to download the PDF.
    """
    try:
        benefits = calculate_eligibility(questionnaire)
        user = questionnaire.model_dump()
        # optionally add name if provided via extra fields in future

        html = render_benefit_summary_to_html(user, [b.model_dump() for b in benefits])

        out_dir = Path("tmp")
        out_dir.mkdir(parents=True, exist_ok=True)
        filename = f"benefit_summary_{questionnaire.zip_code}_{questionnaire.age}.pdf"
        output_path = out_dir / filename

        generate_pdf_from_html(html, str(output_path))

        return FileResponse(path=str(output_path), filename=filename, media_type="application/pdf")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF generation failed: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
