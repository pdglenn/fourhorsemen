from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    # url(r'^fourhorsemen/', include('fourhorsemen.urls')),
    url(r'^admin/', admin.site.urls),
    # url(r'^foo/', include('fourhorsemen.urls')),
]