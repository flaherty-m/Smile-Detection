import os
import json
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://mflaherty:password@localhost:5432/smile-detection")
engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class DetectionEvent(Base):
    __tablename__ = 'DetectionEvents'
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    image_filename = Column(String, nullable=False)
    coordinates = Column(Text)

def init_db():
    Base.metadata.create_all(bind=engine)

def save_detection_event(image_filename, coords):
    session = SessionLocal()
    event = DetectionEvent(
        image_filename=image_filename,
        coordinates=json.dumps(coords)
    )
    session.add(event)
    session.commit()
    session.close()