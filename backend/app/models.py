# backend/app/models.py
from pydantic import BaseModel
from typing import Optional, List
from enum import Enum
from sqlalchemy import Column, Integer, String, JSON, TIMESTAMP, ForeignKey
from sqlalchemy.orm import declarative_base

Base = declarative_base()

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


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(255))
    age = Column(Integer)
    created_at = Column(TIMESTAMP)


class EligibilitySubmission(Base):
    __tablename__ = 'eligibility_submissions'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=True)
    submission_data = Column(JSON, nullable=False)
    created_at = Column(TIMESTAMP)

# app/models.py
from sqlalchemy import Column, Integer, String, Float, Boolean, Text
from .database import Base

class BenefitORM(Base):
    __tablename__ = "benefits"

    id = Column(Integer, primary_key=True, index=True)
    benefit_id = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text)
    estimated_amount = Column(String)
    confidence_score = Column(Float, default=0)
    requirements = Column(Text)
    application_url = Column(String)
    documents_needed = Column(Text)
    is_active = Column(Boolean, default=True)
