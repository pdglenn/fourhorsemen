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


class ExperimentalConditionMap(models.Model):
    description = models.TextField()


class ExperimentalConditions(models.Model):
    context1 = models.TextField()
    context2 = models.TextField()
    context3 = models.TextField()
    image_url1 = models.TextField()
    image_url2 = models.TextField()
    image_url3 = models.TextField()


class ExperimentQuestion(models.Model):
    text = models.TextField()
    condition = models.ForeignKey(ExperimentalConditions)


class DemoTypes(models.Model):
    demo_type = models.TextField()


class Ages(models.Model):
    age = models.TextField()


class Races(models.Model):
    race = models.TextField()


class Religions(models.Model):
    religion = models.TextField()


class Genders(models.Model):
    gender = models.TextField()


class Orientations(models.Model):
    orientation = models.TextField()


class SocialFrequency(models.Model):
    frequency = models.TextField()


class SocialUsage(models.Model):
    usage = models.TextField()


class SocialMost(models.Model):
    most_used = models.TextField()


class UserDemographic(models.Model):
    user = models.ForeignKey(Users)
    demo_type = models.ForeignKey(DemoTypes)
    demo_value = models.IntegerField()


