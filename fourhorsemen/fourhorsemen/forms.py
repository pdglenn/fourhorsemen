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
                                           empty_label=None,
                                           label='How harrassing is this social media post?',)

class SocialMostForm(forms.Form):
    how_harassing = forms.ModelChoiceField(queryset=models.SocialMost.objects.all(),
                                           widget=forms.RadioSelect(renderer=HorizRadioRenderer),
                                           required=False,
                                           empty_label=None,
                                           label='What site do you spend the most time on?',)

class WhoModeratesForm(forms.Form):
    most_fair = forms.ModelChoiceField(queryset=models.WhichModerator.objects.all(),
                                       widget=forms.RadioSelect(renderer=HorizRadioRenderer),
                                       required=False,
                                       empty_label=None,
                                       label='Which of these do you think is the most fair?')

    most_accurate = forms.ModelChoiceField(queryset=models.WhichModerator.objects.all(),
                                       widget=forms.RadioSelect(renderer=HorizRadioRenderer),
                                       required=False,
                                       empty_label=None,
                                       label='Which of these do you think is the most accurate?')

    most_trustworthy = forms.ModelChoiceField(queryset=models.WhichModerator.objects.all(),
                                       widget=forms.RadioSelect(renderer=HorizRadioRenderer),
                                       required=False,
                                       empty_label=None,
                                       label='Which of these do you think is the most trustworthy?')

class AlgorithmicFactorsForm(forms.Form):
    most_fair = forms.ModelChoiceField(queryset=models.ComputationalModeration.objects.all(),
                                       widget=forms.RadioSelect(),
                                       required=False,
                                       empty_label=None,
                                       label='Which of these factors is it most important to include?')

    # how_abusive = forms.ModelChoiceField(queryset=models.HowAbusive.objects.all(),
    #                                      widget=forms.RadioSelect(),
    #                                      required=False,
    #                                      label='How abusive is this social media post?')

    # # how_appropriate = forms.ModelChoiceField(queryset=models.HowAppropriate.objects.all(),
    # #                                          widget=forms.RadioSelect(),
    # #                                          required=False,
    # #                                          label='How appropriate is this social media post?')

    # how_often = forms.ModelChoiceField(queryset=models.HowOften.objects.all(),
    #                                    widget=forms.RadioSelect(),
    #                                    required=False,
    #                                    label='How often do you come across this type of social media post?')

    # which_remediation = forms.ModelMultipleChoiceField(queryset=models.WhichRemediation.objects.all(),
    #                                                    widget=forms.CheckboxSelectMultiple(),
    #                                                    required=False,
    #                                                    label='Which of the following remediation actions would you prefer be applied to this social media post?'
    #                                                    )


