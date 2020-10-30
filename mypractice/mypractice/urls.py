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
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cards/<int:courseid>/<str:skills>', views.CardList.as_view()),
    path('cards/cardprogress/<int:courseid>/<str:skills>/<int:userid>', views.get_cards_with_progress),
    path('user/<str:name>/<str:username>/<str:password>/', views.get_user_login),
    path('courses/', views.CourseList.as_view()),
    path('skills/', views.SkillList.as_view()),
]
