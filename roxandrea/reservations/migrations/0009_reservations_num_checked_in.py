# Generated by Django 4.2.2 on 2023-09-06 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reservations', '0008_reservations_payment_ref'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservations',
            name='num_checked_in',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
