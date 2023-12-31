# Generated by Django 4.2.2 on 2023-09-22 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('uiconfig', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Services',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('image', models.ImageField(upload_to='images/uiconfig/services')),
                ('order_index', models.CharField(max_length=255, unique=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
            ],
        ),
    ]
