from django.urls import path
from rest_auth.views import (
    LoginView,
    LogoutView,
    PasswordChangeView,
    PasswordResetView,
    PasswordResetConfirmView
)
from rest_auth.registration.views import RegisterView

urlpatterns = [
    path('register/', RegisterView.as_view(), name="rest_register"),
    path('login/', LoginView.as_view(), name="rest_login"),
    path('logout/', LogoutView.as_view(), name="rest_logout"),
    path('password/change/', PasswordChangeView.as_view(),
        name='rest_password_change'),
    # path('password/reset/', PasswordResetView.as_view(),
    #     name='rest_password_reset'),
    # path('password/reset/confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(),
    #     name='rest_password_reset_confirm')
]

# grow as we go ben platt