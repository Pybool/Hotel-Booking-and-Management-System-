from rest_framework import serializers

from rooms.models import RoomType
from rooms.models import BedType
from finance.models import Rates
from finance.models import RoomAndRates

class BedTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BedType
        fields = '__all__'
        
class RoomTypeSerializer(serializers.ModelSerializer):
    bed_type = BedTypeSerializer(many=False)
    class Meta:
        model = RoomType
        fields = '__all__'

class RoomAndRatesSerializer(serializers.ModelSerializer):
    room_type = RoomTypeSerializer(many=False) 
    class Meta:
        model = RoomAndRates
        fields = '__all__'   


class RatesSerializer(serializers.ModelSerializer):
    room_and_rates = RoomAndRatesSerializer(many=True)  # Nested serializer for ManyToMany field

    class Meta:
        model = Rates
        fields = '__all__'