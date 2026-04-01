from django.urls import path
from . import views

urlpatterns = [
    path('manage-qa/', views.manage_qa, name='manage_qa'),
    path('add-qa/', views.add_qa, name='add_qa'),
    path('edit-qa/<int:id>/', views.edit_qa, name='edit_qa'),
    path('delete-qa/<int:id>/', views.delete_qa, name='delete_qa'),
    path('users/', views.view_users, name='view_users'),
]
