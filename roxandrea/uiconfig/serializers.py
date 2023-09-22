from rest_framework import serializers

from rooms.models import RoomType
from rooms.models import Rooms
from rooms.models import Floors
from rooms.models import BedType
from contacts.models import ContactType, Contacts
from rooms.models import Amenities
class ImageUploadSerializer(serializers.Serializer):
    image = serializers.ImageField()

class BedTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BedType
        fields = '__all__'
        
class AmentitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenities
        fields = '__all__'
        
class RoomTypeSerializer(serializers.ModelSerializer):
    bed_type = BedTypeSerializer(many=False)
    amenities = AmentitiesSerializer(many=True)
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
    amenities = AmentitiesSerializer(many=True)
    floor = FloorSerializer(many=False)
    class Meta:
        model = Rooms
        fields = '__all__'