from django.db import models


# Create your models here.
class Question(models.Model):
    """Model for each question"""
    title = models.CharField()
    artist = models.CharField(default="Placeholder")
    lyrics = models.TextField()

    def __str__(self):
        return self.title

    # serialise for allowing creation of json

    def serialise(self):
        return {
            "id": self.id,
            "title": self.title,
            "artist": self.artist,
            "lyrics": self.lyrics,
        }