from cgitb import reset
from urllib import response
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Ratings, Word, List_of_word, Home_content
import json


def home(request):
    if request.user.is_authenticated:
        return redirect('app_content')
    return render(request, 'app/home.html', {'home_site': True})


def app_content(request):
    return render(request, 'app/content.html')


def login_user(request):
    if request.method == 'GET':
        return render(request, 'app/login.html')
    else:
        user = authenticate(request, username = request.POST['username'], password = request.POST['password'])
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            return render(request, 'app/login.html', {'error': 'Wrong username or password!'})


def signup_user(request):
    if request.method == 'GET':
        return render(request, 'app/signup.html')
    else:
        # validate inputs
        SpecialSym =['$', '@', '#', '%']
        user_password = request.POST['password1']
        user_username = request.POST['username']
        validation_error_password = 'Password should be at least 3 and maximum 20 character. The password should have at least one numeral letter, \
            one uppercase letter, one lowercase letter and one symbol ( $ @ # % )'
        validation_error_username = 'Username should be at least 3 and maximum 20 character'

        if (len(user_password) < 3 or len(user_password) > 20 or not any(char.isdigit() for char in user_password) or 
            not any(char.isupper() for char in user_password) or not any(char.islower() for char in user_password) or 
            not any(char in SpecialSym for char in user_password)):
            return render(request, 'app/signup.html', {'error': validation_error_password})

        if len(user_username) < 3 or len(user_username) > 20:
            return render(request, 'app/signup.html', {'error': validation_error_username})
        
        try:
            # check if username exists
            check_user = User.objects.get(username=request.POST['username'])
            return render(request, 'app/signup.html', {'error': f'Username ({check_user}) already taken.'})
        except User.DoesNotExist:
            # check passwords if match
            if request.POST['password1'] == request.POST['password2']:
                try:
                    # user = User.objects.create_user(username=request.POST['username'], password=request.POST['password1'])
                    user = User.objects.create_user(username=user_username, password=user_password)
                    user.save()
                    login(request, user)
                    return redirect('home')
                except:
                    return render(request, 'app/signup.html', {'error': 'Something went wrong. Please try it again.'})
            else:
                return render(request, 'app/signup.html', {'error': "Password's don't match"})


def logout_user(request):
    logout(request)
    return redirect('home')


def get_ratings(request):
    sum_of_ratings = 0
    temp_ratings = list(Ratings.objects.all())
    num_of_ratings = len(temp_ratings)
    for i in temp_ratings:
        sum_of_ratings += i.rating

    ratings = sum_of_ratings / num_of_ratings
    try:
        User.objects.get(username=request.user)
        user_id = request.user.id
        user_rated = list(Ratings.objects.filter(user_id=user_id).values('rating'))
        if len(user_rated) == 0:
            return JsonResponse({'ratings': ratings, 'numOfRatings': num_of_ratings, 'rated': False})
        else:
            return JsonResponse({'ratings': ratings, 'numOfRatings': num_of_ratings, 'rated': True})
    except:
        return JsonResponse({'ratings': ratings, 'numOfRatings': num_of_ratings, 'rated': False})


def set_ratings(request):
    posted_rating = json.loads(request.body.decode('utf-8'))
    user_id = request.user.id
    temp_user = User.objects.get(id=user_id)
    temp_rating = Ratings.objects.create(rating=posted_rating['rating'], user_id=temp_user)
    temp_rating.save()
    
    sum_of_ratings = 0
    temp_ratings = list(Ratings.objects.all())
    num_of_ratings = len(temp_ratings)
    for i in temp_ratings:
        sum_of_ratings += i.rating

    ratings = sum_of_ratings / num_of_ratings
    return JsonResponse({'ratings': ratings, 'numOfRatings': num_of_ratings, 'rated': True})


def get_words(request):
    try:
        User.objects.get(username=request.user)
        user_id = request.user.id
        temp_lists = list(List_of_word.objects.filter(user_id=user_id))
        all_words = []
        for temp_list in temp_lists:
            temp_words = list(Word.objects.filter(list_of_word_id=temp_list.id).values('word_away', 'word_home', 'sentence_away', 'sentence_home', 'word_description', 'learnt', 'synonyms', 'list_of_word_id', 'id'))
            for word in temp_words:
                all_words.append(word)
        return JsonResponse({'words_result': all_words})
    except:
        temp_list = List_of_word.objects.get(list_name='basic_list')
        temp_words = list(Word.objects.filter(list_of_word_id=temp_list.id).values('word_away', 'word_home', 'sentence_away', 'sentence_home', 'word_description', 'learnt', 'synonyms', 'list_of_word_id', 'id'))
        return JsonResponse({'words_result': temp_words})


def get_lists(request):
    try:
        User.objects.get(username=request.user)
        temp_user_id = request.user.id
        temp_list = list(List_of_word.objects.filter(user_id=temp_user_id).values('list_name', 'list_description', 'id', 'creation_time'))
        return JsonResponse({'lists_result': temp_list, 'is_loged_in': True})
    except:
        temp_list = list(List_of_word.objects.filter(list_name='basic_list').values('list_name', 'list_description', 'id', 'creation_time'))
        return JsonResponse({'lists_result': temp_list, 'is_loged_in': False})


def add_new_list(request):
    try:
        user_id = request.user.id
        temp_user = User.objects.get(id=user_id)
        posted_list = json.loads(request.body.decode('utf-8'))
        temp_list = List_of_word.objects.create(list_name=posted_list['list_name'], list_description=posted_list['list_description'], user_id=temp_user)
        temp_list.save()
        temp_list = list(List_of_word.objects.filter(user_id=user_id).values('list_name', 'list_description', 'id', 'creation_time'))
        return JsonResponse({'lists_result': temp_list, 'is_loged_in': True})
    except:
        return redirect('home')


def get_home_content(request):
    temp_content = list(Home_content.objects.all().values('title_eng', 'title_hun', 'text_eng', 'text_hun', 'img_src'))
    return JsonResponse({'home_content': temp_content})


def delete_word(request):
    try:
        user_id = request.user.id
        temp_user = User.objects.get(id=user_id)
        word_id = json.loads(request.body.decode('utf-8'))['word_id']
        list_id = json.loads(request.body.decode('utf-8'))['list_id']
        Word.objects.filter(list_of_word_id=list_id, id=word_id).delete()
        return redirect('get_words')
    except:
        return redirect('home')


# This function was used to upload the basic words to database

# def vegrehajt(request):
#     this_list = List_of_word.objects.get(list_name='basic_list')
#     Word.objects.all().delete()
#     with open('szavakteszttxt.txt', encoding='utf8') as f:
#         for line in f:
#             splitted_line = line.split('@')
#             new_word = Word(word_away=splitted_line[0].strip(), word_home=splitted_line[1].strip(), list_of_word_id=this_list)
#             new_word.save()
#             print(new_word, new_word.word_away, new_word.word_home)
#     return redirect('home')

