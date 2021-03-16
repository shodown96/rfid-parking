from django.urls import path
from .views import *

urlpatterns = [
    path("users/", UserListView.as_view(), name="users"),
    path("registration/", UserCreateView.as_view(), name="registration"),
    path("user-details/", UserDetailView.as_view(), name="user_details"),
    path("user-bookings/", UserBookingsListView.as_view(), name="user_bookings"),
    path("user-transactions/", UserTransactionsListView.as_view(), name="user_transactions"),

    path("slots/", SlotListView.as_view(), name="slots"),
    path("slot-create/", SlotCreateView.as_view(), name="slot_create"),
    path("slot-assign/", SlotAssignView.as_view(), name="slot_assign"),
    path("slot-edit/", SlotEditView.as_view(), name="slot_edit"),

    path("bookings/", BookingListView.as_view(), name="bookings"),
    path("park-in-out/", ParkInOutView.as_view(), name="park_in_out"),
    path("park-charge/", ParkingChargeView.as_view(), name="park_charge"),


    path("transactions/", TransactionListView.as_view(), name="transactions"),
    path("top-up/", TopUpAccountView.as_view(), name="top-up"),

]
