import os
import sys
path = '/home/synerzip/Documents/TEServices'
if path not in sys.path:
    sys.path.append(path)
os.environ['DJANGO_SETTINGS_MODULE'] = 'TEServices.settings'
import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()
