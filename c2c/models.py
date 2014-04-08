from django.db import models
from django.core.files import File




class Document(models.Model):
    docfile = models.FileField(upload_to='documents/%Y/%m/%d/baseBuild', max_length=5234,blank=True, null=True,)
    compare_build = models.FileField(upload_to='documents/%Y/%m/%d/compareBuild', max_length=5234,blank=True, null=True,)
    
