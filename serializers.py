from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'qty', 'price']

class OrderSerializer(serializers.ModelSerializer):
    orderItems = OrderItemSerializer(many=True)
    class Meta:
        model = Order
        fields = ['id', 'user', 'orderItems', 'status', 'total_price', 'address', 'city', 'postal', 'country']

    def create(self, validated_data):
        items_data = validated_data.pop('orderItems')
        order = Order.objects.create(**validated_data)
        total = 0
        for item in items_data:
            OrderItem.objects.create(order=order, **item)
            total += item['price'] * item['qty']
        order.total_price = total
        order.save()
        return order
