# Generated by Django 4.2.2 on 2023-09-16 01:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0003_rename_contact_type_contacttype_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contacts',
            name='contact_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='contacts.contacttype'),
        ),
    ]
