# Generated by Django 4.2.2 on 2023-08-26 15:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservations', '0005_alter_reservations_rate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservations',
            name='reservation_token',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
