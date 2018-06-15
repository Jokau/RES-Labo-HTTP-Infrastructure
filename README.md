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
The third step is under the branch *fb-apache-reverse-proxy*

Build the reverse proxy image `res/apache_rp` to handle two services at the same address:
* run the static apache container and the dynamic express service
  * `docker run -d --name apache_static res/apache_php`
  * `docker run -d --name express_dynamic res/express_states`
* get the ip address of each with
  * `docker inspect apache_static | grep -i ipaddress`	=> 172.17.0.2
  * `docker inspect express_dynamic | grep -i ipaddress`	=> 172.17.0.3
* edit configuration file 001-reverse-proxy.conf with previous ip addresses
* build and run the reverse proxy container
  * `docker build -t res/apache_rp .`
  * `docker run -p 8080:80 res/apache_rp`
* reverse proxy required domain name to be set :
  * edit OS hosts file : [docker ip] [domain name]
    * 192.168.99.10	lab.res.ch

Services are now routed with the following url :
* http://demo.res.ch:8080/
* http://demo.res.ch:8080/api/states/


## Step 4: AJAX requests with JQuery

## Step 5: Dynamic reverse proxy configuration
