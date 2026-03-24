from django import forms
from chatbot.models import QnA


class QnAForm(forms.ModelForm):
    """Form for creating and editing Q&A entries."""

    class Meta:
        model = QnA
        fields = ['label', 'answer', 'keywords']
        widgets = {
            'label': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'e.g. headache, diabetes, flu',
            }),
            'answer': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 5,
                'placeholder': 'Enter the bot\'s answer for this label...',
            }),
            'keywords': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Comma-separated keywords (optional)',
            }),
        }
