"""parking URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
# from rest_auth.views import (
#     PasswordChangeView,PasswordResetView, PasswordResetConfirmView
# )
# from api.views import GetOutOfMySite

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),

    path('rest-auth/', include('api.rest_auth'))
    # path('rest-auth/user/', GetOutOfMySite.as_view(), name="not_allowed"),
    # path('rest-auth/login/', GetOutOfMySite.as_view(), name="not_allowed"),
    # path('rest-auth/logout/', GetOutOfMySite.as_view(), name="not_allowed"),
    # path('rest-auth/', include('rest_auth.urls'))
]