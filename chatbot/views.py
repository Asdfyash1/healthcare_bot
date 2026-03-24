import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .nvidia_ai import enhance_response

import os
import pickle
import numpy as np
import pandas as pd
from django.conf import settings

# Attempt to load the CNN model and artifacts.
MODEL_DIR = os.path.join(settings.BASE_DIR, 'healthcare_model')
MODEL_PATH = os.path.join(MODEL_DIR, 'chatbot_model.h5')
TOKENIZER_PATH = os.path.join(MODEL_DIR, 'tokenizer.pkl')
ENCODER_PATH = os.path.join(MODEL_DIR, 'label_encoder.pkl')
CSV_PATH = os.path.join(MODEL_DIR, 'label_answer_map.csv')
MAX_LEN = 100

CNN_MODEL_LOADED = False
model = None
tokenizer = None
label_encoder = None
label_answer_map = {}

try:
    from tensorflow.keras.models import load_model
    from tensorflow.keras.preprocessing.sequence import pad_sequences
    
    if os.path.exists(MODEL_PATH) and os.path.exists(TOKENIZER_PATH) and os.path.exists(ENCODER_PATH) and os.path.exists(CSV_PATH):
        model = load_model(MODEL_PATH)
        with open(TOKENIZER_PATH, 'rb') as f:
            tokenizer = pickle.load(f)
        with open(ENCODER_PATH, 'rb') as f:
            label_encoder = pickle.load(f)
            
        # Load CSV into a dictionary for fast lookup: {label: answer}
        df = pd.read_csv(CSV_PATH)
        label_answer_map = dict(zip(df['label'], df['answer']))
        
        CNN_MODEL_LOADED = True
        print(f"SUCCESS: CNN Model loaded successfully from {MODEL_DIR}")
    else:
        print(f"WARNING: CNN Model artifacts missing in {MODEL_DIR}")
except Exception as e:
    print(f"ERROR: Error loading CNN model: {e}")


def chat_page(request):
    """Render the chat interface."""
    return render(request, 'chatbot/chat.html')


def get_cnn_prediction(user_message):
    """
    Get CNN model prediction.
    Returns the base answer string from label_answer_map.csv, or None.
    """
    if not CNN_MODEL_LOADED:
        return None

    try:
        from tensorflow.keras.preprocessing.sequence import pad_sequences
        seq = tokenizer.texts_to_sequences([user_message])
        padded = pad_sequences(seq, maxlen=MAX_LEN)
        prediction = model.predict(padded, verbose=0)
        predicted_index = np.argmax(prediction)
        confidence = prediction[0][predicted_index]
        
        # Threshold: Only return if confidence > 0.4
        if confidence > 0.4:
            predicted_label = label_encoder.inverse_transform([predicted_index])[0]
            base_answer = label_answer_map.get(predicted_label)
            return base_answer
    except Exception as e:
        print(f"CNN Prediction error: {e}")
        
    return None


@csrf_exempt
def get_response(request):
    """
    Process user message and return chatbot response.

    Flow:
      1. (Optional) CNN predicts a label → lookup base answer from QnA
      2. NVIDIA Nemotron LLM enhances the answer (or responds directly)
      3. Return the enhanced response as JSON
    """
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_message = data.get('message', '').strip()
        except json.JSONDecodeError:
            user_message = request.POST.get('message', '').strip()

        if not user_message:
            return JsonResponse({'response': 'Please type a message.'})

        # Step 1: Try CNN prediction (returns None if model not loaded)
        base_answer = get_cnn_prediction(user_message)

        # Step 2: Enhance with NVIDIA Nemotron LLM
        bot_response = enhance_response(user_message, base_answer=base_answer)

        return JsonResponse({'response': bot_response})

    return JsonResponse({'error': 'POST request required.'}, status=400)
