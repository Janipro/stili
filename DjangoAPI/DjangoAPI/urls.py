"""DjangoAPI URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from stili import views
from stili.views import front, user, update_User, event, event_update, commercialUser

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'users')
router.register(r'events', views.EventView, 'events')
router.register(r'commercialUsers', views.CommercialUserView, 'commercialUsers')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', front, name="front"),
    path('register/', front, name="register"),
    path('home/', front, name="home"),
    path('profile/', front, name="profile"),
    path('trips/', front, name="trips"),
    path('users/', user, name="user"),
    path('users/<int:phoneNumber>/', update_User, name="updateUser"),
    path('events/', event, name="event"),
    path('contact/', front, name="contact"),
    path('events/<int:eventID>/', event_update, name='eventUpdate'),
    path('commercialRegister/', front, name="commercialRegister"),
    path('commercialUsers/', commercialUser, name='commercialUser')
]
