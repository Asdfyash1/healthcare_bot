from django import forms
from chatbot.models import QnA


class QnAForm(forms.ModelForm):
    """Form for creating and editing Q&A entries in the CureX engine."""

    class Meta:
        model = QnA
        fields = ['question', 'label', 'answer', 'keywords']
        widgets = {
            'question': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'e.g. What are common flu symptoms?',
            }),
            'label': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'e.g. flu_symptoms',
            }),
            'answer': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 5,
                'placeholder': 'Explain the clinical response...',
            }),
            'keywords': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Keywords (optional)',
            }),
        }
