import json
import traceback
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .nvidia_ai import enhance_response
from .models import QnA, ChatMessage


def landing_page(request):
    """Render the CureX marketing landing page."""
    return render(request, 'chatbot/landing.html')


@login_required
def chat_page(request):
    """Render the CureX chat interface with history."""
    history = ChatMessage.objects.filter(user=request.user).order_by('created_at')
    return render(request, 'chatbot/chat.html', {'history': history})


@csrf_exempt
@login_required
def get_response(request):
    """
    Process user message and return CureX chatbot response.

    Flow:
      1. Check the local CureX Q&A database for direct matches
      2. If not found, use NVIDIA Nemotron LLM to provide medical advice
      3. Return the response as JSON
    """
    if request.method != 'POST':
        return JsonResponse({'error': 'POST request required.'}, status=405)

    try:
        try:
            data = json.loads(request.body)
            user_message = data.get('message', '').lower().strip()
        except (json.JSONDecodeError, Exception):
            user_message = request.POST.get('message', '').lower().strip()

        if not user_message:
            return JsonResponse({'response': 'Please type a message.'})

        # 1. Search locally in QnA table
        # Simple keyword matching for demo/speed
        context = ""
        qna_entries = QnA.objects.all()
        for entry in qna_entries:
            keywords = [kw.strip().lower() for kw in entry.keywords.split(',') if kw.strip()]
            # If any keyword matches exactly in the message
            if keywords and any(kw in user_message for kw in keywords):
                context = f"Internal Knowledge Reference: {entry.answer}\n\n"
                break
            # Or if the question itself is similar
            elif entry.question.lower() in user_message or user_message in entry.question.lower():
                context = f"Internal Knowledge Reference: {entry.answer}\n\n"
                break

        # 2. Add Medical Profile Context for personalization
        from users.models import MedicalProfile
        med_p, _ = MedicalProfile.objects.get_or_create(user=request.user)
        
        med_context = ""
        if med_p.blood_type != 'Unknown' or med_p.allergies or med_p.chronic_conditions:
            med_context = (
                f"PATIENT MEDICAL PROFILE:\n"
                f"- Blood Type: {med_p.blood_type}\n"
                f"- Allergies: {med_p.allergies or 'None reported'}\n"
                f"- Chronic Conditions: {med_p.chronic_conditions or 'None reported'}\n"
                f"- Medications: {med_p.medications or 'None reported'}\n\n"
            )

        # 3. Get AI response from NVIDIA NIM
        bot_response = enhance_response(user_message, base_answer=context, user_medical_context=med_context)

        # Save to database for history
        ChatMessage.objects.create(
            user=request.user,
            message=user_message,
            response=bot_response
        )

        return JsonResponse({'response': bot_response})

    except Exception as e:
        print(f"[CureX View Error] {e}")
        print(traceback.format_exc())
        return JsonResponse({
            'response': 'I encountered an error processing your request. Please try again.'
        }, status=200)  # Return 200 so frontend handles it gracefully
