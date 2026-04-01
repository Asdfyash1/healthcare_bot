"""
CureX Healthcare Bot — URL Configuration
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('chatbot.urls')),
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('location/', include('location.urls')),
    path('admin-panel/', include('admin_panel.urls')),
]
