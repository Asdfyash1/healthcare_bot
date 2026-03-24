from django.urls import path
from . import views

urlpatterns = [
    path('doctors-page/', views.doctors_page, name='doctors_page'),
    path('hospitals-page/', views.hospitals_page, name='hospitals_page'),
    path('nearby-doctors/', views.nearby_places, {'place_type': 'doctor'}, name='nearby_doctors'),
    path('nearby-hospitals/', views.nearby_places, {'place_type': 'hospital'}, name='nearby_hospitals'),
]
