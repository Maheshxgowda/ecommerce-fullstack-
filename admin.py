from django.contrib import admin
from .models import Product, Order, OrderItem, ShippingAddress

# Register your models here
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'stock', 'is_active')
    prepopulated_fields = {'slug': ('name',)}

admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)