# Generated by Django 4.2.2 on 2023-09-03 22:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0015_alter_rooms_room_no'),
    ]

    operations = [
        migrations.AddField(
            model_name='rooms',
            name='room_rate',
            field=models.DecimalField(decimal_places=2, default=2000.0, max_digits=20),
        ),
    ]
