# Generated by Django 4.2.2 on 2023-09-28 15:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rooms', '0035_remove_rooms_no_children_remove_rooms_no_xtra_adults'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='roomtype',
            name='no_children',
        ),
        migrations.RemoveField(
            model_name='roomtype',
            name='no_xtra_adults',
        ),
        # migrations.RenameField(
        #     model_name='rooms',
        #     old_name='no_adults',
        #     new_name='no_occupants',
        # ),
    ]
