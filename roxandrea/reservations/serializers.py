from rest_framework import serializers
from contacts.models import Contacts
from reservations.models import Reservations
from rooms.models import Rooms


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacts
        fields = '__all__'  

class RoomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rooms
        fields = '__all__'   

class ReservationSerializer(serializers.ModelSerializer):
    rooms = RoomsSerializer(many=True)
    contact = ContactSerializer(many=False)  # Nested serializer for ManyToMany field
    class Meta:
        model = Reservations
        fields = '__all__'