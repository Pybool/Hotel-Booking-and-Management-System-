# Generated by Django 4.2.2 on 2023-09-06 11:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservations', '0007_rename_rate_reservations_room_rate'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservations',
            name='payment_ref',
            field=models.CharField(blank=True, default='', max_length=255, null=True),
        ),
    ]
