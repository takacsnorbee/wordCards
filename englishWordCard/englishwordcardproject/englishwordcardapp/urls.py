from django.urls.resolvers import URLPattern
from . import views
from django.urls import path

urlpatterns = [
    # ROUTES
    path('', views.home, name='home'),
    path('login/', views.login_user, name='login_user'),
    path('signup/', views.signup_user, name='signup_user'),
    path('logout/', views.logout_user, name='logout_user'),
    path('app/', views.app_content, name='app_content'),
    # REST
    # path('vegrehajt/', views.vegrehajt, name='vegrehajt'),
    path('getCommonList/', views.get_common_list, name='get_common_list'),
    path('getHomeContent/', views.get_home_content, name='get_home_content'),
]