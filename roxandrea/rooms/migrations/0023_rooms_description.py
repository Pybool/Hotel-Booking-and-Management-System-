# Generated by Django 4.2.2 on 2023-09-10 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0022_rooms_is_clean_rooms_maintenance_block'),
    ]

    operations = [
        migrations.AddField(
            model_name='rooms',
            name='description',
            field=models.TextField(default=''),
        ),
    ]
