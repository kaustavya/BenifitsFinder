# backend/app/models.py
from pydantic import BaseModel
from typing import Optional, List
from enum import Enum


class HouseholdSize(str, Enum):
    ONE = "1"
    TWO = "2"
    THREE = "3"
    FOUR = "4"
    FIVE_PLUS = "5+"


class QuestionnaireRequest(BaseModel):
    age: int
    zip_code: str
    annual_income: float
    household_size: HouseholdSize
    has_children: bool
    is_veteran: bool = False
    is_disabled: bool = False


class Benefit(BaseModel):
    id: str
    name: str
    description: str
    estimated_amount: str
    confidence_score: float  # 0-100
    requirements: List[str]
    application_url: str
    documents_needed: List[str]


class EligibilityResponse(BaseModel):
    eligible_benefits: List[Benefit]
    user_data: QuestionnaireRequest


class OCRRequest(BaseModel):
    text: str


class OCRResponse(BaseModel):
    name: Optional[str]
    income: Optional[float]
    address: Optional[str] 

