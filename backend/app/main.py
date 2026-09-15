from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import auth_router
import os

# Create database tables (using sync engine, safe for local SQLite testing)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Haryana Police OSINT Intelligence Platform",
    description="Backend API for OSINT & Intelligence Dashboard",
    version="1.0.0"
)

cors_origins = [
    origin.strip()
    for origin in os.getenv(
        "BACKEND_CORS_ORIGINS",
        "http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174",
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)

@app.get("/")
def read_root():
    return {"message": "HP-OI API is running"}
