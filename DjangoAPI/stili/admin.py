from django.contrib import admin
from .models import User

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list = ('firstName', 'description', 'completed')

    admin.site.register(User)