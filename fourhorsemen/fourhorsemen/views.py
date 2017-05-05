from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from . import forms
from . import image_logic

def index(request):
    return render(request, 'index.html', {'next': 'content_assessment'})


def content_assessment(request):
    images_seen = request.session.get('images_seen', [])
    image = image_logic.get_random_image(request)
    images_seen.append(image)
    request.session['images_seen'] = images_seen
    
    if request.method == 'POST':
        form = forms.ContentAssessmentForm(request.POST)
        if form.is_valid():
            request.session['image'] = image
            request.session['form'] = form.cleaned_data
            form = forms.ContentAssessmentForm()
            return HttpResponseRedirect(reverse('free_speech'))
                                                               
    else:
        form = forms.ContentAssessmentForm()

    return render(request, 'content_assessment.html', {'form': form, 'image': image,
                                                        'next': reverse('free_speech')})
    

def free_speech(request):
    return render(request, 'free_speech.html', {'next': reverse('who_moderates')})


def who_moderates(request):
    images_seen = request.session.get('images_seen', [])
    image = image_logic.get_random_image(request)
    images_seen.append(image)
    request.session['images_seen'] = images_seen
    
    if request.method == 'POST':
        form = forms.ContentAssessmentForm(request.POST)
        if form.is_valid():
            request.session['image'] = image
            request.session['form'] = form.cleaned_data
            form = forms.ContentAssessmentForm()
            return HttpResponseRedirect(reverse('algorithmic_factors'))
                                                               
    else:
        form = forms.ContentAssessmentForm()

    return render(request, 'who_moderates.html', {'form': form, 'image': image,
                                                  'next': reverse('algorithmic_factors')})


def algorithmic_factors(request):   
    if request.method == 'POST':
        form = forms.ContentAssessmentForm(request.POST)
        if form.is_valid():
            request.session['form'] = form.cleaned_data
            form = forms.ContentAssessmentForm()
            return HttpResponseRedirect(reverse('remediation_options'))
                                                               
    else:
        form = forms.ContentAssessmentForm()

    return render(request, 'algorithmic_factors.html', {'form': form, 
                                                        'next': reverse('remediation_options')})


def remediation_options(request):
    return render(request, 'remediation_options.html', {'next': reverse('content_flags')})


def content_flags(request):
    images_seen = request.session.get('images_seen', [])
    image = image_logic.get_random_image(request)
    images_seen.append(image)
    request.session['images_seen'] = images_seen
    
    if request.method == 'POST':
        form = forms.ContentAssessmentForm(request.POST)
        if form.is_valid():
            request.session['image'] = image
            request.session['form'] = form.cleaned_data
            form = forms.ContentAssessmentForm()
            return HttpResponseRedirect(reverse('context_matters'))
                                                               
    else:
        form = forms.ContentAssessmentForm()

    return render(request, 'content_flags.html', {'form': form, 'image': image,
                                                        'next': reverse('context_matters')})



def context_matters(request):
    images_seen = request.session.get('images_seen', [])
    image = image_logic.get_random_image(request)
    images_seen.append(image)
    request.session['images_seen'] = images_seen
    
    if request.method == 'POST':
        form = forms.SocialMostForm(request.POST)
        if form.is_valid():
            request.session['image'] = image
            request.session['form'] = form.cleaned_data
            form = forms.SocialMostForm()
            return HttpResponseRedirect(reverse('fin'))
                                                               
    else:
        form = forms.SocialMostForm()

    return render(request, 'context_matters.html', {'form': form, 'image': image,
                                                        'next': reverse('fin')})


def viz_playground(request):
    return render(request, 'viz_playground.html')

def fin(request):
    return render(request, 'fin.html', {'next': 'index'})


