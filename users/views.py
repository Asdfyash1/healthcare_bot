from django.shortcuts import render, redirect
from django.contrib.auth import login, update_session_auth_hash
from django.contrib.auth.forms import UserCreationForm, PasswordChangeForm
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import MedicalProfile
from .forms import MedicalProfileForm


def register(request):
    """Handle user registration."""
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, f'Account created successfully! Welcome, {user.username}.')
            return redirect('profile')
    else:
        form = UserCreationForm()
    return render(request, 'users/register.html', {'form': form})


from chatbot.models import ChatMessage


@login_required
def profile(request):
    """Display user profile dashboard with stats."""
    # Ensure profile exists (signal should have created it, but defensive)
    medical_p, created = MedicalProfile.objects.get_or_create(user=request.user)
    
    messages_count = ChatMessage.objects.filter(user=request.user).count()
    recent_activity = ChatMessage.objects.filter(user=request.user).order_by('-created_at')[:5]
    
    health_tips = [
        {'title': 'Stay Hydrated', 'desc': 'Drink 8+ glasses of water for optimal metabolism.', 'icon': 'droplet'},
        {'title': 'Daily Movement', 'desc': 'A 30-min brisk walk boosts heart health.', 'icon': 'activity'},
        {'title': 'Rest Well', 'desc': '7-9 hours of sleep is vital for mental clarity.', 'icon': 'moon-stars'}
    ]

    context = {
        'user': request.user,
        'msg_count': messages_count,
        'recent_activity': recent_activity,
        'tips': health_tips,
        'medical_profile': medical_p
    }
    return render(request, 'users/profile.html', context)


@login_required
def edit_medical_profile(request):
    """Update medical profile details."""
    profile, created = MedicalProfile.objects.get_or_create(user=request.user)
    
    if request.method == 'POST':
        form = MedicalProfileForm(request.POST, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Medical profile updated successfully!')
            return redirect('profile')
    else:
        form = MedicalProfileForm(instance=profile)
    
    return render(request, 'users/edit_profile.html', {'form': form})


@login_required
def change_password(request):
    """Handle password change."""
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)
            messages.success(request, 'Your password was updated successfully!')
            return redirect('profile')
    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'users/change_password.html', {'form': form})
