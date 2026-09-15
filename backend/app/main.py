from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import auth_router

# Create database tables (using sync engine, safe for local SQLite testing)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Haryana Police OSINT Intelligence Platform",
    description="Backend API for OSINT & Intelligence Dashboard",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)

@app.get("/")
def read_root():
    return {"message": "HP-OI API is running"}
