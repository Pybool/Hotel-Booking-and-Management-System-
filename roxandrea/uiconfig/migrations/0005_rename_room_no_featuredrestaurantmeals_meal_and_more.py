# Generated by Django 4.2.2 on 2023-09-22 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('uiconfig', '0004_featuredrestaurantmeals'),
    ]

    operations = [
        migrations.RenameField(
            model_name='featuredrestaurantmeals',
            old_name='room_no',
            new_name='meal',
        ),
        migrations.RenameField(
            model_name='uimasterrooms',
            old_name='room_no',
            new_name='room',
        ),
        migrations.AddField(
            model_name='featuredrestaurantmeals',
            name='order_index',
            field=models.CharField(default=1, max_length=255, unique=True),
        ),
        migrations.AddField(
            model_name='uimasterrooms',
            name='order_index',
            field=models.CharField(default=1, max_length=255, unique=True),
        ),
    ]