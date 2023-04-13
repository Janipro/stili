from asyncio.windows_events import NULL
from random import choices
from tkinter import CASCADE
from django.db import models
from django.utils.translation import gettext as _

# Create your models here.
class User(models.Model):
    
    EXPERIENCE = (
        ('1', _('Beginner')),
        ('2', _('Mediocre')),
        ('3', _('Veteran'))
    )

    LOCATION = (
        ('1', _('Trondheim')),
        ('2', _('Oslo')),
        ('3', _('Stavanger')),
        ('4', _('Bergen'))
    )

    firstName = models.CharField(max_length=100, blank = False)
    surname = models.CharField(max_length=100, blank = False)
    phoneNumber = models.TextField(primary_key=True)
    age = models.IntegerField(blank = False)
    experience = models.CharField(choices=EXPERIENCE, blank = False, max_length=100)
    location = models.CharField(choices=LOCATION, blank = False, max_length=100)
    password = models.TextField(blank = False)
    isAdmin = models.BooleanField(default=False)

    def __str__(self):
        return self.firstName

class CommercialUser(models.Model):

    orgNumber = models.TextField(primary_key=True)
    orgName = models.CharField(max_length=100, blank = False, unique=True)
    location = models.TextField(blank = False)
    password = models.TextField(blank = False)
    isAdmin = models.BooleanField(default=False)

    def __str__(self):
        return self.orgName

class Event(models.Model):


    DIFFICULTY = (
        ('1', 'Easy'),
        ('2', 'Mediocre'),
        ('3', 'Veteran')
    )

    AREA = (
        ('1', 'Trondheim'),
        ('2', 'Oslo'),
        ('3', 'Stavanger'),
        ('4', 'Bergen')
    )
    
    eventID = models.TextField(primary_key=True)
    eventName = models.CharField(max_length=100, blank = False)
    eventDate = models.DateTimeField()
    eventDifficulty = models.CharField(max_length=1, choices=DIFFICULTY)
    eventDescription = models.TextField()
    eventLocation = models.CharField(max_length=100)
    eventDistance = models.IntegerField()
    organizer_id = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
    eventSize = models.IntegerField(blank = False, default=0)
    eventParticipants = models.TextField(blank = True, default="")
    commercialOrganizer = models.ForeignKey(CommercialUser, blank = True, null=True, on_delete=models.CASCADE)
    