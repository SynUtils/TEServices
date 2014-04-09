from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from TEServices.forms import DocumentForm
from c2c.models import Document
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
# from syn_util import job


# Business Logic for Running FET/curl/scp commands to Upload Test data on Jenkins through FET
//p = properties.Properties(r'config/TEServices.properties')
p = properties.Properties(r'/home/synerzip/Documents/TEServices/config/TEServices.properties')
prop = p.load()  



#Business Logic to Upload CRX on server
def jenkins1(request):
    if request.method == 'POST':
        print "Inside jenkins1 POST"
        file_type_dict = {'1' : 'doc',
                          '2' : 'docx',
                          '3' : 'xls',
                          '4' : 'xlsx',
                          '5' : 'ppt',
                          '6' : 'pptx'}
        
#         print request.POST['c3']
#         print request.POST
#         print request.POST['combo1']
        
        # Run FET
        file_type = request.POST['combo1']
        feature_name = request.POST['combo2']
        file_count =  request.POST['fileCount']
        date_time = datetime.now().strftime("%Y%m%d%H%M%S")
        
        print file_type, feature_name, file_count, date_time
        
#         if file_type =='1':
#             file_type ="doc";
#         if file_type =='2':
#             file_type ="docx";
#         if file_type =='3':
#             file_type ="xls";
#         if file_type =='4':
#             file_type ="xlsx";
#         if file_type =='5':
#             file_type ="ppt";
#         if file_type =='6':
#             file_type ="pptx";
        
        if file_type != None:
        #Calling "Curl" command to get "Test data through 'FET"tool
            subprocess.call(['curl', '-v', '-L', '-G', '-d',
                         'c1='+ str(file_type_dict[file_type]) +'&c2='+ str(feature_name) +'&c3='+ 
                         str(file_count) +'&c4='+ '1' +'&c5='+ str(date_time),
                         prop['FET_URL']])
            
            
            print "after calling curl, calling wget....."
    
            #Calling "wget" to download files requested by "Curl" command through "FET" Tool
            subprocess.call(['wget', prop['FET_DOWNLOAD_URL']
                                 + str(feature_name) + '_' + str(date_time) + '.zip', '-P', '/tmp/'])
            
        
        
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            newdoc = Document(docfile = request.FILES['docfile'])
            newdoc.save()
            print newdoc.docfile.file
            print newdoc.docfile.size
    #             scp1= commands.getoutput('scp /Users/sheetalh/PycharmProjects/TEServices/TEServices/sheetal/documents/2014/03/26/* sheetalh@172.24.212.122:~/Desktop/UploadedCRX')
            print " calling SCP to Remotely upload doc...document is saving in progress....."
            #flush the CRX after Uploading on the Server
            # shutil.rmtree('/Users/sheetalh/PycharmProjects/TEServices/TEServices/sheetal/documents/2014/03/18/')
    
            # Redirect to the document list after POST
            if request.FILES.has_key('compare_build'):
                new_compare_build = Document(compare_build = request.FILES['compare_build'])
                new_compare_build.save()
                print 'Compare build: ', new_compare_build.compare_build.file

    else:
        form = DocumentForm() # A empty, unbound form


    # Load documents for the list page
    documents = Document.objects.all()

# Render list page with the documents and the form
    return render_to_response(
     'hello.html',
    {'documents':documents,'form':form},
    context_instance = RequestContext(request)
    )
