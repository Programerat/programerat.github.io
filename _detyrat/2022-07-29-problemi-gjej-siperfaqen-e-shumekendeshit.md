---
title: Gjej sipërfaqen e shumëkëndëshit.
description: Do të jepet një n-shumëkëndësh dhe ju duhet ta gjeni sipërfaqen e saj.
cover_img: https://programerat.github.io/assets/detyra/poligon.png
level: Lehtë    
---

### Problemi

Më posht do ta definojmë një `n`-poligon.
Detyra jote është që ta gjesh siperfaqen e poligonit për vlerën e dhënë `n`. 

Një `1`-poligon është vetëm një katror ku gjatësia e saj është 1.
Një `n`-poligon gjenerohet duke marrur `n - 1` -poligon dhe duke e rrethuar me `1`-poligon.      
     
Mund ta shihni në imazh se si `1`-,`2`-,`3`- dhe `4`-shumëkëndësh.
![shumkendeshat](https://programerat.github.io/assets/detyra/poligon.jpg)    
                
Shembull
* Për `n = 2` rezultati nga metoda është `zgjidhja(n) = 5`.
* Për `n = 3` rezultati nga metoda është `zgjidhja(n) = 13`.
* Për `n = 5` rezultati nga metoda është `zgjidhja(n) = 41`.

Shkruani logjikën mbrenda metodës zgjidhja.      
```php
function zgjidhja(int $n): int {
    // shkruaj Logjikën                        
}

```   

Mund ta përdorni këtë test kodin që siguron që disa shembuj të thjeshtë kalojnë.

```php

function zgjidhja(int $n): int {
    // shkruaj Logjikën                        
}

assertEquals(41, zgjidhja(5));
assertEquals(127984001, zgjidhja(8000));
assertEquals(199900013, zgjidhja(9998));

function assertEquals($ex, $res) {
	if ($ex !== $res) {
		echo "Deshtoj...  \n";
		exit;
	}
	echo "Kaloj\n";
}
```


Një vegël për të shkruar kodin online: [http://phptester.net/](http://phptester.net/).
       

Postojeni zgjidhjen në koment 👇