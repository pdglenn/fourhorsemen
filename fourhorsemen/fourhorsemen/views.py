from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from . import forms

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
    if request.method == 'POST':
        form = forms.ContentAssessmentForm(request.POST)
        if form.is_valid():
            return HttpResponseRedirect(reverse('remediation_assessment'))
    else:
        form = forms.ContentAssessmentForm()

    return render(request, 'content_assessment.html', {'form': form})
    

def demographic_info(request):
    if request.method == 'POST':
        form = forms.DemographicForm(request.POST)
        if form.is_valid():
            print('form is valid')
            print(form.cleaned_data)
            return HttpResponseRedirect(reverse('harassment_experience'))
    else:
        form = forms.DemographicForm()

    return render(request, 'demographic_info.html', {'form': form})

def harassment_experience(request):
    return render(request, 'harassment_experience.html')

def remediation_assessment(request):
    return render(request, 'remediation_assessment.html')

def social_media_usage(request):
    return render(request, 'social_media_usage.html')
