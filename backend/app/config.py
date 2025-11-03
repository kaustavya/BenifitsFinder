# backend/app/config.py
from pydantic import BaseSettings


class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    API_ALLOWED_ORIGINS: str = "http://localhost:3000"
    HOST: str = "0.0.0.0"
    PORT: int = 8080

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
