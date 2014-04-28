from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from TEServices.forms import DocumentForm
from c2c.models import Document
import c2c.models 
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.forms import fields
from django.template import Context, loader
from django.core.context_processors import csrf
import subprocess

# import commands
import shutil
from syn_util import properties
from datetime import datetime
import requests


#p = properties.Properties(r'config/TEServices.properties')
p = properties.Properties(r'/home/synerzip/Documents/TEServices/config/TEServices.properties')
#p = properties.Properties(r'config/TEServices.properties')
prop = p.load()  

#Business Logic to Upload CRX on server
def jenkins1(request):
    global BASE_BUILD_DIR, COMPARE_BUILD_DIR, TEST_FILES
    if request.method == 'POST':
#         print "Inside jenkins1 POST"
        file_type_dict = {'1' : 'doc',
                          '2' : 'docx',
                          '3' : 'xls',
                          '4' : 'xlsx',
                          '5' : 'ppt',
                          '6' : 'pptx'}
        
        # Run FET
        file_type = request.POST['combo1']
        feature_name = request.POST['combo2']
        file_count =  request.POST['fileCount']
        email_data = request.POST['exampleInputEmail1']
    
        form = DocumentForm(request.POST, request.FILES)
        
        print "Uploading base build...."
        if request.FILES.has_key('docfile'):
            newdoc = Document(docfile = request.FILES['docfile'])
            newdoc.save()
            BASE_BUILD_DIR = newdoc.docfile.file 
            print 'Base build: ', newdoc.docfile.file    

        print " Uploading compare build...."
        # Redirect to the document list after POST
        if request.FILES.has_key('compare_build'):
            new_compare_build = Document(compare_build = request.FILES['compare_build'])
            new_compare_build.save()
            COMPARE_BUILD_DIR = new_compare_build.compare_build.file
            print 'Compare build: ', new_compare_build.compare_build.file
        if file_type != None:
        #Calling "Curl" command to get "Test data through 'FET"tool
            try: 
                print "Calling curl....."
                subprocess.check_output(['curl', '-L', '-G', '-d',
                             'c1='+ str(file_type_dict[file_type]) +'&c2='+ str(feature_name) +'&c3='+ 
                             str(file_count) +'&c4='+ '1' +'&c5='+ str(c2c.models.date_time),
                             prop['FET_URL']])            
                
        #Calling "wget" to download files requested by "Curl" command through "FET" Tool
                print "Calling wget....."  
                date_dir = c2c.models.date_time[:4] +"/"+ c2c.models.date_time[4:6] +"/"+ c2c.models.date_time[6:8]
                TEST_FILES = r'/var/www/media/documents/' + date_dir + '/' +  c2c.models.date_time + '/'
                subprocess.check_output(['wget', prop['FET_DOWNLOAD_URL']
                                     + str(feature_name) + '_' + str(c2c.models.date_time) + '.zip', '-P', TEST_FILES])
            except:
#                 print Exception
                return render_to_response('exception.html', context_instance = RequestContext(request))
                    
            # Calling Jenkins
            jenkins_url = r'http://172.24.212.35:8080/job/paramsC2C/buildWithParameters?BaseCrxPath=' + str(BASE_BUILD_DIR) + '&CompareCrxPath=' + str(COMPARE_BUILD_DIR) + '&FilesPath=' + str(TEST_FILES) + str(feature_name) + '_' + str(c2c.models.date_time) + '.zip' + '&CopyfilesPath=' + str(TEST_FILES) + r'&EmailAddress=' + str(email_data) + r'&Result=' + 'media/documents/' + date_dir + '/' +  c2c.models.date_time + '/' + 'Result/' 
            print jenkins_url
            requests.get(jenkins_url)

    else:
        form = DocumentForm()                                    # A empty, unbound form


    date_dir = c2c.models.date_time[:4] +"/"+ c2c.models.date_time[4:6] +"/"+ c2c.models.date_time[6:8] +'/'
    output_dir = date_dir + c2c.models.date_time + '/Result/index.html'
    # Load documents for the list page
    documents = Document.objects.all()

# Render list page with the documents and the form
    return render_to_response(
     'hello.html',
    {'documents':documents, 'form':form, 'output':output_dir},
    context_instance = RequestContext(request)
    )


def show_output(request):
    return render_to_response('index.html', context_instance = RequestContext(request) )

