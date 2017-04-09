from django import forms
import models

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