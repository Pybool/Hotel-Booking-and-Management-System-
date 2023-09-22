# Generated by Django 4.2.2 on 2023-08-26 05:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0010_alter_users_profile_pics'),
    ]

    operations = [
        migrations.RenameField(
            model_name='users',
            old_name='country',
            new_name='department',
        ),
        migrations.RenameField(
            model_name='users',
            old_name='is_vendor',
            new_name='is_admin',
        ),
        migrations.RemoveField(
            model_name='users',
            name='current_subscription_transaction',
        ),
        migrations.RemoveField(
            model_name='users',
            name='ig_handle',
        ),
        migrations.RemoveField(
            model_name='users',
            name='otp',
        ),
        migrations.RemoveField(
            model_name='users',
            name='otp_timestamp',
        ),
        migrations.RemoveField(
            model_name='users',
            name='paystack_customer_no',
        ),
        migrations.RemoveField(
            model_name='users',
            name='subscription_type',
        ),
        migrations.RemoveField(
            model_name='users',
            name='transaction_pin',
        ),
        migrations.RemoveField(
            model_name='users',
            name='transaction_pin_enabled',
        ),
        migrations.RemoveField(
            model_name='users',
            name='vendor_registration_amount',
        ),
    ]
