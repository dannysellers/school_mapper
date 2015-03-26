from django.conf.urls import patterns, url


# Views
urlpatterns = patterns('mapper.views',
    url(r'^$', 'home', name='index'),
    url(r'^school/(?P<id>\d+)$', 'school_detail', name='school_detail'),
    url(r'^getschools/', 'get_schools', name='get_schools'),
)