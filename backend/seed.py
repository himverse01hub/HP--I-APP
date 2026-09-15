from app.database import SessionLocal
from app.models import User, RoleEnum
from app.auth import get_password_hash
import sys

def seed():
    db = SessionLocal()
    existing = db.query(User).filter(User.username == "admin").first()
    if not existing:
        user = User(
            username="admin",
            email="admin@hpoi.gov.in",
            role=RoleEnum.SUPER_ADMIN,
            hashed_password=get_password_hash("admin123")
        )
        db.add(user)
        db.commit()
        print("Admin user created")
    else:
        print("Admin already exists")
    db.close()

if __name__ == "__main__":
    seed()
