# Carbon

---

## Prerequisites

- **Python:** 3.8.10

---

## Example env file

```bash
# Local envs
DEBUG=True
PORT=5001
# General envs
DATABASE_URI=postgresql://postgres:password@localhost:5432/carbon-local
DATABASE_SCHEMA=carbon
ALCHEMY_URL=https://polygon-mumbai.g.alchemy.com/v2/hbC1_OolTgS2r3-oPFBa9-sZwpjuiofw
CONTRACT_ADDRESS=0x76b575E1e7adBB79219ec56C6cc2E9b987C25ae2
PUBLIC_KEY_METAMASK=0x70E1969d1207729778ee6Da5Db4b27cD6f8c20ab
PRIVATE_KEY_METAMASK=67e2eaa8ea5ed0355dc22cdc1bf477f44d1e1af759dcd84fcc643fc70a78b5f9
JWT_SECRET_KEY=hu&uLODkRLig~OrAwkcg7OLr9gVF,$P7Y;,t'jO;u$dSyyfPlk
JWT_ACCESS_TOKEN_EXPIRES=3600
JWT_REFRESH_TOKEN_EXPIRES=86400
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

- **Local envs** - works only on local environment when app started directly by python
- **General envs** - have impact on environment started with gunicorn

---

## How to run app

### Enter venv and install deps

```bash
. venv/bin/activate
python3 -m pip install -r requirements.txt
```

### Run locally with debug options

```bash
python3 main.py
```

### Run on dev, staging, prod etc.

```bash
./gunicorn_run.sh
```

---

## Migrations

You have to be in venv to run it

### Migration commands

```bash
alembic upgrade head
alembic revision -m "migration_name" --autogenerate
```

---

## Dockerfile

Docker image doesn't include any envs. It's just general image of application. When you want to host application in
specific environment, then just inject envs into container while starting.

---

## Infrastructure

[Go to infrastructure docs](./infrastrcture/README.md)