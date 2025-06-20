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
    origins = os.getenv("CORS_ORIGINS")
    if origins:
        CORS_ORIGINS = [origin.strip() for origin in origins.split(",") if origin.strip()]
    else:
        CORS_ORIGINS = [
            "http://localhost:3000",
            "https://localhost:3000",
            "http://localhost:3001",
        ]

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
    SENDGRID_API_KEY = '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'
    SENDGRID_SENDER_EMAIL = 'rafal.kuzniczuk.practice@300brains.com'
    SENDGRID_SENDER_NAME = 'Carbon'
    SENDGRID_TEMPLATE_FORGOT_PASSWORD = 'd-a6067bf57b534a21905abd79050f580e'
    SENDGRID_TEMPLATE_NEW_USER = 'd-2a58183cc70640898f1b6dc1dd361c29'
    SENDGRID_TEMPLATE_ACCOUNT_CREATED = 'd-a85287525a68423cbe5de88550fd1ef3'
    SENDGRID_TEMPLATE_PROJECT_CREATED = 'd-5b8d63989f3440ed8c34df53254c53a7'

    # Scaleway
    SCALEWAY_ACCESS_KEY = 'SCW18ZF5YGVVC10F7S6Y'
    SCALEWAY_SECRET_KEY = '0dc46338-365f-420f-9245-e16941e8bd6f'

    # Object storage
    BUCKET_ENDPOINT = 'https://carbon.s3.pl-waw.scw.cloud'
    BUCKET_SDG_FOLDER = 'sdg'
    BUCKET_PROJECT_IMAGES_FOLDER = 'project_images'

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
