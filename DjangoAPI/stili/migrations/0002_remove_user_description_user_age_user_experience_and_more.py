# Generated by Django 4.0.2 on 2022-02-14 16:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stili', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='description',
        ),
        migrations.AddField(
            model_name='user',
            name='age',
            field=models.IntegerField(default=18),
        ),
        migrations.AddField(
            model_name='user',
            name='experience',
            field=models.IntegerField(choices=[(1, 'Beginner'), (2, 'Mediocre'), (3, 'Veteran')], default=1),
        ),
        migrations.AddField(
            model_name='user',
            name='location',
            field=models.TextField(default='location'),
        ),
        migrations.AddField(
            model_name='user',
            name='password',
            field=models.TextField(default='password'),
        ),
        migrations.AddField(
            model_name='user',
            name='phoneNumber',
            field=models.TextField(default='00000000'),
        ),
        migrations.AddField(
            model_name='user',
            name='surname',
            field=models.CharField(default='surname', max_length=100),
        ),
        migrations.AlterField(
            model_name='user',
            name='firstName',
            field=models.CharField(default='firstname', max_length=100),
        ),
    ]