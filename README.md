# Vitrine NeuroMat

## Deployment

This section explains how to deploy the application on a production server running inside an LXC container.

---

### Overview

- **App Server (`vitrine` container)**: Runs the Flask app via Gunicorn.
- **Proxy Server (`proxy-apache` container)**: Runs Apache and forwards requests to the Flask app. It is out-of-scope for this document.

---

### Environment dependencies

- Python >=3.9
- pip >= 23.0

### Steps

1. Create and activate the virtual environment as `venv`:
```sh
python3 -m venv venv
source venv/bin/activate
```

1. Install the requirements:
```sh
pip install -r requirements.txt
```

1. Run gunicorn:
```sh
nohup gunicorn --bind 0.0.0.0:8000 wsgi:app > gunicorn.log 2>&1 &
```
