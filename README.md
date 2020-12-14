Presentation link : 
https://drive.google.com/file/d/1KOyLKrnIdmiFTQLFIogz4O3KDV7Uw7Ym/view

# Team Backend, Doc - API

- .GET --> home page
```js
"https://peaceful-gorge-77974.herokuapp.com"

req.body: -

res:
200:  {
         "message": "This is home page of funD"
      }

500:  {error}
```
---------------------------------
- When access_token expired !!

```js
400:  {
         "name": "TokenExpiredError",
         "message": "jwt expired",
         "expiredAt": "2020-10-30T19:23:08.000Z"
      }

note >>> access_token will be expired after 1hr no activity! and you need to login again.
```
---------------------------------

## ===== USER =====

- .POST --> login
```js
"https://peaceful-gorge-77974.herokuapp.com/users/login"

req.body:
{
   "email": "najibullah89@gmail.com",
   "password": "abc"
}

res:
200:  {
         "status": "Success",
         "user": {
            "id": 1,
            "name": "najib",
            "email": "najibullah89@gmail.com",
            "password": "$2b$05$SUhshErMj2p9a3fER6cmV.TKm8uenpeRGkDIPiFtIIifVseAjhO/S",
            "photo": "https://res.cloudinary.com/seb99/image/upload/v1603486652/dl5oilbhkt35wpvdkk0e.jpg",
            "dateOfBirth": "1995-01-11",
            "createdAt": "2020-10-15T21:16:46.618Z",
            "updatedAt": "2020-10-23T20:57:33.088Z"
         },
         "access_token": <token>
      }

400:  {
         "status": "false",
         "msg": "Invalid request"
      }

401:  {
         "status": "false",
         "msg": "Email is required"
      },
      {
         "status": "false",
         "msg": "Invalid email format"
      },
      {
         "status": "false",
         "msg": "Password is required"
      },
      {
         "status": "false",
         "msg": "Wrong password"
      },
      {
         "status": "false",
         "msg": "User not found"
      }

500:  {error}
```

- .POST --> register
```js
"https://peaceful-gorge-77974.herokuapp.com/users/register"

req.body:
{
   "name": "najib",
   "email": "najibullah89@gmail.com",
   "password": "abc",
   "password2": "abc"   ==> confirm password
   "dateOfBirth": "1995-01-11"
}

res:
201:  {
         "status": "Success",
         "user": {
            "id": 1,
            "name": "najib",
            "email": "najibullah89@gmail.com",
            "password": "$2b$05$SUhshErMj2p9a3fER6cmV.TKm8uenpeRGkDIPiFtIIifVseAjhO/S",
            "photo": "https://res.cloudinary.com/seb99/image/upload/v1603486652/dl5oilbhkt35wpvdkk0e.jpg",
            "dateOfBirth": "1995-01-11",
            "createdAt": "2020-10-15T21:16:46.618Z",
            "updatedAt": "2020-10-23T20:57:33.088Z"
         },
         "access_token": <token>
      }
400:  {
         "status": "false",
         "msg": "Invalid request"
      }

409:  {
         "status": "false",
         "msg": "Email is already registered"
      }

500:  {
         "status": "false",
         "msg": "Please input your email"
      },
      {
         "status": "false",
         "msg": "Please input your name"
      },
      {
         "status": "false",
         "msg": "Password is not the same"
      },
      {
         "status": "false",
         "msg": "Invalid email format"
      },
      {
         "status": "false",
         "msg": "Name/email/password is required"
      },
      {
         "status": "false",
         "msg": "Please input your password"
      }
```

- .GET --> profile user
```js
"https://peaceful-gorge-77974.herokuapp.com/users/profile"

req.header: 
{
   "access_token": <token>
} 

req.body: -

res:
200:  {
         "id": 1,
         "name": "najib",
         "email": "najibullah89@gmail.com",
         "password": "$2b$05$SUhshErMj2p9a3fER6cmV.TKm8uenpeRGkDIPiFtIIifVseAjhO/S",
         "photo": "https://res.cloudinary.com/seb99/image/upload/v1603486652/dl5oilbhkt35wpvdkk0e.jpg",
         "dateOfBirth": "1995-01-11",
         "createdAt": "2020-10-15T21:16:46.618Z",
         "updatedAt": "2020-10-23T20:57:33.088Z"
      }
500:  {error}
```

