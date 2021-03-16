from django.shortcuts import render
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .serializers import *
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.response import Response
import datetime
from django.conf import settings
from rest_auth.registration.views import RegisterView
import requests, json, datetime

PARKING_FEE = settings.PARKING_FEE
PAYSTACK_SECRET_KEY = settings.PAYSTACK_SECRET_KEY
EXCHANGE_RATE = settings.EXCHANGE_RATE
# WEBSITE_EMAIL = settings.WEBSITE_EMAIL

# Create your views here.
class UserListView(ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAdminUser]

class UserCreateView(CreateAPIView):
    serializer_class = RegistrationSerializer
    # permission_classes = [IsAdminUser]
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class
        serializer = serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message":"User Registered"}, status=status.HTTP_200_OK)
        

class UserDetailView(APIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        return Response(UserSerializer(self.request.user).data, status=status.HTTP_200_OK)


    def post(self, request, *args, **kwargs):
        serializer = UserUpdateSerializer
        serializer = serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(instance=self.request.user, validated_data=self.request.data)
        return Response({"message":"User Updated"}, status=status.HTTP_200_OK)


class UserBookingsListView(ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)

class UserTransactionsListView(ListAPIView):
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.all()
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

class SlotListView(ListAPIView):
    serializer_class = SlotSerializer
    queryset = Slot.objects.all()
    # permission_classes = [IsAuthenticated]

class SlotCreateView(CreateAPIView):
    serializer_class = SlotSerializer
    queryset = Slot.objects.all()
    permission_classes = [IsAdminUser]

class SlotEditView(RetrieveUpdateAPIView):
    serializer_class = SlotSerializer
    queryset = Slot.objects.all()
    permission_classes = [IsAdminUser]

class SlotAssignView(APIView):
    serializer_class = SlotAssignSerializer
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        user = request.user
        _rfid = self.request.data.get('rfid')
        _slot = self.request.data.get('slot')
        try:
            slot = Slot.objects.get(id=_slot)
            user = User.objects.get(profile__rfid=_rfid)
            # user = Profile.objects.get(rfid=_rfid).user
        except ObjectDoesNotExist:
            return Response({"message":"Slot or RFID not found"}, status=status.HTTP_404_NOT_FOUND)
        Booking.objects.filter(user=user, slot=slot, status="FREE").delete()
        booking = Booking(user=user, slot=slot)
        booking.save()
        slot.available = False
        slot.save()
        return Response({"message":"Slot has been successfully assigned to user"}, status=status.HTTP_200_OK)

class BookingListView(ListAPIView):
    serializer_class = BookingSerializer
    queryset = Booking.objects.all()
    permission_classes = [IsAdminUser]

class ParkInOutView(APIView):
    serializer_class = RFIDSerializer
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class
        serializer = serializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        try:
            user = User.objects.get(profile__rfid=serializer.validated_data['rfid'])
            booking = Booking.objects.filter(user=user, status="FREE", slot__name__icontains=serializer.validated_data['slot']).first()
            if booking is None:
                booking = Booking.objects.filter(user=user, status="IN").first()
                if booking is None:
                    raise ObjectDoesNotExist
        except ObjectDoesNotExist:
            return Response({"message":"Booking not found !!"}, status=status.HTTP_404_NOT_FOUND)
        
        if booking.status == "FREE":
            booking.time_in = datetime.datetime.now()
            booking.status="IN"
            booking.save()
            data = {
                "message":"Booking charge initiated !!",
                "booking":BookingSerializer(booking).data
            }

        elif booking.status == "IN":
            booking.time_out = datetime.datetime.now()
            time_diff = booking.time_out.timestamp() - booking.time_in.timestamp()
            booking.charge = time_diff * PARKING_FEE
            booking.status="OUT"
            booking.save()
            data = {
                "message":"Thank you for staying with us today !!!",
                "booking":BookingSerializer(booking).data
            }
            if user.profile.balance > booking.charge:
               user.profile.balance - booking.charge
               user.profile.save()
               data['message'] = "Thank you for staying with us today !!! Your charge has been deducted from your E-wallet !!!"
        
        return Response(data, status=status.HTTP_200_OK)


# Process Payment
class ParkingChargeView(APIView):
    pass

class TransactionListView(ListAPIView):
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.all()
    permission_classes = [IsAdminUser]

class TopUpAccountView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = CardSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        info = serializer.data
        payload = {
            'email': info['email'],
            # 'amount': (int(info['amount'] * EXCHANGE_RATE) * 100),  # to dollars
            'amount': info['amount'],
            'card': {
                'cvv': info['cvv'],
                'number': info['number'],
                'expiry_month': info['expiry_month'],
                'expiry_year': info['expiry_year']
            },
            'pin': info['pin']
        }
        # print(json.dumps(request.data, sort_keys=True, indent=4))
        # print(json.dumps(info, sort_keys=True, indent=4), serializer.is_valid())
        # print(json.dumps(payload, sort_keys=True, indent=4))
        url = "https://api.paystack.co/charge"
        headers = {
            'Authorization': f'Bearer {PAYSTACK_SECRET_KEY}',
        }
        # r = requests.request("POST", url, headers=headers,
        #                      data=(json.dumps(payload)))
        # res = r.json()
        # print(json.dumps(res, sort_keys=True, indent=4))
        # if res['status']:
        #     payment = Transaction(payment_id=str(res['data']['id']) + "-" + str(res['data']['reference']),
        #                       user=User.objects.get(is_superuser=True),
        #                       amount=(info['amount'] * EXCHANGE_RATE),
        #                       paid=True,
        #                     #   timestamp=datetime.datetime.fromisoformat(res['data']['paid_at'][:-1] + "+00:00")
        #                       ).save()

        #     del res['data']['id']
        #     del res['data']['authorization']
        #     del res['data']['customer']
        profile = Profile.objects.get(user=self.request.user)
        profile.balance += float(info['amount'])
        profile.save()
        res={"balance":profile.balance}
            # return Response({'message': "Payment Successful.", "response": res}, status=status.HTTP_200_OK)
        return Response({'message': "Payment Success.", "response": res}, status=status.HTTP_400_BAD_REQUEST)



class GetOutOfMySite(APIView):
    def post(self, request, *args, **kwargs):
        return Response({"message":"Get Out Of My Site"}, status=status.HTTP_403_FORBIDDEN)

class RegistrationView(RegisterView):
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = self.perform_create(serializer)
            token, created = Token.objects.get_or_create(user=user)
            data = {
                'message':"Registration Successful",
                'token': token.key,
                'user_id': user.pk,
            }
            return Response(data=data,status=status.HTTP_201_CREATED)
        else:
            data = ({
                'message': "Required fields are missing",
                'token': None,
                'user_id': None, 
            })
            return Response(data=data,status=status.HTTP_404_NOT_FOUND)
        
    def perform_create(self, serializer):
        user = serializer.save(self.request)
        return user