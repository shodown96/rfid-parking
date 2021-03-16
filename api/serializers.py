from rest_framework import serializers
from .models import *
import random, string
# from rest_auth.registration.serializers import RegisterSerializer

def generate_rfid(username):
    return username+''.join(random.choices(string.ascii_lowercase + string.digits, k=8))

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    profile = serializers.SerializerMethodField()
    # read_only_fields = ('email', )
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "name",
            "profile",
        ]
    def get_name(self, obj):
        return obj.get_full_name()
    def get_profile(self, obj):
        return ProfileSerializer(obj.profile).data

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "user",
            "rfid",
            "balance",
            "phone",
            "age",
            # 'image'
        ]

class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = [
            "name",
            "location",
            "available"
        ]

class BookingSerializer(serializers.ModelSerializer):
    slot = serializers.SerializerMethodField()
    paid = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    charge = serializers.SerializerMethodField()
    class Meta:
        model = Booking
        fields = [
            "user",
            "slot",
            "time_in",
            "time_out",
            "charge",
            "payment_id",
            "paid",
            "status"
        ]
    def get_slot(self, obj):
        return SlotSerializer(obj.slot).data
    def get_paid(self, obj):
        if obj.paid:
            return "Paid"
        else:
            return "Not Paid"
    def get_user(self, obj):
        return obj.user.get_full_name()
    def get_charge(self, obj):
        return "₦" + str(round(obj.charge, 2))

class TransactionSerializer(serializers.ModelSerializer):
    paid = serializers.SerializerMethodField()
    amount = serializers.SerializerMethodField()
    class Meta:
        model = Transaction
        fields = [
            "user",
            # "booking",
            "payment_id",
            "amount",
            "paid"
        ]
    def get_amount(self, obj):
        return "₦" + str(round(obj.amount, 2))
    def get_paid(self, obj):
        if obj.paid:
            return "Paid"
        else:
            return "Not Paid"

class SlotAssignSerializer(serializers.Serializer):
    rfid = serializers.CharField(required=True)
    slot = serializers.IntegerField(required=True)

class RFIDSerializer(serializers.Serializer):
    rfid = serializers.CharField(required=True)
    slot = serializers.CharField()


class CardSerializer(serializers.Serializer):
    amount = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    cvv = serializers.CharField(required=True)
    number = serializers.CharField(required=True)
    expiry_month = serializers.CharField(required=True)
    expiry_year = serializers.CharField(required=True)
    pin = serializers.CharField(required=True)

class RegistrationSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)
    age = serializers.CharField(required=True)
    rfid = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)

    def save(self, **kwargs):
        u =  dict(self.validated_data)
        user = User()
        user.username = u['username']
        user.first_name = u['first_name']
        user.last_name = u['last_name']
        user.email = u['email']
        user.set_password(u['password'])
        user.save()
        user.profile.age = u['age']
        user.profile.rfid = generate_rfid(user.username)
        user.profile.phone = u['phone']
        user.profile.save()

class UserUpdateSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    age = serializers.CharField(required=True)
    rfid = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)

    def save(self, instance, validated_data):
        user = instance
        u =  dict(self.validated_data)
        user.username = u['username']
        user.first_name = u['first_name']
        user.last_name = u['last_name']
        user.email = u['email']
        user.save()
        user.profile.age = u['age']
        user.profile.rfid = u['rfid']
        user.profile.phone = u['phone']
        user.profile.save()

# Change Passwords and Reset

# {"rfid":"8765RTGHVFTY", "slot":1}
# {"rfid":"8765RTGHVFTY"}