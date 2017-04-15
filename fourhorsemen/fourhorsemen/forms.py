from django import forms
from django.utils.safestring import mark_safe
from . import models

class HorizRadioRenderer(forms.RadioSelect.renderer):
    """ this overrides widget method to put radio buttons horizontally
        instead of vertically.
    """
    def render(self):
            """Outputs radios"""
            return mark_safe(u'\n'.join([u'%s\n' % w for w in self]) + '<br><br>')
        
class ContentAssessmentForm(forms.Form):
    how_harassing = forms.ModelChoiceField(queryset=models.HowHarassing.objects.all(),
                                           widget=forms.RadioSelect(renderer=HorizRadioRenderer),
                                           required=False,
                                           label='How harrassing is this social media post?',)


    how_abusive = forms.ModelChoiceField(queryset=models.HowAbusive.objects.all(),
                                         widget=forms.RadioSelect(),
                                         required=False,
                                         label='How abusive is this social media post?')

    how_appropriate = forms.ModelChoiceField(queryset=models.HowAppropriate.objects.all(),
                                             widget=forms.RadioSelect(),
                                             required=False,
                                             label='How appropriate is this social media post?')

    how_often = forms.ModelChoiceField(queryset=models.HowOften.objects.all(),
                                       widget=forms.RadioSelect(),
                                       required=False,
                                       label='How often do you come across this type of social media post?')

    which_remediation = forms.ModelMultipleChoiceField(queryset=models.WhichRemediation.objects.all(),
                                                       widget=forms.CheckboxSelectMultiple(),
                                                       required=False,
                                                       label='Which of the following remediation actions would you prefer be applied to this social media post?'
                                                       )

class DemographicForm(forms.Form):

    age = forms.ModelChoiceField(queryset=models.Ages.objects.all(), 
                                 widget=forms.RadioSelect(),
                                 required=False,
                                 label='How old are you?')
    race = forms.ModelMultipleChoiceField(queryset=models.Races.objects.all(), 
                                          widget=forms.CheckboxSelectMultiple(),
                                          required=False,
                                          label='Which racial or ethnic categories describe you?')
    gender = forms.ModelChoiceField(queryset=models.Genders.objects.all(), 
                                    widget=forms.RadioSelect(),
                                    required=False,
                                    label='Which gender category best describes you?')
    orientation = forms.ModelChoiceField(queryset=models.Orientations.objects.all(), 
                                         widget=forms.RadioSelect(),
                                         required=False,
                                         label='Do you consider yourself to be:')



class NameForm(forms.Form):
    your_name = forms.CharField(label='Your name', max_length=100)
