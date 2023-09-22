# Generated by Django 4.2.2 on 2023-08-26 05:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('finance', '0001_initial'),
        ('rooms', '0001_initial'),
        ('contacts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reservations',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('check_in', models.DateTimeField(auto_now_add=True)),
                ('check_out', models.DateTimeField(auto_now_add=True)),
                ('no_rooms', models.IntegerField()),
                ('no_adults', models.IntegerField()),
                ('no_children', models.IntegerField()),
                ('contact_type', models.CharField(max_length=255)),
                ('room_tarrif', models.CharField(blank=True, max_length=255, null=True)),
                ('tax_amount', models.DecimalField(decimal_places=2, default=0.0, max_digits=20)),
                ('total_amount', models.DecimalField(decimal_places=2, default=0.0, max_digits=20)),
                ('advance_amount', models.DecimalField(decimal_places=2, default=0.0, max_digits=20)),
                ('is_checked_in', models.BooleanField(default=False)),
                ('has_checked_out', models.BooleanField(default=False)),
                ('is_cancelled', models.BooleanField(default=False)),
                ('is_fully_paid', models.BooleanField(default=False)),
                ('contact', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contacts.contacts')),
                ('rate', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='finance.rates')),
                ('rooms', models.ManyToManyField(default=[], to='rooms.rooms')),
            ],
        ),
    ]
