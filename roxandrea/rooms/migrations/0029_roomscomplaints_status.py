# Generated by Django 4.2.2 on 2023-09-15 20:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0028_rename_receipient_roomscomplaints_assigned_to_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='roomscomplaints',
            name='status',
            field=models.CharField(blank=True, default='OPEN', max_length=255, null=True),
        ),
    ]
