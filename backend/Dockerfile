FROM python:3.11

ENV PYTHONUNBUFFERED 1

WORKDIR /app
COPY . .

RUN pip install --upgrade pip >/dev/null 2>&1
RUN pip install --root-user-action=ignore -r requirements.txt

EXPOSE 8000
RUN chmod +x gunicorn_run.sh
#ENTRYPOINT ["tail -f /dev/null"]
ENTRYPOINT ["./gunicorn_run.sh"]
