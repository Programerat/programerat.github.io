---
title: Gjej prodhimin e dy numrave.
description: Do të jepet një vektor me n numra të plot dhe ti duhet ta gjesh se cili qift i numrave jep vektorin më të madh.
cover_img: https://programerat.github.io/assets/detyra/prodhimi_i_dy_numrave.png
level: Lehtë    
---

### Problemi

Nëse jepet inputi si një vektor, ju duhet ta gjeni prodhimin e të gjithë çifteve mbrenda vektorit dhe ta ktheni prodhimin më të madh.     
![prodhimi](https://programerat.github.io/assets/detyra/prodhimi.png)
               
p.sh.
* Nëse jepet `vektori = [3, 6, -2, -5, 7, 3]	` atëherë metoda kthen `zgjidhja(vektori) = 21`.
* Nëse jepet `vektori = [-1, -2]				` atëherë metoda kthen `zgjidhja(vektori) = 2 `.
* Nëse jepet `vektori = [1, 2, 3, 0]  			` atëherë metoda kthen `zgjidhja(vektori) = 6 `.

          
Shkruani logjikën mbrenda metodës zgjidhja.      
```php
function zgjidhja(array $vektori): int {
    // shkruaj Logjikën                        
}

```   

Mund ta përdorni këtë test kodin që siguron që disa shembuj të thjeshtë kalojnë.

```php

function zgjidhja(array $vektori): int {
    // shkruaj Logjikën                        
}

assertEquals(21, zgjidhja([3, 6, -2, -5, 7, 3]));
assertEquals(30, zgjidhja([5, 6, -4, 2, 3, 2, -23]));
assertEquals(0, zgjidhja([[1, 0, 1, 0, 1000]));

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