- .PUT --> edit profile user
```js
"https://peaceful-gorge-77974.herokuapp.com/users/editprofile"

req.header: 
{
   "access_token": <token>
} 

req.body:
{
   "name": "najib",
   "dateOfBirth": "1995-01-11"
}

res:
200:  {
         "Profile updated!"
      }
500:  {error}
```

- .PUT --> edit photo user
```js
https://peaceful-gorge-77974.herokuapp.com/users/editphoto

req.header: 
{
   "access_token": <token>
} 

req.body:
{
   "photo": <upload_photo>
}

res:
200:  {
         "Profile updated!"
      }
500:  {error}

note >>> photo user dibuat endpoint sendiri agar tidak re-upload ke cloudinary
```

- .PUT --> change password
```js
"https://peaceful-gorge-77974.herokuapp.com/users/changepassword"

req.header: 
{
   "access_token": <token>
}

req.body:
{
   "password": "abc",
   "password2": "abc"   ==> confirm password
}

res:
200:  {
         "Password changed!"
      }
500:  {error}
```

- .DELETE --> delete user
```js
"https://peaceful-gorge-77974.herokuapp.com/users/delete"

req.header: 
{
   "access_token": <token>
}

req.body: -

res:
200:  {
         "Account Deleted!"
      }
500:  {error}
```

- .POST --> forgot password user
```js
"https://peaceful-gorge-77974.herokuapp.com/users/forgotpassword"

req.body: 
{
   "email": "najibullah89@gmail.com"
}

res:
200:  {
         "Already Sent to Email!"
      }
404:  {
         "Email not found"
      }      
500:  {error}

++ check email inbox
++ klik link at email
++ you will get another API endpoint (reset password from email) to change your password
```

- .PUT --> reset password from email
```js
"https://peaceful-gorge-77974.herokuapp.com/users/resetpassword/:id"

req.body:
{
   "password": "abc",
   "password2": "abc"   ==> confirm password
}

res:
200:  {
         "Password changed!"
      }
500:  {error}

note >>> pada ":id" akan langsung tertera id user 
```
---------------------------------

## ===== BUDGET =====

- .GET --> budget
```js
"https://peaceful-gorge-77974.herokuapp.com/budget"

req.header: 
{
   "access_token": <token>
}

req.body: -

res:
200:  [
         {
            "id": 1,
            "set_budget": 70000000,
            "limit_date": "2020-11-01",
            "UserId": 1,
            "createdAt": "2020-10-23T16:16:43.900Z",
            "updatedAt": "2020-10-23T16:18:15.131Z"
         }
      ]
500:  {error}
```

- .POST --> add budget
```js
"https://peaceful-gorge-77974.herokuapp.com/budget/add"

req.header: 
{
   "access_token": <token>
}

req.body: 
{
   "set_budget": 30000000, 
   "limit_date": "2020-12-01"
}

res:
200:  [
         {
            "id": 1,
            "set_budget": 70000000,
            "limit_date": "2020-11-01",
            "UserId": 1,
            "createdAt": "2020-10-23T16:16:43.900Z",
            "updatedAt": "2020-10-23T16:18:15.131Z"
         }
      ]
500:  {error}

note >>> user hanya bisa memiliki satu budget
```

- .PUT --> edit budget
```js
"https://peaceful-gorge-77974.herokuapp.com/budget/edit/:id"

req.params:
   Path Variables:
      {
         "id": 1
      }

req.header: 
{
   "access_token": <token>
}

req.body:
{
   "set_budget": 90000000, 
   "limit_date": "2020-12-01"
}

res:
200:  {
         "msg": "Budget Updated!"
      }
500:  {error}

note >>> bisa juga dibuat "https://peaceful-gorge-77974.herokuapp.com/budget/edit/1  (dimana /:id langsung dimasukan id budget)
```

- .DELETE --> delete budget
```js
"https://peaceful-gorge-77974.herokuapp.com/budget/delete/:id"

req.params:
   Path Variables:
      {
         "id": 1
      }

req.header: 
{
   "access_token": <token>
}

req.body: -

res:
200:  1  ===> jika '0' artinya tidak ada yang ter-delete
500:  {error}

note >>> bisa juga dibuat "https://peaceful-gorge-77974.herokuapp.com/budget/delete/1  (dimana /:id langsung dimasukan id budget)
```
---------------------------------

