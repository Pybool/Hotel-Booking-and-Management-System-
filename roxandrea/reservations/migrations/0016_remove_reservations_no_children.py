# Generated by Django 4.2.2 on 2023-09-28 18:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reservations', '0015_reservations_package'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reservations',
            name='no_children',
        ),
    ]
