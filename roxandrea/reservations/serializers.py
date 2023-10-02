from rest_framework import serializers
from contacts.models import Contacts
from reservations.models import Reservations
from rooms.models import Rooms
from billing.models import Bill


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacts
        fields = '__all__'  

class RoomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rooms
        fields = '__all__'  

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = '__all__'   

class ReservationSerializer(serializers.ModelSerializer):
    rooms = RoomsSerializer(many=True)
    bills = BillSerializer(many=True)
    contact = ContactSerializer(many=False)
    
    class Meta:
        model = Reservations
        fields = '__all__'