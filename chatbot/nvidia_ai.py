"""
NVIDIA NIM API Integration for Healthcare Chatbot.

Uses nvidia/nemotron-3-super-120b-a12b via OpenAI-compatible API
hosted on build.nvidia.com.

This module provides the `enhance_response()` function which:
  - If a base_answer (from CNN+QnA) is provided, refines and expands it
  - If no base_answer, acts as a standalone medical assistant
"""

from openai import OpenAI
from django.conf import settings

# Healthcare system prompt — constrains the LLM to medical topics
HEALTHCARE_SYSTEM_PROMPT = """You are HealthBot AI, a knowledgeable and empathetic healthcare assistant.

RULES:
1. Only answer questions related to health, medicine, symptoms, diseases, treatments, wellness, nutrition, mental health, and fitness.
2. If the user asks about a non-medical topic, politely redirect them to ask health-related questions.
3. Always include a disclaimer: you are an AI assistant, not a licensed doctor, and the user should consult a healthcare professional for serious concerns.
4. Be empathetic, clear, and concise.
5. Use bullet points and structured formatting when listing symptoms or treatments.
6. If you receive a base answer from our medical database, enhance it with more detail, context, and clarity — do NOT contradict it.
7. Never diagnose. Suggest possible conditions and recommend seeing a doctor.
8. Keep responses under 300 words unless more detail is needed."""


def get_nvidia_client():
    """Create and return an OpenAI client configured for NVIDIA NIM."""
    api_key = getattr(settings, 'NVIDIA_API_KEY', 'YOUR_NVIDIA_API_KEY')

    if api_key == 'YOUR_NVIDIA_API_KEY' or not api_key:
        return None

    return OpenAI(
        base_url="https://integrate.api.nvidia.com/v1",
        api_key=api_key,
    )


def enhance_response(user_message, base_answer=None):
    """
    Get an AI-enhanced healthcare response.

    Args:
        user_message: The user's question/message.
        base_answer: Optional base answer from CNN+QnA model to enhance.

    Returns:
        str: The AI-generated or enhanced response.
    """
    client = get_nvidia_client()

    if client is None:
        if base_answer:
            return base_answer
        return (
            "⚠️ NVIDIA API key is not configured. "
            "Please set `NVIDIA_API_KEY` in settings.py with your key from "
            "[build.nvidia.com](https://build.nvidia.com)."
        )

    model = getattr(settings, 'NVIDIA_MODEL', 'nvidia/nemotron-3-super-120b-a12b')

    # Build the messages
    messages = [
        {"role": "system", "content": HEALTHCARE_SYSTEM_PROMPT},
    ]

    if base_answer:
        # CNN gave us a base answer → ask the LLM to enhance it
        messages.append({
            "role": "user",
            "content": (
                f"A patient asked: \"{user_message}\"\n\n"
                f"Our medical database suggests this answer:\n\"{base_answer}\"\n\n"
                "Please enhance this answer with more detail, medical context, "
                "empathy, and practical advice. Keep the core information accurate."
            ),
        })
    else:
        # No CNN answer → LLM is the primary responder
        messages.append({
            "role": "user",
            "content": user_message,
        })

    try:
        response = client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=0.4,
            top_p=0.9,
            max_tokens=1024,
        )

        return response.choices[0].message.content

    except Exception as e:
        error_msg = str(e)

        # If the LLM fails but we have a base answer, return that
        if base_answer:
            return base_answer

        return (
            "I'm sorry, I encountered an issue processing your request. "
            "Please try again in a moment. "
            f"(Error: {error_msg[:100]})"
        )
