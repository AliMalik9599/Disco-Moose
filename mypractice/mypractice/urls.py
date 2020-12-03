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
from app.views import index

# URLs that the app uses as API endpoints to communicate between
# the server and the client-side
urlpatterns = [
    # Root page
    path('', index, name='index'),
    # Present list of cards
    path('cards/cardprogress/<str:courseid>/<str:skills>/<str:time>', views.CardList.as_view()),
    # Refresh list of cards after completed
    path('cards/refresh/<str:courseid>/<str:skills>/<str:time>', views.RefreshCardList.as_view()),
    # Present list of courses
    path('courses/', views.CourseList.as_view()),
    # Present list of skills
    path('skills/<str:courseid>', views.SkillList.as_view()),
    # Toggle card completion
    path('cardprogress/<str:cardid>', views.complete_card),
    # Toggle card favoriting
    path('cardprogress/favorite/<str:cardid>', views.favorite_card),
    # Login authentication
    path('rest-auth/', include('rest_auth.urls')),
    # User sign up
    path('register/<str:username>', views.create_user),
]
