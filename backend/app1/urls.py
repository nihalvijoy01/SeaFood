from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

cart_viewset = CartViewSet.as_view({
    'get': 'get_cart',
    'post': 'add_item',
    'put': 'update_item',
    'delete': 'remove_item'
})

urlpatterns = [
    path('', StoreListView.as_view(),name='store_list'),
    path('complaints/', ComplaintCreateView.as_view(), name='my_view'),
    path("signup/", signup, name="signup"),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"), 
    path('rate/',rateLimiter, name='rate-limit'),
    path('cart/', cart_viewset, name='cart'),
    path('cart/item/<int:pk>/', cart_viewset, name='cart_item'),
]