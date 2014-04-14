from django.db import models
from django.core.files import File
from datetime import datetime


date_time = datetime.now().strftime("%Y%m%d%H%M%S") 

class Document(models.Model):
    docfile = models.FileField(upload_to='documents/%Y/%m/%d/' + date_time + '/baseBuild', max_length=5234,blank=True, null=True,)
    compare_build = models.FileField(upload_to='documents/%Y/%m/%d/' + date_time + '/compareBuild', max_length=5234,blank=True, null=True,)
