"""fourhorsemen URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^content_assessment/$', views.content_assessment, name='content_assessment'),
    url(r'^free_speech/$', views.free_speech, name='free_speech'),
    url(r'^who_moderates/$', views.who_moderates, name='who_moderates'),
    url(r'^algorithmic_factors/$', views.algorithmic_factors, name='algorithmic_factors'),
    url(r'^remediation_options/$', views.remediation_options, name='remediation_options'),
    url(r'^content_flags/$', views.content_flags, name='content_flags'),
    url(r'^context_matters/$', views.context_matters, name='context_matters'),
    url(r'^fin/$', views.fin, name='fin'),
    url(r'^viz_playground/$', views.viz_playground, name='viz_playground'),
    url(r'^admin/', admin.site.urls),
]
