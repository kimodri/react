# React + Django: Working Together
There are two common ways to connect React and Django:

## Option A — React SPA + Django API (Modern Approach)
- React controls the UI.
- Django provides API endpoints.
- React form handler → fetch/axios → Django view.
- No page reload.

## Option B — React Form + Django URL (Classic Approach)
- Form action points directly to Django URL.
- Browser reloads the page.
- Django sends new HTML response.

## Where do ORM, Authentication, and Sessions fit?
This is the tricky part — when React takes over the frontend, Django doesn’t directly render HTML forms anymore, but you can still use all of Django’s backend power:
- ORM: still works the same. Django views (or DRF views) can query and save to the database. React never touches the database directly.
```python
# Example in Django
from myapp.models import User
User.objects.create(email="test@example.com")
```
React just sends the request — Django handles the ORM part.
- Authentication + Sessions:
    - If you use Django’s built-in session authentication, React must send cookies along with requests (`credentials: "include"` in fetch). Django will check the session cookie.
    - Or you can use token-based authentication (common in SPA setups) with Django REST Framework + JWT. In that case, React stores a token and sends it in headers.
In other words: React doesn’t replace ORM/auth/sessions. It just moves the UI to JS. Django still does all the backend work.

## Talking to Django from React
- Even though React doesn’t auto-submit, you can still send the data to Django with `fetch` or `axios`.

`React:`
```jsx
async function signUp(formData) {
  const email = formData.get("email")

  // Send to Django backend
  const response = await fetch("http://localhost:8000/signup/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
    credentials: "include" // important if you’re using sessions/cookies
  })

  const result = await response.json()
  console.log(result)
}
```
`Django view (views.py)`
```python
from django.http import JsonResponse
import json

def signup(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        # Save to database (using ORM)
        # Example: User.objects.create(email=email)
        return JsonResponse({"message": f"User {email} created!"})
    return JsonResponse({"error": "Invalid request"}, status=400)
```

`urls.py`
```python
from django.urls import path
from . import views

urlpatterns = [
    path("signup/", views.signup, name="signup"),
]
```
- So the React function (fetch) is the bridge between your form and Django.
