from django.db import models
from django.contrib.auth.models import User


class List_of_word(models.Model):
    list_name = models.CharField(max_length=100, blank=False)
    list_description = models.TextField(max_length=1000, blank=False)
    creation_time = models.DateTimeField(auto_now_add=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.list_name


class Word(models.Model):
    word_away = models.CharField(max_length=100, blank=False)
    word_home = models.CharField(max_length=100, blank=False)
    sentence_away = models.TextField(max_length=1000)
    sentence_home = models.TextField(max_length=1000)
    word_description = models.TextField(max_length=1000)
    synonyms = models.CharField(max_length=200)
    learnt = models.BooleanField(default=False)
    list_of_word_id = models.ForeignKey(List_of_word, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.word_away


class Home_content(models.Model):
    title_eng = models.CharField(max_length=100, blank=False)
    title_hun = models.CharField(max_length=100, blank=False)
    text_eng = models.TextField(max_length=1000, blank=False)
    text_hun = models.TextField(max_length=1000, blank=False)
    img_src = models.CharField(max_length=100, blank=False)

    def __str__(self):
        return self.title_eng
