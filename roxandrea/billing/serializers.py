from rest_framework import serializers

from rooms.models import RoomType
from rooms.models import Rooms
from rooms.models import Floors
from rooms.models import BedType
from contacts.models import ContactType, Contacts
from billing.models import Bill
from services.models import Services

class BedTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BedType
        fields = '__all__'
        
class RoomTypeSerializer(serializers.ModelSerializer):
    bed_type = BedTypeSerializer(many=False)
    class Meta:
        model = RoomType
        fields = '__all__'

class FloorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Floors
        fields = '__all__'

class ContactTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactType
        fields = '__all__'

class ContactsSerializer(serializers.ModelSerializer):
    contact_type= ContactTypeSerializer(many=False)
    class Meta:
        model = Contacts
        fields = '__all__'
         
class RoomSerializer(serializers.ModelSerializer):
    occupant = ContactsSerializer(many=False)
    room_type = RoomTypeSerializer(many=False)
    floor = FloorSerializer(many=False)
    class Meta:
        model = Rooms
        fields = '__all__'
        
class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = '__all__'
        
class BillSerializer(serializers.ModelSerializer):
    room = RoomSerializer(many=False)
    contact = ContactsSerializer(many=False)
    service = ServicesSerializer(many=False)
    class Meta:
        model = Bill
        fields = '__all__'
        
