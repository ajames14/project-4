from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('jwt_auth.urls')),
    path('api/', include('clothes_swap.urls'))
]