# Generated by Django 4.2.2 on 2023-08-26 14:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('finance', '0004_rename_rate_type_rates_rate_name'),
        ('reservations', '0004_alter_reservations_check_in_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservations',
            name='rate',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='finance.rates'),
        ),
    ]
