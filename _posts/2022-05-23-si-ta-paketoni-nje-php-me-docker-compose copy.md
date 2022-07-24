---
description: Në këtë video do të mësoni se çka është docker-compose dhe si mund ta paketojmë një aplikacion që të tjerët mund ta përdorin.
tags: docker-compose PHP VSCODE
profile_image: https://avatars.githubusercontent.com/u/8136247?v=4
author: diarselimi
author_github: https://github.com/diarselimi
author_linkedin: diarselimi
author_description: "Coding is an art, if you know what you're doing."
author_title: Senior Backend Engineer
type: video
title:  Përgaditu për live me Docker compose - PHP, NGINX, MySql
url: "https://youtu.be/7QcL3vF4dkc"
code: "7QcL3vF4dkc"
date:   2022-04-23 08:15:20
video: true
---

Në këtë video do të mësoni se çka është docker-compose dhe si mund ta paketojmë një aplikacion që të tjerët mund ta përdorin.

Nuk keni nevoj të instaloni Xampp, apache ose PHP thjesht duhet të keni Docker të instaluar.

Referencat në video janë:
 * [Docker HUB](https://hub.docker.com)
 * [Artikulli i Docker Compose](https://programerat.github.io/2022/01/si-te-perdorim-docker-compose)
 * [Docker php shtesat](https://gist.github.com/chronon/95911d21928cff786e306c23e7d1d3f3)
 * [Nginx website](https://www.nginx.com/)
 * [Docker Compose Dokumentimi](https://docs.docker.com/get-started/08_using_compose/#:~:text=Docker%20Compose%20is%20a%20tool,or%20tear%20it%20all%20down.)


#### Fajllat

Fajlli per nginx `default.config`
```
server {  

     listen 80 default_server;  
     root /var/www/html;  
     index index.html index.php;  

     charset utf-8;  

     location / {  
      try_files $uri $uri/ /index.php?$query_string;  
     }  

     location = /favicon.ico { access_log off; log_not_found off; }  
     location = /robots.txt { access_log off; log_not_found off; }  

     access_log off;  
     error_log /var/log/nginx/error.log error;  

     sendfile off;  

     client_max_body_size 100m;  

     location ~ .php$ {  
      fastcgi_split_path_info ^(.+.php)(/.+)$;  
      fastcgi_pass php:9000;  
      fastcgi_index index.php;  
      include fastcgi_params;  
      fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;  
      fastcgi_intercept_errors off;  
      fastcgi_buffer_size 16k;  
      fastcgi_buffers 4 16k;  
    }  

    location ~ /.ht {  
      deny all;  
    }  
} 
```