## ===== EXPENSES =====

- .GET --> user's expense
```js
"https://peaceful-gorge-77974.herokuapp.com/expenses"

req.header: 
{
   "access_token": <token>
}

req.body: -

res:
200:  [
         {
            "id": 1,
            "title": "Beli Batagor",
            "cost": 15000,
            "repeat": null,
            "start_date": null,
            "limit_date": null,
            "UserId": 1,
            "createdAt": "2020-10-30",
            "updatedAt": "2020-10-30",
            "User": {
                  "id": 1,
                  "name": "najib",
                  "email": "najibullah89@gmail.com",
                  "password": "$2b$05$Jl3qumDtPGPbPjHJd4MDFOrHcUrs0K.earS.3tnd6Msp.IFSRzXne",
                  "photo": "https://res.cloudinary.com/seb99/image/upload/v1604082466/hhjnhvaywzyqvgv50f4b.jpg",
                  "dateOfBirth": "1989-10-13",
                  "createdAt": "2020-10-30T18:23:08.953Z",
                  "updatedAt": "2020-10-30T18:30:33.926Z"
            }
         },
         {
            "id": 2,
            "title": "Bayar kos",
            "cost": 1000000,
            "repeat": "MONTHLY",
            "start_date": "2020-10-15",
            "limit_date": "2021-10-30",
            "UserId": 1,
            "createdAt": "2020-10-30",
            "updatedAt": "2020-10-30",
            "User": {
                  "id": 1,
                  "name": "najib",
                  "email": "najibullah89@gmail.com",
                  "password": "$2b$05$Jl3qumDtPGPbPjHJd4MDFOrHcUrs0K.earS.3tnd6Msp.IFSRzXne",
                  "photo": "https://res.cloudinary.com/seb99/image/upload/v1604082466/hhjnhvaywzyqvgv50f4b.jpg",
                  "dateOfBirth": "1989-10-13",
                  "createdAt": "2020-10-30T18:23:08.953Z",
                  "updatedAt": "2020-10-30T18:30:33.926Z"
            }
         }
      ]

500:  {error}
```

- .POST --> add expense
```js
"https://peaceful-gorge-77974.herokuapp.com/expenses/add"

req.header: 
{
   "access_token": <token>
}

req.body:
{
   "title": "Bayar Spotify",
   "cost": 50000,
   "repeat": "MONTHLY",
   "start_date": "2020-10-23",
   "limit_date": "2021-10-30",
}

res:
200:  {
         "add": {
            "id": 1,
            "title": "Bayar Spotify",
            "cost": 50000,
            "repeat": "MONTHLY",
            "start_date": "2020-10-23",
            "limit_date": "2021-10-23",
            "UserId": 1,
            "updatedAt": "2020-10-24",
            "createdAt": "2020-10-24"
         },
         "recDates": [
            "2020-10-23",
            "2020-11-23",
            "2020-12-23",
            "2021-01-23",
            "2021-02-23",
            "2021-03-23",
            "2021-04-23",
            "2021-05-23",
            "2021-06-23",
            "2021-07-23",
            "2021-08-23",
            "2021-09-23",
            "2021-10-23"
         ]
      }
500:  {error}
```

- .PUT --> update expense
```js
"https://peaceful-gorge-77974.herokuapp.com/expenses/edit/:id"

req.params:
   Path Variables:
      {
         "id": 1
      }

req.header: 
{
   "access_token": <token>
}

req.body:
{
   "repeat": "MONTHLY"  ===> sebelumnya "Weekly"
}

res:
200:  {
         "msg": "Expense Updated!",
         "update": [
            1
         ]
      }
500:  {error}

note >>> bisa juga dibuat "https://peaceful-gorge-77974.herokuapp.com/expenses/edit/1"  (dimana /:id langsung dimasukan id expense)

note >>> untuk melihat perubahan, kunjungi .GET <user's expense>
```

