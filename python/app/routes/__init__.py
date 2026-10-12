# routes package
from app.routes.pages import router as page_router
from app.routes.recognize import router as recognize_router

__all__ = ["page_router", "recognize_router"]
