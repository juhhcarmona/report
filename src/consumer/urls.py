from django.conf.urls import include, url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^request/', views.send_request, name='request'),
    url(r'^more/', views.load_more_data, name='more'),
]