- .DELETE --> delete expense
```js
"https://peaceful-gorge-77974.herokuapp.com/expenses/delete/:id"

req.params:
   Path Variables:
      {
         "id": 1
      }

req.header: 
{
   "access_token": <token>
}

req.body: -

res:
200:  1  ===> jika '0' artinya tidak ada yang ter-delete
500:  {error}

note >>> bisa juga dibuat "https://peaceful-gorge-77974.herokuapp.com/expenses/delete/1"  (dimana /:id langsung dimasukan id expense)
```

- .GET --> total expense (daily in a month)
```js
"https://peaceful-gorge-77974.herokuapp.com/expenses/totalmonthly"

req.header: 
{
   "access_token": <token>
}

req.body: 
{
   "month": 10,   ===> contoh di ambil bulan 10
   "year": 2020   ===> contoh di ambil tahun 2020
}

res:
200:  {
         "data": [
            {
                  "createdAt": "2020-10-30",    ===> jika terakhir diinput adalah pada tgl 30
                  "total": "1465000"   ===> total expense dalam 1 hari (tgl 30)
            }
         ],
         "totalExpenses": [
            {
                  "totalExpense": "1465000"  ===> total expense selama bulan 10
            }
         ]
      }

400:  {
         "status": "false",
         "msg": "Please input a valid month/year"
      }

500:  {error}
```
- .GET --> total expense (monthly in a year)
```js
"https://peaceful-gorge-77974.herokuapp.com/expenses/totalyearly"

req.header:
{
   "access_token": <token>
}

req.body: 
{
   "year": 2020 ===> contoh di ambil tahun 2020 (Jan-Des)
}

res:
200:  {
         "monthlyExpenses": [
            {
                  "month_created": 11, ---> November
                  "totalExpense": "992000"
            }
         ]
      }

400:  {
         "status": "false",
         "msg": "Please input a valid year"
      }

500:  {error}
```

- .GET --> total expense by budget (based on budget amount and duration)
```js
"https://peaceful-gorge-77974.herokuapp.com/expenses/totalbybudget"

req.header:
{
   "access_token": <token>
}

req.body: 
-

res:
200:  {
         "budgetAmount": 8000000,
         "total": 992000, -- total expenses selama durasi budget
         "percentageUsage": "12.40", --persentasi penggunaan budget
         "msg": "You use 12.40% of your budget, and you still have 7008000 left in budget."
      }

500:  {error}
```

- .GET --> calendar expenses
```js
"https://peaceful-gorge-77974.herokuapp.com/calendar"

req.header: 
{
   "access_token": <token>
}

req.body: 
{
   "month": 10,   ===> contoh di ambil bulan 10
   "year": 2020
}

res:
200:  {
         "data": [
            {
                  "createdAt": "2020-10-30",    ===> jika terakhir diinput adalah pada tgl 30
                  "total": "1465000"   ===> total expense dalam 1 hari (tgl 30)
            }
         ],
         "totalExpenses": [
            {
                  "totalExpense": "1465000"  ===> total expense selama bulan 10
            }
         ]
      }

500:  {error}
```

- .GET --> calendar expenses
```js
"https://peaceful-gorge-77974.herokuapp.com/calendar"

req.header: 
{
   "access_token": <token>
}

req.body: -

res:
200:  [
         {
            "title": "HBO",
            "cost": 50000,
            "repeat": "MONTHLY",
            "payment_schedule": [
                  "2020-10-23",
                  "2020-11-23",
                  "2020-12-23",
                  "2021-01-23",
                  "2021-02-23",
                  "2021-03-23",
                  "2021-04-23",
                  "2021-05-23",
                  "2021-06-23",
                  "2021-07-23",
                  "2021-08-23",
                  "2021-09-23",
                  "2021-10-23"
            ]
         },
         {
            "title": "Sampoerna",
            "cost": 30000,
            "repeat": "DAILY",
            "payment_schedule": [
                  "2020-10-23",
                  "2020-10-24",
                  "2020-10-25",
                  "2020-10-26",
                  "2020-10-27",
                  "2020-10-28",
                  "2020-10-29",
                  "2020-10-30"
            ]
         }
      ]
500:  {error}
```
---------------------------------

## ===== PRODUCT =====

