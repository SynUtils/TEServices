# Create your views here.
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
# from syn_util import job


# Business Logic for Running FET/curl/scp commands to Upload Test data on Jenkins through FET
p = properties.Properties(r'config/TEServices.properties')
prop = p.load()  

def runFET(request):

    f1=request.GET.get('c1')
    featurename=request.GET.get('c2')
    filecount=request.GET.get('c3')
    datetime=request.GET.get('c5')
    print "I am in RUNFET"
    print featurename

    if f1=='1':
        f1="doc";
    if f1=='2':
        f1="docx";
    if f1=='3':
        f1="xls";
    if f1=='4':
        f1="xlsx";
    if f1=='5':
        f1="ppt";
    if f1=='6':
        f1="pptx";


    if f1!= None:
        #Calling "Curl" command to get "Test data through 'FET"tool
        subprocess.call(['curl', '-v', '-L', '-G', '-d',
                     'c1='+ str(f1) +'&c2='+ str(featurename) +'&c3='+ 
                     str(filecount) +'&c4='+ '1' +'&c5='+ str(datetime),
                     prop['FET_URL']])
        
#         
        print "after calling curl"

        #Calling "wget" to download files requested by "Curl" command through "FET" Tool
        subprocess.call(['wget', prop['FET_DOWNLOAD_URL']
                             + str(featurename) + '_' + str(datetime) + '.zip', '-P', '/tmp/'])
        
        


        # running job.py
        print "running python dcript"
        
#         subprocess.call(['sudo python', prop['JENKINS_JOB_RUNNER']])
#         command = "sudo python /Users/sheetalh/Downloads/job.py"
#         c1=commands.getoutput('command')
        print "after running the command"
#         subprocess.call(command, shell=True)

#     id1=request.GET.get('id1')
#     if id1 != str(1):
#         cmd=None
#         print "uploaded"


    return render_to_response(
        'hello.html',{},
  context_instance=RequestContext(request)

)
#Business Logic for Running Jenkins Job/python script t0 run Jenkins TE-Service
# def runpythonscript(request):
#     print 'Inside pythonscriptView*******'
# 
#     if request.is_ajax():
#         if request.method == 'GET':
#             message = "This is GET request"
#         elif request.method == 'POST':
#             message = "This is POST request"
#             print request.POST
#     else:
#         num_instances = request.GET.get('num_instances')
#         print num_instances
#         if num_instances != str(1):
#          num_instances=None
#     command = "sudo python /Users/sheetalh/Downloads/job.py"
#     c1=commands.getoutput('command')
#     print "after running the command"
#     subprocess.call(command, shell=True)
# 
#     return render_to_response(
#         'hello.html',{'command':command},
#   context_instance=RequestContext(request)
# )

#     return HttpResponse("something creative will go here later It'll Hit JenkinsJob.py script")


# def indexshital(request):
#     print 'inside view ***********'
# 
#     return render(request, 'hello.html', {'question': 'shital ==========='})

#Business Logic to Upload CRX on server
def jenkins1(request):
    if request.method == 'POST':
        print " I am in jenkins1 IF"
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
