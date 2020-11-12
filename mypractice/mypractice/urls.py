"""mypractice URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cards/cardprogress/<str:courseid>/<str:skills>', views.CardList.as_view()),
    path('courses/', views.CourseList.as_view()),
    path('skills/<str:courseid>', views.SkillList.as_view()),
    path('cardprogress/<str:cardid>', views.complete_card),
    path('cardprogress/favorite/<str:cardid>', views.favorite_card),
    path('rest-auth/', include('rest_auth.urls')),
    path('register/<str:username>', views.create_user)
    #path('rest-auth/registration/', include('rest_auth.registration.urls'))
]
