from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Word, List_of_word


def home(request):
    return render(request, 'app/home.html')


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


#def vegrehajt(request):
#     this_list = List_of_word.objects.get(list_name='basic_list')
#     Word.objects.all().delete()
#     with open('szavakteszttxt.txt', encoding='utf8') as f:
#         for line in f:
#             splitted_line = line.split('@')
#             new_word = Word(word_away=splitted_line[0].strip(), word_home=splitted_line[1].strip(), list_of_word_id=this_list)
#             new_word.save()
#             print(new_word, new_word.word_away, new_word.word_home)
#
#     return redirect('home')

