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
    url(r'^additional_comments/$', views.additional_comments, name='additional_comments'),
    url(r'^completion_code/$', views.completion_code, name='completion_code'),
    url(r'^computational_moderation/$', views.computational_moderation, name='computational_moderation'),
    url(r'^content_assessment/$', views.content_assessment, name='content_assessment'),
    url(r'^demographic_info/$', views.demographic_info, name='demographic_info'),
    url(r'^harassment_experience/$', views.harassment_experience, name='harassment_experience'),
    url(r'^remediation_assessment/$', views.remediation_assessment, name='remediation_assessment'),
    url(r'^social_media_usage/$', views.social_media_usage, name='social_media_usage'),
    url(r'^(?P<race_id>[0-9]+)/$', views.detail, name='detail'),
    url(r'^admin/', admin.site.urls),
]
