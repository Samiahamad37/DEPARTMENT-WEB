#!/bin/bash
python manage.py migrate
python manage.py collectstatic --noinput
gunicorn csmdepartment.wsgi:application --bind 0.0.0.0:${PORT:-8000}