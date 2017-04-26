from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from . import forms
from . import image_logic

def index(request):
    return render(request, 'index.html')


def visualizations(request):
    output = {}
    for k in request.session.keys():
        output[k] = request.session[k]
    return render(request, 'visualizations.html', {'output': output})


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
            return HttpResponseRedirect(reverse('content_visualization'))
                                                               
    else:
        form = forms.ContentAssessmentForm()

    return render(request, 'content_assessment.html', {'form': form, 'image': image,
                                                       'how_much': list(form)[:-1],
                                                       'which_remediation': list(form)[-1]})
    

def content_visualization(request):
    try:
        form = request.session.pop('form')
        image = request.session.pop('image')
    except KeyError:
        form, image = None, None

    return render(request, 'content_visualization.html', {'form': form,
                                                          'image': image})


