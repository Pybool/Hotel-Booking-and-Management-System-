# Generated by Django 4.2.2 on 2023-09-16 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservations', '0011_reservations_is_history'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservations',
            name='history_rooms',
            field=models.JSONField(default=[]),
        ),
    ]
