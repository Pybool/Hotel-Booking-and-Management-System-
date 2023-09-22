from rest_framework import serializers

from contacts.models import Contacts, ContactType

class ContactType(serializers.ModelSerializer):
    class Meta:
        model = ContactType
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    contact_type = ContactType(many=False)
    class Meta:
        model = Contacts
        fields = '__all__'

