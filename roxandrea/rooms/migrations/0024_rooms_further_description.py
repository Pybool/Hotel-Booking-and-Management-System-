# Generated by Django 4.2.2 on 2023-09-10 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0023_rooms_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='rooms',
            name='further_description',
            field=models.TextField(default=''),
        ),
    ]
