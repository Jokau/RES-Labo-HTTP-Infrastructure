# RES Labo HTTP Infrastructure

Kaufmann Joel, Schürch Loïc

## Step 1: Static HTTP server with apache httpd

The first step is under the branch *fb-apache-static*

Run the apache-php server:
* Go to the location of the Dockerfile: docker-images/apache-php-image
* Build the image: `docker build -t res/apache_php .`
* Run the container: map the port you want to use:
  * `docker run -p YOUR_PORT:80 res/apache_php`
  * or as a deamon: `docker run -d -p PORT:80 res/apache_php`

You can run multiple instance of the server, you simply need to map different ports for each instance.

Open your favorite browser and go to `192.168.99.100:YOU_PORT`

## Step 2: Dynamic HTTP server with express.js

The second step is under the branch *fb-express-dynamic*

* Install the modules chance and express:
  * Go to docker-images/express-image/src
  * run `npm install --save express chance`
* Go to the location of the Dockerfile: docker-images/express-image
* Build the image: `docker build -t res/express_states .`
* Run the container, using the port you want: `docker run -p PORT:3000 res/express_states`

Open your favorite browser and go to `192.168.99.100:PORT` to see generated states from Italy and the USA.

## Step 3: Reverse proxy with apache (static configuration)

## Step 4: AJAX requests with JQuery

## Step 5: Dynamic reverse proxy configuration
