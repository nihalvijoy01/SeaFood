from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, CreateAPIView
from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django_ratelimit.decorators import ratelimit

# Create your views here.

# users/views.py
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status

class CustomTokenObtainPairView(TokenObtainPairView):
   
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        return Response({
            'access': response.data['access'],
            'refresh': response.data['refresh']
        }, status=status.HTTP_200_OK)


# List view for StoreItem
@ratelimit(key='ip', rate='10/m')
def rateLimiter(request):
    return HttpResponse("rate limiter")

class StoreListView(ListCreateAPIView):
    queryset = StoreItem.objects.all()
    serializer_class = StoreItemSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

# Create view for Complaints
class ComplaintCreateView(CreateAPIView):
    queryset = Complaints.objects.all()
    serializer_class = ComplaintsSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Complaint received!', 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)



@ratelimit(key='ip', rate='10/m')
@api_view(["POST"])
def signup(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")
    if not username or not password:
        return Response({"error": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password,email =email,)
    refresh = RefreshToken.for_user(user)

    return Response({
        "message": "User created successfully",
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }, status=status.HTTP_201_CREATED)
    

                        
class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def get_cart(self, request):
        try:
            cart = Cart.objects.get(user=request.user)
            serializer = CartSerializer(cart)
            return Response(serializer.data)
        except Cart.DoesNotExist:
            return Response({"message": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)

    def add_item(self, request):
        item_id = request.data.get("item_id")
        quantity = request.data.get("quantity", 1)

        # Get or create a cart for the user
        cart, created = Cart.objects.get_or_create(user=request.user)

        # Get the store item
        try:
            store_item = StoreItem.objects.get(id=item_id)
        except StoreItem.DoesNotExist:
            return Response({"message": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        # Check if the item already exists in the cart
        cart_item, created = CartItem.objects.get_or_create(cart=cart, item=store_item)

        # Update the quantity
        cart_item.quantity += quantity
        cart_item.save()

        return Response({"message": "Item added to cart", "cart_item": CartItemsSerializer(cart_item).data})

    def update_item(self, request, pk=None):
        try:
            cart_item = CartItem.objects.get(id=pk)
            quantity = request.data.get("quantity")
            if quantity is not None:
                cart_item.quantity = quantity
                cart_item.save()
            return Response({"message": "Cart item updated", "cart_item": CartItemsSerializer(cart_item).data})
        except CartItem.DoesNotExist:
            return Response({"message": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

    def remove_item(self, request, pk=None):
        try:
            cart_item = CartItem.objects.get(id=pk)
            cart_item.delete()
            return Response({"message": "Cart item removed"})
        except CartItem.DoesNotExist:
            return Response({"message": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)