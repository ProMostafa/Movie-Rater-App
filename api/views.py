from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets ,status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated ,AllowAny
from .models import Movie , Rating
from .serializers import MovieSerializer , RatingSerializer ,UserSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class=MovieSerializer
    authentication_classes=(TokenAuthentication,)
    permission_classes=(IsAuthenticated,)


# very Important Hint: Must Well Understand this method
    @action(detail=True , methods=['POST'])
    def rate_movie(self,request,pk=None):
        # do logic code
        if 'stars' in request.data:

            movie = Movie.objects.get(id=pk)
            stars=request.data['stars']
            user=request.user
            print("user",user)

            try:
                rating=Rating.objects.get(user=user.id , movie=movie.id)
                rating.stars=stars
                rating.save()
                serializer=RatingSerializer(rating,many=False)
                response={'message':'Rating Updated','result':serializer.data}
                return Response(response,status=status.HTTP_200_OK)

            except:
                rating=Rating.objects.create(user=user,movie=movie,stars=stars)
                serializer=RatingSerializer(rating,many=False)
                response={'message':'Rating Create','result':serializer.data}
                return Response(response,status=status.HTTP_200_OK)

        else:
            response={'message':'You Need to provide stars'}
            return Response(response,status=status.HTTP_400_BAD_REQUEST)
            

class RatingViewSet(viewsets.ModelViewSet):
    queryset=Rating.objects.all()
    serializer_class=RatingSerializer
    authentication_classes=(TokenAuthentication,)
    permission_classes=(IsAuthenticated,)


# Very Important Hint:
# Because viewsets opening all method action post , put , delete , get , putch
# if you want to change this method , Must override it to disable its action 

    # disable delete method from viewset
    def delete(self,request,*args,**kwargs):
        response={'message':'You Cant Delete Rating Like That !'}
        return Response(response,status=status.HTTP_400_BAD_REQUEST)
    #disable create method from viewset
    def create(self,request,*args,**kwargs):
        response={'message':'You Cant Create Rating Like That !'}
        return Response(response,status=status.HTTP_400_BAD_REQUEST)
    #disable update rating
    def update(self,request,*args,**kwargs):
        response={'message':'You Cant Update Rating Like That !'}
        return Response(response,status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=(AllowAny,)

