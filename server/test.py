import requests
print('Testing this URL : http://localhost:8000/api/login' )

myobj = {'email': 'meet@gmail.com', 'password' : '1234'}

x = requests.post('http://localhost:8000/api/login', json=myobj)
assert 200 == x.status_code
print('Response Status : '  + str(x.status_code))


myobj = {'email': 'meet@gmail.com', 'password' : '123456'}
x = requests.post('http://localhost:8000/api/login', json=myobj)
assert "404" == x.json()["status"]
print('Response Status : '  + x.json()["status"])


print('Testing this URL : http://localhost:8000/api/allUserList' )

x = requests.get('http://localhost:8000/api/allUserList')
assert 200 == x.status_code
print('Response Status : '  + str(x.status_code))


