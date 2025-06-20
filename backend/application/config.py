import os

from dotenv import load_dotenv

load_dotenv()


class Config:
    # Local envs
    DEBUG = True if os.getenv("DEBUG") == "True" else False
    PORT = int(os.getenv("PORT") or "5001")

    # General envs
    basedir = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI")
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_pre_ping': True
    }
    DATABASE_SCHEMA = os.getenv("DATABASE_SCHEMA")
    CORS_ORIGINS = ["http://localhost:3000", "https://localhost:3000"]

    # JWT
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES"))
    JWT_REFRESH_TOKEN_EXPIRES = int(os.getenv("JWT_REFRESH_TOKEN_EXPIRES"))
    JWT_SESSION_COOKIE = False
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_COOKIE_CSRF_PROTECT = False
    JWT_COOKIE_SECURE = True
    JWT_COOKIE_SAMESITE = "None"

    # Pagination
    PAGINATION_LIMIT = 100

    # SendGrid
    SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
    SENDGRID_SENDER_EMAIL = os.getenv("SENDGRID_SENDER_EMAIL")
    SENDGRID_SENDER_NAME = os.getenv("SENDGRID_SENDER_NAME")
    SENDGRID_TEMPLATE_FORGOT_PASSWORD = os.getenv("SENDGRID_TEMPLATE_FORGOT_PASSWORD")
    SENDGRID_TEMPLATE_NEW_USER = os.getenv("SENDGRID_TEMPLATE_NEW_USER")
    SENDGRID_TEMPLATE_ACCOUNT_CREATED = os.getenv("SENDGRID_TEMPLATE_ACCOUNT_CREATED")
    SENDGRID_TEMPLATE_PROJECT_CREATED = os.getenv("SENDGRID_TEMPLATE_PROJECT_CREATED")

    # Scaleway
    SCALEWAY_ACCESS_KEY = os.getenv("SCALEWAY_ACCESS_KEY")
    SCALEWAY_SECRET_KEY = os.getenv("SCALEWAY_SECRET_KEY")

    # Object storage
    BUCKET_ENDPOINT = os.getenv("BUCKET_ENDPOINT")
    BUCKET_SDG_FOLDER = os.getenv("BUCKET_SDG_FOLDER")
    BUCKET_PROJECT_IMAGES_FOLDER = os.getenv("BUCKET_PROJECT_IMAGES_FOLDER")

    # Blockchain
    CONTRACT_ABI = os.getenv("CONTRACT_ABI")
    ALCHEMY_URL = os.getenv("ALCHEMY_URL")
    CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")
    PUBLIC_KEY_METAMASK = os.getenv("PUBLIC_KEY_METAMASK")
    PRIVATE_KEY_METAMASK = os.getenv("PRIVATE_KEY_METAMASK")

    # BlurHash
    BLURHASH_IMG_MAX_SIZE = 32
    BLURHASH_COMPONENTS_X = 4
    BLURHASH_COMPONENTS_Y = 3
