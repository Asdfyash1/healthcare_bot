import json
from django.http import JsonResponse
from django.contrib.auth import authenticate, logout
from django.shortcuts import render, redirect
from django.contrib.auth import login, update_session_auth_hash
from django.contrib.auth.forms import UserCreationForm, PasswordChangeForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages


@csrf_exempt
def api_login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email', '')
            password = data.get('password', '')
            
            user_obj = User.objects.filter(email=email).first()
            if not user_obj:
                user_obj = User.objects.filter(username=email).first()
            
            if user_obj:
                user = authenticate(request, username=user_obj.username, password=password)
                if user is not None:
                    login(request, user)
                    return JsonResponse({'success': True, 'user': {'name': user.first_name or user.username, 'email': user.email}})
            return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=401)
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=400)
    return JsonResponse({'success': False}, status=405)


@csrf_exempt
def api_register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email', '')
            password = data.get('password', '')
            name = data.get('name', '')
            
            if User.objects.filter(email=email).exists():
                return JsonResponse({'success': False, 'message': 'Email already exists'}, status=400)
            
            username = email.split('@')[0]
            count = 1
            while User.objects.filter(username=username).exists():
                username = f"{email.split('@')[0]}{count}"
                count += 1
                
            user = User.objects.create_user(username=username, email=email, password=password)
            user.first_name = name
            user.save()
            
            login(request, user)
            return JsonResponse({'success': True, 'user': {'name': user.first_name or user.username, 'email': user.email}})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=400)
    return JsonResponse({'success': False}, status=405)


@csrf_exempt
def api_logout(request):
    logout(request)
    return JsonResponse({'success': True})


@csrf_exempt
def api_me(request):
    if request.user.is_authenticated:
        return JsonResponse({
            'success': True,
            'user': {
                'name': request.user.first_name or request.user.username,
                'email': request.user.email,
                'avatar': f"https://api.dicebear.com/7.x/avataaars/svg?seed={request.user.username}",
                'memberSince': request.user.date_joined.strftime('%B %Y') if getattr(request.user, 'date_joined', None) else 'Now',
                'chatsCount': 0,
                'healthScore': 100
            }
        })
    return JsonResponse({'success': False}, status=401)

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


@login_required
def profile(request):
    """Display user profile."""
    return render(request, 'users/profile.html', {'user': request.user})


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
