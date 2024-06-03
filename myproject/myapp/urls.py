# myapp/urls.py
from django.urls import path
from .views import GetBlog, CreateBlog, DeleteBlog, EditBlog

urlpatterns = [
    path('blogs/', GetBlog.as_view(), name='get_blog'),
    path('blogs/create/', CreateBlog.as_view(), name='create_blog'),
    path('blogs/<int:pk>/', DeleteBlog.as_view(), name='delete_blog'),
    path('blogs/<int:pk>/edit/', EditBlog.as_view(), name='edit_blog'),
]
