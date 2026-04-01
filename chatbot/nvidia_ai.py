"""
NVIDIA NIM API Integration for CureX Healthcare Bot.

Uses meta/llama-3.1-8b-instruct via NVIDIA NIM (OpenAI-compatible endpoint)
hosted on integrate.api.nvidia.com.

This module provides the `enhance_response()` function which:
  - If a base_answer (from CNN+QnA) is provided, refines and expands it
  - If no base_answer, acts as a standalone medical assistant
"""

import traceback
from openai import OpenAI
from django.conf import settings

# CureX Healthcare system prompt
HEALTHCARE_SYSTEM_PROMPT = """You are CureX AI, a Master Physician and compassionate Health Companion.

CORE PHILOSOPHY:
Combine high-precision medical expertise with deep human empathy. You are not just a database; you are a supportive presence in the user's health journey.

MASTER PHYSICIAN PERSONA:
- **HUMANITY**: Speak with warmth and approachability. Use gentle reassurance when a user expresses fear, pain, or anxiety.
- **EMOTIONAL SUPPORT**: Acknowledge the emotional weight of health issues. Say things like "I understand this is stressful," or "I'm here to support you through this."
- **CLINICAL AUTHORITY**: Maintain the diagnostic precision and thoroughness of a world-class doctor. 

OPERATIONAL PROTOCOLS:
1. **EMPATHETIC LISTENING**: Before jumping into medical facts, briefly acknowledge the user's feelings to build trust.
2. **DOCTOR-LEVEL KNOWLEDGE**: Provide detailed, structured insights into symptoms, conditions, and wellness. Use medical terminology correctly but explain it clearly.
3. **PERSONALIZED CARE**:
   - MUST use the "Patient Medical Profile" to tailor advice (e.g., if they are allergic to a common treatment, suggest an alternative).
   - MUST use the "Internal Knowledge" as your primary clinical reference.
4. **SAFETY & DISCLAIMERS**: Securely bridge the gap between AI and human care. Always include: "CureX AI is your digital health companion, not a replacement for a physical examination. In emergencies, please seek immediate professional care."
5. **STRUCTURED FORMATTING**: Use headings, bold text for key terms, and bullet points. Avoid dense blocks of text.
6. **NO DEFINITIVE DIAGNOSIS**: Provide "possible matches" or "areas to discuss with your doctor," never a final diagnosis.

End every interaction with a supportive, human sign-off that encourages the user. Always advocate for the user's long-term health and well-being."""


def get_nvidia_client():
    """Create and return an OpenAI client configured for NVIDIA NIM."""
    api_key = getattr(settings, 'NVIDIA_API_KEY', '')

    if not api_key:
        print("[NVIDIA AI] Error: No API key found in settings.")
        return None

    return OpenAI(
        base_url="https://integrate.api.nvidia.com/v1",
        api_key=api_key,
    )


def enhance_response(user_message, base_answer=None, user_medical_context=None):
    """
    Get an AI-enhanced healthcare response from CureX AI.

    Args:
        user_message: The user's question/message.
        base_answer: Optional base answer from CNN+QnA model to enhance.
        user_medical_context: Optional context from user's MedicalProfile.

    Returns:
        str: The AI-generated or enhanced response.
    """
    client = get_nvidia_client()

    if client is None:
        if base_answer:
            return base_answer
        return (
            "⚠️ CureX AI is not configured with an API key. "
            "Please set `NVIDIA_API_KEY` in your environment or settings.py. "
            "Get a free API key from [build.nvidia.com](https://build.nvidia.com)."
        )

    model = getattr(settings, 'NVIDIA_MODEL', 'meta/llama-3.1-8b-instruct')

    # Build the messages
    messages = [
        {"role": "system", "content": HEALTHCARE_SYSTEM_PROMPT},
    ]

    # Add medical context if available
    if user_medical_context:
        messages.append({
            "role": "system", 
            "content": f"Personalization - Knowledge about the user:\n{user_medical_context}"
        })

    if base_answer:
        # CNN gave us a base answer → ask the LLM to enhance it
        messages.append({
            "role": "user",
            "content": (
                f"A patient asked: \"{user_message}\"\n\n"
                f"Our medical database suggests this answer:\n\"{base_answer}\"\n\n"
                "Please enhance this answer with more detail, medical context, "
                "empathy, and practical advice. Keep the core information accurate "
                "and ensure it considers any personal medical data provided."
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
        print(f"[CureX AI Error] {error_msg}")
        print(traceback.format_exc())

        # If the LLM fails but we have a base answer, return that
        if base_answer:
            return base_answer

        # Return a friendly error with useful debug info
        return (
            "I'm sorry, I encountered an issue processing your request. "
            "Please try again in a moment.\n\n"
            f"*(Technical detail: {error_msg[:150]})*"
        )
