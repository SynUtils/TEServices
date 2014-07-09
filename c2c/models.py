from __future__ import print_function
from django.db import models
from django.core.files import File
from datetime import datetime

date_time = datetime.now().strftime("%Y%m%d%H%M%S") 
print("Calling Model...........................................")

class Document(models.Model):
    print("Inside Document Model................................................")
    date_dir = date_time[:4] +"/"+ date_time[4:6] +"/"+ date_time[6:8] +'/'
    docfile = models.FileField(upload_to='documents/' + date_dir + date_time + '/baseBuild', max_length=5234,blank=True, null=True,)
    compare_build = models.FileField(upload_to='documents/' + date_dir + date_time + '/compareBuild', max_length=5234,blank=True, null=True,)
    test_data = models.FileField(upload_to='documents/' + date_dir + date_time + '/test_data', max_length=5234,blank=True, null=True,)

class E2E_model(models.Model):
    date_dir = date_time[:4] +"/"+ date_time[4:6] +"/"+ date_time[6:8] +'/'
    e2e_file = models.FileField(upload_to='documents/' + date_dir + date_time + '/e2eBuild', max_length=5234,blank=True, null=True,)
