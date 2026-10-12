# recognition package
from app.recognition.ocr import configure_tesseract, extract_text, prepare_for_ocr, tesseract_config

__all__ = ["configure_tesseract", "extract_text", "prepare_for_ocr", "tesseract_config"]
