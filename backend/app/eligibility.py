# backend/app/eligibility.py
from typing import List
from app.models import QuestionnaireRequest, Benefit
from app.benefits_data import get_all_benefits

# Simplified Federal Poverty Level numbers (example values)
FPL_2024 = {
    "1": 15060,
    "2": 20440,
    "3": 25820,
    "4": 31200,
    "5+": 36580
}


def calculate_eligibility(questionnaire: QuestionnaireRequest) -> List[Benefit]:
    """
    Mock eligibility logic for demonstration.
    Returns a list of Benefit objects with confidence_score populated.
    """
    eligible_benefits: List[Benefit] = []
    all_benefits = get_all_benefits()

    # Map household_size to FPL key
    household_key = questionnaire.household_size.value
    fpl = FPL_2024.get(household_key, FPL_2024["1"])

    # Avoid division by zero
    if fpl == 0:
        income_to_fpl_ratio = float('inf')
    else:
        income_to_fpl_ratio = questionnaire.annual_income / fpl

    for benefit in all_benefits:
        confidence = 0.0

        if benefit.id == "calfresh":
            # CalFresh: income < 200% FPL
            if income_to_fpl_ratio < 2.0:
                confidence = min(95.0, max(0.0, 100.0 - (income_to_fpl_ratio * 30.0)))
            else:
                confidence = 0.0

        elif benefit.id == "liheap":
            # LIHEAP: income < 150% FPL typically
            if income_to_fpl_ratio < 1.5:
                confidence = min(90.0, max(0.0, 95.0 - (income_to_fpl_ratio * 40.0)))
            else:
                confidence = 0.0

        elif benefit.id == "calworks":
            # CalWORKs: families with children, very low income
            if questionnaire.has_children and income_to_fpl_ratio < 1.0:
                confidence = min(85.0, max(0.0, 90.0 - (income_to_fpl_ratio * 50.0)))
            else:
                confidence = 0.0

        # Optionally extend: adjust confidence if veteran/disabled
        if questionnaire.is_veteran:
            confidence = min(100.0, confidence + 5.0)
        if questionnaire.is_disabled:
            confidence = min(100.0, confidence + 5.0)

        if confidence > 30.0:
            # copy benefit dict to avoid mutating global mock
            b = Benefit(**benefit.model_dump())
            b.confidence_score = round(confidence, 1)
            eligible_benefits.append(b)

    # sort descending by confidence
    eligible_benefits.sort(key=lambda x: x.confidence_score, reverse=True)
    return eligible_benefits[:10]  # cap to top 10
