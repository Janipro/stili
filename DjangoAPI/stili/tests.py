from msilib.schema import Class
from django.test import TestCase
from django.test import Client
from django.db import models
from stili.models import User

# Create your tests here.
class UserTestCase(TestCase):
    def test_saveUser(self):

        c = Client()
        newUser = User()
        newUser.phoneNumber = 12345678
        newUser.firstName = "Jo"
        newUser.surname = "ness"
        newUser.age = 32
        newUser.experience = 2
        newUser.location = "Trondheim"
        newUser.password = "1234"
        newUser.isAdmin = False
        newUser.save()
        responseP = c.post("/users/", {
        "firstName": "Test1",
        "surname": "Test2",
        "phoneNumber": "23456789",
        "age": "21",
        "experience": "1",
        "location": "1",
        "password": "123", 
        "isAdmin": "false"})
        responseG = c.get("/users/")
        print("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
        #print(responseG.data)
        print(responseG.data[1].get("phoneNumber"))
        print(responseG.data[0].get("phoneNumber"))
        print(newUser.__dict__.get("phoneNumber"))
        print("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
        self.assertEquals(int(responseG.data[0].get("phoneNumber")), newUser.__dict__.get("phoneNumber"))
        self.assertFalse(int(responseG.data[1].get("phoneNumber")) == newUser.__dict__.get("phoneNumber"))
