"""
healthcare_bot URL Configuration
"""

from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django.templatetags.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('chat/', include('chatbot.urls')),
    path('location/', include('location.urls')),
    path('admin-panel/', include('admin_panel.urls')),
    path('', RedirectView.as_view(url='/chat/', permanent=False), name='home'),
    path('favicon.ico', RedirectView.as_view(url=static('favicon.jpeg'), permanent=True)),
]
