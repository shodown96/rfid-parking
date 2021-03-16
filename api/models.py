from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token

# Create your models here.
STATUS = (
    ("IN","IN"),
    ("OUT","OUT"),
    ("FREE","FREE")
)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    rfid = models.CharField(max_length=100, unique=True, null=True)
    balance = models.FloatField(default=0.0)
    phone = models.CharField(max_length=11, null=True)
    age = models.CharField(max_length=3, null=True)
    # image = models.ImageField(upload_to="profile_pictures",null=True)
    def __str__(self):
        return self.user.username

class Slot(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=200)
    available = models.BooleanField(default=True)
    # handler name userID password
    def __str__(self):
        return self.name

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE)
    time_in = models.DateTimeField(null=True, blank=True)
    time_out = models.DateTimeField(null=True, blank=True)
    charge = models.FloatField(default=0.0)
    payment_id = models.CharField(max_length=100, blank=True)
    paid = models.BooleanField(default=False)
    status = models.CharField(max_length=4, choices=STATUS, default="FREE")
    def __str__(self):
        return f"{self.user.username}-{self.slot}"

class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    payment_id = models.CharField(max_length=100)
    amount = models.FloatField(default=0.0)
    paid = models.BooleanField(default=False)
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, null=True)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)
    def __str__(self):
        return self.user.username

def profile_reciever(sender, instance, created, *args, **kwargs):
    if created:
        Profile.objects.create(user=instance)
post_save.connect(profile_reciever, sender=User)