from django.db import models
from django.core.files import File




class Document(models.Model):
    docfile = models.FileField(upload_to='documents/%Y/%m/%d', max_length=5234,blank=True, null=True,)

