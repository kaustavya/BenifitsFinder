# backend/app/benefits_data.py
from typing import List
from app.models import Benefit

# Mock data for demonstration. Replace/extend with real programs per state/region.
CALIFORNIA_BENEFITS = [
    Benefit(
        id="calfresh",
        name="CalFresh (Food Assistance)",
        description="Monthly food assistance for low-income individuals and families",
        estimated_amount="$200-$600/month",
        confidence_score=0.0,
        requirements=[
            "California resident",
            "Income below 200% Federal Poverty Level",
            "U.S. Citizen or eligible immigrant"
        ],
        application_url="https://www.getcalfresh.org/",
        documents_needed=[
            "Photo ID",
            "Proof of income (pay stubs, tax returns)",
            "Proof of address (utility bill, lease)",
            "Social Security numbers for household"
        ]
    ),
    Benefit(
        id="liheap",
        name="LIHEAP (Energy Assistance)",
        description="Help with heating and cooling costs for eligible households",
        estimated_amount="$300-$1,000/year",
        confidence_score=0.0,
        requirements=[
            "California resident",
            "Income at or below 60% of state median",
            "Recent utility bill"
        ],
        application_url="https://www.csd.ca.gov/energybills",
        documents_needed=[
            "Photo ID",
            "Recent utility bill",
            "Proof of income",
            "Social Security numbers"
        ]
    ),
    Benefit(
        id="calworks",
        name="CalWORKs (Cash Aid & Employment)",
        description="Cash assistance and employment services for families with children",
        estimated_amount="$500-$1,000/month",
        confidence_score=0.0,
        requirements=[
            "California resident",
            "Have at least one child under 18",
            "Income below program limits",
            "Participate in work activities"
        ],
        application_url="https://www.cdss.ca.gov/calworks",
        documents_needed=[
            "Photo ID",
            "Birth certificates for children",
            "Proof of income",
            "School enrollment records"
        ]
    )
]


def get_all_benefits() -> List[Benefit]:
    return CALIFORNIA_BENEFITS
