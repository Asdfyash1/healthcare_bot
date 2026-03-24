"""
healthcare_bot URL Configuration
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('chat/', include('chatbot.urls')),
    path('location/', include('location.urls')),
    path('admin-panel/', include('admin_panel.urls')),
]
