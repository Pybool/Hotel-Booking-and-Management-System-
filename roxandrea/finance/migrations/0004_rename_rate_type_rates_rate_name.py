# Generated by Django 4.2.2 on 2023-08-26 10:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('finance', '0003_rename_rate_roomandrates_rate_per_night'),
    ]

    operations = [
        migrations.RenameField(
            model_name='rates',
            old_name='rate_type',
            new_name='rate_name',
        ),
    ]
