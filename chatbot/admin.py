from django.contrib import admin
from .models import QnA


@admin.register(QnA)
class QnAAdmin(admin.ModelAdmin):
    list_display = ('label', 'answer', 'keywords')
    search_fields = ('label', 'keywords')
