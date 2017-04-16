from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from . import forms
from . import image_logic

def index(request):
    request.session.flush()
    request.session['exp_group'] = image_logic.get_experimental_group()
    return render(request, 'index.html')

def detail(request, race_id):
    return HttpResponse('you are looking at id {}'.format(race_id))

def foo(request):
    return HttpResponse('foo')

def additional_comments(request):
    print request.session
    return render(request, 'additional_comments.html')

def completion_code(request):
    output = {}
    for k in request.session.keys():
        output[k] = request.session[k]
    return render(request, 'completion_code.html', {'output': output})

def computational_moderation(request):
    if request.method == 'POST':
        form = forms.ComputationalModerationForm(request.POST)
        if form.is_valid():
            request.session['computational_moderation'] = form.cleaned_data
            return HttpResponseRedirect(reverse('social_media_usage'))
    else:
        form = forms.ComputationalModerationForm()
    return render(request, 'computational_moderation.html', {'form': form})

def content_assessment(request):
    images_seen = request.session.get('images_seen', [])
    image = image_logic.get_random_image(request)
    images_seen.append(image)
    request.session['images_seen'] = images_seen
    
    if request.method == 'POST':
        form = forms.ContentAssessmentForm(request.POST)
        if form.is_valid():
            ca_count = request.session.get('ca_count', 0)
            print ca_count
            if ca_count < 4:
                request.session['assesment_' + str(ca_count)] = form.cleaned_data
                ca_count += 1
                request.session['ca_count'] = ca_count
                form = forms.ContentAssessmentForm()
                return render(request, 'content_assessment.html', {'form': form, 'image': image})
            return HttpResponseRedirect(reverse('remediation_assessment'))
    else:
        form = forms.ContentAssessmentForm()

    return render(request, 'content_assessment.html', {'form': form, 'image': image})
    

def demographic_info(request):
    if request.method == 'POST':
        form = forms.DemographicForm(request.POST)
        if form.is_valid():
            request.session['demographic_info'] = form.cleaned_data
            return HttpResponseRedirect(reverse('harassment_experience'))
    else:
        form = forms.DemographicForm()

    return render(request, 'demographic_info.html', {'form': form})

def harassment_experience(request):
    if request.method == 'POST':
        form = forms.HarassmentExperienceForm(request.POST)
        if form.is_valid():
            request.session['harassment_experience'] = form.cleaned_data
            return HttpResponseRedirect(reverse('additional_comments'))
    else:
        form = forms.HarassmentExperienceForm()
    return render(request, 'harassment_experience.html', {'form': form})

def remediation_assessment(request):
    return render(request, 'remediation_assessment.html')

def social_media_usage(request):
    if request.method == 'POST':
        form = forms.SocialUsageForm(request.POST)
        if form.is_valid():
            print form.cleaned_data
            return HttpResponseRedirect(reverse('demographic_info'))
    else:
        form = forms.SocialUsageForm()
    return render(request, 'social_media_usage.html', {'platforms': list(form)[:-1],
                                                        'most_used': list(form)[-1]})


