from django.db import models
from django.utils import timezone

class Users(models.Model):
    timestamp = models.DateTimeField(default=timezone.now)


class SurveyQuestion(models.Model):
    text = models.TextField()

    def __str__(self):
        return self.text

class SurveyAnswers(models.Model):
    question = models.ForeignKey(SurveyQuestion)
    rating = models.IntegerField()

    def __str__(self):
        return self.question


class ExperimentalConditionMap(models.Model):
    description = models.TextField()
    def __str__(self):
        return self.description


class ExperimentalConditions(models.Model):
    name = models.TextField()
    context1 = models.TextField()
    context2 = models.TextField()
    context3 = models.TextField()
    image_url1 = models.TextField()
    image_url2 = models.TextField()
    image_url3 = models.TextField()
    def __str__(self):
        return self.name



class ExperimentQuestion(models.Model):
    text = models.TextField()
    condition = models.ForeignKey(ExperimentalConditions)
    def __str__(self):
        return self.text


class DemoTypes(models.Model):
    demo_type = models.TextField()
    def __str__(self):
        return self.demo_type


class Ages(models.Model):
    age = models.TextField()
    def __str__(self):
        return self.age


class Races(models.Model):
    race = models.TextField()
    def __str__(self):
        return self.race


class Religions(models.Model):
    religion = models.TextField()
    def __str__(self):
        return self.religion


class Genders(models.Model):
    gender = models.TextField()
    def __str__(self):
        return self.gender


class Orientations(models.Model):
    orientation = models.TextField()
    def __str__(self):
        return self.orientation


class SocialFrequency(models.Model):
    frequency = models.TextField()
    def __str__(self):
        return self.frequency


class SocialUsage(models.Model):
    usage = models.TextField()
    def __str__(self):
        return self.usage


class SocialMost(models.Model):
    most_used = models.TextField()
    def __str__(self):
        return self.most_used


class UserDemographic(models.Model):
    user = models.ForeignKey(Users)
    demo_type = models.ForeignKey(DemoTypes)
    demo_value = models.IntegerField()
    def __str__(self):
        return self.user