- .GET --> ALL PRODUCT 
```js
"https://peaceful-gorge-77974.herokuapp.com/product/all"

req.header: -
req.body: -

res:
200:
[
    {
        "name": "Spotify",
        "icon": "https://www.logo.wine/a/logo/Spotify/Spotify-Icon-White-Dark-Background-Logo.wine.svg",
        "backdrop": "https://www.logo.wine/a/logo/Spotify/Spotify-White-Dark-Background-Logo.wine.svg",
        "details": "Spotify is a digital music, podcast, and video streaming service that gives you access to millions of songs and other content from artists all over the world. Basic functions such as playing music are totally free, but you can also choose to upgrade to Spotify Premium."
    },
    {
        "name": "Netflix",
        "icon": "https://www.logo.wine/a/logo/Netflix/Netflix-Logo.wine.svg",
        "backdrop": "https://media.idownloadblog.com/wp-content/uploads/2018/01/Netflix-Logo.png",
        "details": "Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more."
    },
    {
        "name": "Disney+",
        "icon": "https://www.logo.wine/a/logo/Disney%2B/Disney%2B-Logo.wine.svg",
        "backdrop": "https://awesomemovies.org/wp-content/uploads/2019/09/disney-featured.jpg",
        "details": "Disney+ is the exclusive home for your favorite movies and TV shows from Disney, Pixar, Marvel, Star Wars, and National Geographic."
    },
    {
        "name": "HBO max",
        "icon": "https://www.logo.wine/a/logo/HBO_Max/HBO_Max-Logo.wine.svg",
        "backdrop": "https://cdn.arstechnica.net/wp-content/uploads/2019/10/hbo-logo.png",
        "details": "Say hello to HBO Max, the streaming platform that bundles all of HBO together with even more of your favorite movies and TV series, plus new Max Originals."
    }
]

500: {error}
```

.GET --> EACH PRODUCT
```js
"https://peaceful-gorge-77974.herokuapp.com/product/:id"

req.header: 
{
   "access_token": <token>
}

req.body: -

res:
200:
{
    "name": "Spotify",
    "icon": "https://www.logo.wine/a/logo/Spotify/Spotify-Icon-White-Dark-Background-Logo.wine.svg",
    "backdrop": "https://www.logo.wine/a/logo/Spotify/Spotify-White-Dark-Background-Logo.wine.svg",
    "details": "Spotify is a digital music, podcast, and video streaming service that gives you access to millions of songs and other content from artists all over the world. Basic functions such as playing music are totally free, but you can also choose to upgrade to Spotify Premium.",
    "ProductServices": [
        {
            "id": 1,
            "service_type": "Spotify Individual",
            "cost": 49990
        },
        {
            "id": 2,
            "service_type": "Spotify Family",
            "cost": 79990
        },
        {
            "id": 3,
            "service_type": "Spotify Student",
            "cost": 29990
        }
    ]
}

404:
{
    "msg": "Your product is not found!"
}

500: {error}
```
.POST --> Product and Product Service
```js
"https://peaceful-gorge-77974.herokuapp.com/product/:ProductsId/:ProductServiceId"

req.header:
{
	"access_token": <token>
}

req.body: -
res:
201:
{
    "subscribe": {
        "id": 1,
        "start_date": "2020-11-13",
        "UserId": 4,
        "ProductServicesId": 1,
        "updatedAt": "2020-11-13",
        "createdAt": "2020-11-13"
    },
    "expense": {
        "id": 1,
        "title": "Spotify Individual",
        "cost": 49990,
        "repeat": "MONTHLY",
        "start_date": "2020-11-13",
        "limit_date": "2020-12-13",
        "month_created": 11,
        "UserId": 4,
        "updatedAt": "2020-11-13",
        "createdAt": "2020-11-13"
    }
}

400:
{ 
   "msg": "Your balance is not enough, please top up your wallet" 
}

500: {error}
```
## ===== WALLET =====

- .GET --> CHECK WALLET BALANCE 
```js
"https://peaceful-gorge-77974.herokuapp.com/wallet/"

req.header:
{
	"access_token": <token>
}

req.body: -

res:
200:
      {
         "id": 3,
         "balance": "10000000",
         "UserId": 3,
         "createdAt": "2020-11-15",
         "updatedAt": "2020-11-15"
      }


500: {error}
```
