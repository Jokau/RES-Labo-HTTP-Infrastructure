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
The fourth step is under the branch *fb-ajax-jquery*
* Create js script to be executed be the client to refresh content on the html page.
* Client now requests the express service which is on another container, although it should be forbidden, it is now possible to access this second container, since the proxy is the unique interface between the client and the two containers.


## Step 5: Dynamic reverse proxy configuration
* Create php script `config-template.php` to retrieve the ip from environment variables used configure the reverse proxy.
* Run multiple instances of both dynamic and static images to make sure the script adapts to the actual ip addressess.
* Get the ip from the running service containers
  * `docker inspect apache_static | grep -i ipaddress`	=> 172.17.0.7
  * `docker inspect express_dynamic | grep -i ipaddress`	=> 172.17.0.6
* Set the environment variables while running the proxy image
  * `docker run -e STATIC_APP=172.17.0.7:80 -e DYNAMIC_APP=172.17.0.6:3000 -p 8080:80 --name apache_rp res/apache_rp`


## Step 6 : Management UI
Container management can be done with UI with https://portainer.io/install.html.
One requires an account and to run the following commands :
* `docker volume create portainer_data`
* `docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer`
