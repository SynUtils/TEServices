from TEServices.forms import DocumentForm
from c2c.models import Document
from django.shortcuts import render_to_response
from django.template import RequestContext
import subprocess
import requests
from syn_util import properties
import c2c.models
from TEServices.forms import e2eForm 
from c2c.models import E2E_model

p = properties.Properties(r'/home/synerzip/Documents/TEServices/config/TEServices.properties')
# p = properties.Properties(r'config/TEServices.properties')
prop = p.load()  

OUTPUT_DIR = ""
show_output = True 

#Business Logic to Upload CRX on server
def TEServices(request):
    global BASE_BUILD_DIR, COMPARE_BUILD_DIR, TEST_FILES, OUTPUT_DIR
    show_output = False
    model_date_time = c2c.models.date_time
    model_date_dir = model_date_time[:4] +"/"+ model_date_time[4:6] +"/"+ model_date_time[6:8]
    if request.method == 'POST':      
        
#         print "Inside jenkins1 POST"
        file_type_dict = {'1' : 'doc',
                          '2' : 'docx',
                          '3' : 'xls',
                          '4' : 'xlsx',
                          '5' : 'ppt',
                          '6' : 'pptx'}
        # Run FET
        file_type = request.POST.get('combo1')
        feature_name = request.POST.get('combo2')
        file_count =  request.POST.get('fileCount')
        email_data = request.POST.get('exampleInputEmail1')
        show_output = request.POST.get('show_output')
        form = DocumentForm(request.POST, request.FILES)
        
        if request.FILES.has_key('docfile'):
            print "Uploading base build...."
            newdoc = Document(docfile = request.FILES.get('docfile'))
            newdoc.save()
            BASE_BUILD_DIR = newdoc.docfile.file 
            print 'Base build: ', BASE_BUILD_DIR    

        # Redirect to the document list after POST
        if request.FILES.has_key('compare_build'):
            print "Uploading compare build...."
            new_compare_build = Document(compare_build = request.FILES.get('compare_build'))
            new_compare_build.save()
            COMPARE_BUILD_DIR = new_compare_build.compare_build.file
            print 'Compare build: ', COMPARE_BUILD_DIR
            
        TEST_FILES = r'/var/www/media/documents/' + model_date_dir + '/' +  model_date_time + '/'
        if request.FILES.has_key('test_data'):
            print "Uploading Test Data..."
            test_data = Document(test_data = request.FILES.get('test_data'))
            test_data.save()
#             TEST_DATA_DIR = test_data.test_data.file
            TEST_FILES = str(test_data.test_data.file)
            print "Test Data: ", TEST_FILES
            test_files_dir = TEST_FILES[:TEST_FILES.rfind('/') + 1]
#             Calling Jenkins
            jenkins_url =   r'http://172.24.212.35:8080/job/paramsC2C/buildWithParameters?BaseCrxPath=' + \
                            str(BASE_BUILD_DIR) + '&CompareCrxPath=' + \
                            str(COMPARE_BUILD_DIR) + '&FilesPath=' + str(TEST_FILES) + \
                            '&CopyfilesPath=' + str(test_files_dir) + r'&EmailAddress=' + \
                            str(email_data) + r'&Result=' + 'media/documents/' + \
                            model_date_dir + '/' + model_date_time + '/' + 'Result/'
            print "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Inside Own Test Data ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"
        else:                       
            if file_type != None:
            #Calling "Curl" command to get "Test data through 'FET"tool
                try: 
                    print "Calling curl....."
                    subprocess.check_output(['curl', '-L', '-G', '-d',
                                 'c1='+ str(file_type_dict[file_type]) +'&c2='+ str(feature_name) +'&c3='+ 
                                 str(file_count) +'&c4='+ '1' +'&c5='+ str(model_date_time),
                                 prop['FET_URL']])            
                    
            #Calling "wget" to download files requested by "Curl" command through "FET" Tool
                    print "Calling wget....."  
                    subprocess.check_output(['wget', prop['FET_DOWNLOAD_URL']
                                         + str(feature_name) + '_' + str(model_date_time) + '.zip', '-P', TEST_FILES])
#                     subprocess.check_output(['wget', prop['FET_DOWNLOAD_URL']
#                                          + str(feature_name) + '_' + str(model_date_time) + '.zip', '-P', '/tmp/'])
                except:
    #                 print Exception
                    return render_to_response('exception.html', context_instance = RequestContext(request))
                        
    #             Calling Jenkins
                jenkins_url =   r'http://172.24.212.35:8080/job/paramsC2C/buildWithParameters?BaseCrxPath=' + \
                                str(BASE_BUILD_DIR) + '&CompareCrxPath=' + \
                                str(COMPARE_BUILD_DIR) + '&FilesPath=' + str(TEST_FILES) + \
                                str(feature_name) + '_' + str(model_date_time) + '.zip' + \
                                '&CopyfilesPath=' + str(TEST_FILES) + r'&EmailAddress=' + \
                                str(email_data) + r'&Result=' + 'media/documents/' + \
                                model_date_dir + '/' + model_date_time + '/' + 'Result/'
              
        print jenkins_url
        requests.get(jenkins_url)
    else:
        form = DocumentForm()                                    # A empty, unbound form

# Load documents for the list page
    documents = Document.objects.all()
    OUTPUT_DIR = model_date_dir + '/' + model_date_time + '/Result' + '/index.html'

# Toggle output folder link on c2c.html
    if show_output:
        show_output = True
    else: 
        show_output = False
        
# Render list page with the documents and the form
    return render_to_response(
     'c2c.html',
    {'documents':documents, 'form':form,'output':OUTPUT_DIR, 'show_output': show_output },
    context_instance = RequestContext(request)
    )

def e2e(request):
    if request.method == 'POST': 
        if request.FILES.has_key('e2e_file'):
             print "e2e file is present"
             new_file = E2E_model(e2e_file = request.FILES['e2e_file'])
             new_file.save()
             e2e_build = new_file.e2e_file.file 
             print 'e2e build: ', e2e_build
             
    form = e2eForm(request.POST, request.FILES)  
    return render_to_response('e2e.html', {'form': form}, context_instance = RequestContext(request) )
