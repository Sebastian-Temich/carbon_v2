#!/bin/sh
gunicorn main:app -w 1 -b 0.0.0.0:8000 --timeout 120
