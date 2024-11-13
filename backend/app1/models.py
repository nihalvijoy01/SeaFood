from datetime import date
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class StoreItem(models.Model):
    name = models.CharField(max_length=150)
    price = models.CharField(max_length=100)
    photo_url = models.URLField()

    def __str__(self) -> str:
        return self.name

class Complaints(models.Model):
    sub = models.CharField(max_length=200)
    desc = models.TextField(max_length=500,default='')
    date = models.DateField(default=date.today)

class Cart(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)

class CartItem(models.Model):
    cart = models.ForeignKey(to=Cart, on_delete=models.CASCADE)
    item = models.ForeignKey(to=StoreItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.item.name} in cart {self.cart.id}"
