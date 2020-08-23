from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxLengthValidator,MinLengthValidator

# Create your models here.

class Movie(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=360)

    def no_of_rating(self):
        rating=Rating.objects.filter(movie=self)
        return len(rating)

    def avg_rating(self):
        sum=0
        ratings=Rating.objects.filter(movie=self)
        for rating in ratings:
            sum+=rating.stars
        if(len(ratings)>0):
            return sum/len(ratings)
        else:
            return 0

    def __str__(self):
        return "Movie Name: {}".format(self.title)



class Rating(models.Model):
    movie = models.ForeignKey(Movie,on_delete=models.CASCADE)
    user = models.ForeignKey(User ,on_delete=models.CASCADE)
    #stars = models.IntegerField(validators=[MinLengthValidator(1),MaxLengthValidator(5)])
    stars = models.IntegerField()

    class Meta:
        # because the relation is one to many , user can may more rating on the same movie 
        # this is not allow for the same movie for this make user , movie are unique paired not repeat this paired
        #
        unique_together = (('user' , 'movie' ),)
        # when ordering data
        index_together = (('user','movie'),)

    def __str__(self):
        return "Movie: {} , Rating by: {} ,stars: {}".format(self.movie.title , self.user.username , self.stars)
