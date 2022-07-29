---
title: Sa numra mungojnë?
description: Do të jepet një vektor, dhe ju duhet ta gjeni se sa numra mungojnë në renditje.
cover_img: https://miro.medium.com/max/500/1*ozZ0WzLvwyB9rUJhVFTJTg.jpeg
level: Lehtë    
---

### Problemi

Nëse jepet një vektor me numra të pa renditur, ju duhet ta gjeni numrin më të vogël dhe atë më të madh.
Pasi të gjendet vlera më e vogël dhe ajo më e madhe, duhet ta gjeni se cilat numra mungojnë në renditje.

                     
Shembull:
* Për `v = [1,2,7,8,3]` rezultati nga metoda është `zgjidhja(v) = 3`, sepse në vektor mungojnë 4,5 dhe 6.
* Për `v = [4,9,7]` rezultati nga metoda është `zgjidhja(v) = 3`, sepse në vektor mungojn 5,6 dhe 8.       
     
Shkruani logjikën mbrenda metodës zgjidhja.      
```php
function zgjidhja(array $v): int {
    // shkruaj Logjikën                        
}

```   

Mund ta përdorni këtë test kodin që siguron që disa shembuj të thjeshtë kalojnë.

```php

function zgjidhja(array $v): int {
    // shkruaj Logjikën                        
}

assertEquals(3, zgjidhja([6, 2, 3, 8]));
assertEquals(2, zgjidhja([0, 3]));
assertEquals(0, zgjidhja([1]));

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