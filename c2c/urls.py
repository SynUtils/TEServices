from django.conf.urls import patterns, url

from c2c import views

urlpatterns = patterns('',

#     url(r'^shital', views.indexshital),
#     url(r'^runFET',views.runFET),
    url(r'^TEServices',views.TEServices),
#     url(r'^runpythonscript',views.runpythonscript)

)