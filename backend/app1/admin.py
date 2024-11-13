from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(StoreItem)
admin.site.register(Complaints)
admin.site.register(Cart)
admin.site.register(CartItem)
