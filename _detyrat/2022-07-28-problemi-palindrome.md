---
title: A është palindromë?
description: Gjeje nëse një tekst ose fjalë është një palindrom.
cover_img: https://programerat.github.io/assets/detyra/mbledhja-dy-numrave.png
level: Lehtë    
---

### Problemi

Nëse jepet inputi si një string, ju duhet ta gjeni se ai string a është [palindrom](https://en.wikipedia.org/wiki/Palindrome).    

Palindrom është kur një fjalë ose string lexohet njejt nga ana e djathë dhe e majtë.    

Shembuj të palindromave:
* Aba
* Ata
* Radar
* 22022022
          
p.sh.
* Nëse `teksti = "ata"` atëherë metoda kthen `zgjidhja(teksti) = true`.
* Nëse `teksti = "aasss"` atëherë metoda kthen `zgjidhja(teksti) = false`.
* Nëse `teksti = "a"` atëherë metoda kthen `zgjidhja(teksti) = true`.

          
```php
function zgjidhja(string $teksti): bool {
    // shkruaj Logjikën                        
}

```   

Mund ta përdorni këtë test kodin që siguron që disa shembuj të thjeshtë kalojnë.

```php

function zgjidhja(string $teksti): bool {
    // shkruaj Logjikën                        
}

assertEquals(true, zgjidhja("ata"));
assertEquals(false, zgjidhja("njeri"));
assertEquals(true, zgjidhja("a"));

function assertEquals($ex, $res) {
	if ($ex !== $res) {
		echo "Deshtoj...  \n";
		exit;
	}
	echo "Kaloj\n";
}
```
   

Postojeni zgjidhjen në koment 👇