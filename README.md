# Revivify

Revivify is a "social cataloging" website that allows individuals to freely search the database of books in Google Books using Google Books API. Users can sign up and register books to generate library catalogs and reading lists.
This project uses PHP, Javascript, HTML, CSS and AJAX requests.

## Features 

* App with secure login and sign up options. Each user has their own calendar and appointments.
* Users can add a book to their library/bookshelf, mark it as favorite, like the book, mark a book as ‘Want To Read’, ‘Currently Reading’ or ‘Finished Reading’.
* A user’s profile page have the following - user’s favorite books, books liked, books in
the user’s bookshelves, books that the user is currently reading and the activity of the
user.
* A search bar is provided in the home/profile page where the user can search books by Title,
Author, Publisher, ISBN or subject.
* Sign up process with real time indication of usernames availability and a Captcha.

----

**Framework used : PHP on Apache**  
**Database 	 : MySQL**  
**Server	 : Apache** 

----

**Connections to database**
* Enter your username and password of mySQL database in connect.php
```html
define ('DB_USER','Your-Username');
```
```html
define ('DB_PASSWORD','Your-Password');
```
replace the string "Your-Username" and "Your-Password" with your own username and password of mySQL database.

----

**Captcha System**

* The signup/register page uses Google reCaptcha to prevent bot users.
* Go to [this link](https://www.google.com/recaptcha/intro/index.html). Click on *get reCaptcha* button in top right corner.
* Sign in through your Gmail account.(If you are already signed up, then ignore this step).
* In the *Register a new site* box, type in a label(say localhost) and your domain name(say localhost). 
* Click on *Register*.
* You will get two keys, a public key and a private key.
* Copy the private key. Create config.php, in that add the variable privateKey 
```html
$privateKey = "Your-private-key";
```
replace the string "Your-private-key" with your own secret/private key.
* Copy the public key. Open register.php. You will see a line 
```html
<div class="g-recaptcha" data-sitekey="Your-public-key"></div>
```
Paste this public key in the 'data-sitekey' attribute,replacing "Your-public-key".

----

#### How to run :

* Clone/download this repository.
* Copy the folder Revivify to your localhost directory.
* Start your XAMPP/WAMP or any apache distribution software.
* Start your apache server and mySQL modules.
* Open up your browser. Type http://localhost/scheduler/ as the URL.
* Click on *welcome.html*

----

## Built With

* [PHP](http://php.net/)
* [Vanilla JS](http://vanilla-js.com/)
* [AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX)
* [HTML](https://www.w3.org/html/)
* [CSS](https://www.w3.org/Style/CSS/)
* [reCaptcha API](https://www.google.com/recaptcha/)