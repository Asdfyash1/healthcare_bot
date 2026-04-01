from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class MedicalProfile(models.Model):
    """
    Stores sensitive healthcare data to personalize CureX AI guidance.
    """
    BLOOD_TYPES = [
        ('A+', 'A+'), ('A-', 'A-'),
        ('B+', 'B+'), ('B-', 'B-'),
        ('AB+', 'AB+'), ('AB-', 'AB-'),
        ('O+', 'O+'), ('O-', 'O-'),
        ('Unknown', 'Unknown'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='medical_profile')
    blood_type = models.CharField(max_length=10, choices=BLOOD_TYPES, default='Unknown')
    allergies = models.TextField(blank=True, help_text="List any known drug, food, or environmental allergies.")
    medications = models.TextField(blank=True, help_text="Current medications or treatments.")
    chronic_conditions = models.TextField(blank=True, help_text="Asthma, Diabetes, Heart conditions, etc.")
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Medical Profile for {self.user.username}"

# Ensure a medical profile exists for every new user
@receiver(post_save, sender=User)
def create_user_medical_profile(sender, instance, created, **kwargs):
    if created:
        MedicalProfile.objects.get_or_create(user=instance)

@receiver(post_save, sender=User)
def save_user_medical_profile(sender, instance, **kwargs):
    if hasattr(instance, 'medical_profile'):
        instance.medical_profile.save()
    else:
        MedicalProfile.objects.create(user=instance)
