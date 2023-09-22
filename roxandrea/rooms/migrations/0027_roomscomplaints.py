# Generated by Django 4.2.2 on 2023-09-15 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0026_rooms_no_beds'),
    ]

    operations = [
        migrations.CreateModel(
            name='RoomsComplaints',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room_no', models.JSONField(default=[])),
                ('complaint_type', models.CharField(max_length=255)),
                ('description', models.TextField(default='')),
                ('receipient', models.EmailField(max_length=255)),
            ],
        ),
    ]
