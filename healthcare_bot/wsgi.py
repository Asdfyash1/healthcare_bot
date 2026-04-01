"""
WSGI config for healthcare_bot project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application
from django.core.management import call_command

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'healthcare_bot.settings')

application = get_wsgi_application()

# --- Instant Fix: Run migrations automatically on startup ---
try:
    print("--- [CureX] Performing instant startup migrations ---")
    call_command('migrate', no_input=True)
except Exception as e:
    print(f"--- [CureX] Startup migration skipped/failed: {e} ---")
