from django.http import HttpResponse

def index(request):
    return HttpResponse('hello world')

def detail(request, race_id):
    return HttpResponse('you are looking at id {}'.format(race_id))

def foo(request):
    return HttpResponse('foo')