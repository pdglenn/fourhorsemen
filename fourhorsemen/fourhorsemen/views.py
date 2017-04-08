from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def detail(request, race_id):
    return HttpResponse('you are looking at id {}'.format(race_id))

def foo(request):
    return HttpResponse('foo')

def additional_comments(request):
    return render(request, 'additional_comments.html')

def completion_code(request):
    return render(request, 'completion_code.html')

def computational_moderation(request):
    return render(request, 'computational_moderation.html')

def content_assessment(request):
    return render(request, 'content_assessment.html')

def demographic_info(request):
    return render(request, 'demographic_info.html')

def harassment_experience(request):
    return render(request, 'harassment_experience.html')

def remediation_assessment(request):
    return render(request, 'remediation_assessment.html')

def social_media_usage(request):
    return render(request, 'social_media_usage.html')
