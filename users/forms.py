from django import forms
from .models import MedicalProfile

class MedicalProfileForm(forms.ModelForm):
    class Meta:
        model = MedicalProfile
        fields = ['blood_type', 'allergies', 'medications', 'chronic_conditions']
        widgets = {
            'blood_type': forms.Select(attrs={'class': 'input-box', 'style': 'appearance: auto;'}),
            'allergies': forms.Textarea(attrs={'class': 'input-box', 'rows': 3, 'placeholder': 'e.g. Peanuts, Penicillin'}),
            'medications': forms.Textarea(attrs={'class': 'input-box', 'rows': 3, 'placeholder': 'Current drugs you take'}),
            'chronic_conditions': forms.Textarea(attrs={'class': 'input-box', 'rows': 3, 'placeholder': 'e.g. Asthma, Hypertension'}),
        }
