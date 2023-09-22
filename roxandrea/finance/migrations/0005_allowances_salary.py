# Generated by Django 4.2.2 on 2023-08-30 07:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finance', '0004_rename_rate_type_rates_rate_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Allowances',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('allowance_name', models.CharField(default='', max_length=100, null=True)),
                ('allowance_amount', models.DecimalField(decimal_places=2, default=0.0, max_digits=20)),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Salary',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('salary_name', models.CharField(default='', max_length=100, null=True)),
                ('salary_amount', models.DecimalField(decimal_places=2, default=0.0, max_digits=20)),
                ('max_deductable_salary', models.IntegerField(default=10)),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
    ]
