from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings


def doctors_page(request):
    """Render the doctor finder page."""
    return render(request, 'location/places.html', {'type': 'doctor'})


def hospitals_page(request):
    """Render the hospital finder page."""
    return render(request, 'location/places.html', {'type': 'hospital'})


def nearby_places(request, place_type='doctor'):
    """
    Fetch nearby doctors or hospitals using Google Places API.
    Expects GET params: lat, lng
    """
    lat = request.GET.get('lat')
    lng = request.GET.get('lng')

    if not lat or not lng:
        return JsonResponse({'error': 'Latitude and longitude are required.'}, status=400)

    api_key = settings.GOOGLE_PLACES_API_KEY

    if api_key == 'YOUR_API_KEY':
        return JsonResponse({
            'error': 'Google Places API key is not configured. '
                     'Please set GOOGLE_PLACES_API_KEY in settings.py.'
        }, status=500)

    try:
        import googlemaps

        gmaps = googlemaps.Client(key=api_key)

        results = gmaps.places_nearby(
            location=(float(lat), float(lng)),
            radius=5000,
            type=place_type,
        )

        places = []
        for place in results.get('results', []):
            places.append({
                'name': place.get('name', 'N/A'),
                'address': place.get('vicinity', 'N/A'),
                'rating': place.get('rating', 'N/A'),
                'total_ratings': place.get('user_ratings_total', 0),
                'open_now': place.get('opening_hours', {}).get('open_now', None),
            })

        return JsonResponse({'places': places})

    except ImportError:
        return JsonResponse({
            'error': 'googlemaps library is not installed. Run: pip install googlemaps'
        }, status=500)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
