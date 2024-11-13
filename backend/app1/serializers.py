

from typing import Iterable, List, Dict, Any
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import StoreItem, Complaints,Cart,CartItem



class StoreItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreItem
        fields = ['id', 'name', 'price', 'photo_url']

class ComplaintsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaints
        fields = '__all__'

class CartItemsSerializer(serializers.ModelSerializer):
    item = StoreItemSerializer(read_only=True)
    class Meta:
        model = Cart
        fields = ['id', 'cart', 'item', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemsSerializer(source='cartitems_set', many=True, read_only=True)  # Nested items in cart

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items']





