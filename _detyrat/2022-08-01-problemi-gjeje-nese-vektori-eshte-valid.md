---
title: Elementet e vektorit në rritje - 1
description: Do të jepet një vektor, dhe ju duhet ta gjeni se elementet mbrenda a janë të renditura prej më të voglit deri te më i madhi.
cover_img: https://datagenetics.com/blog/march102021/title.jpg
level: Lehtë    
published: false
---

### Problemi

Nëse jepet një vektor me numra të pa renditur, ju duhet ta gjeni nëse ky vektor përmban numra që janë në rritje dhe e keni një mundësi për ta fshirë një element nga vektori që të bëhet valid.

Nëse vektori përmbanë një element atëherë ai konsiderohet si valid.     
    
                     
Shembull:
* Për `v = [1, 3, 2, 1]` rezultati nga metoda është `zgjidhja(v) = false`.
* Për `v = [1, 3, 2]` rezultati nga metoda është `zgjidhja(v) = true` sepse e fshini numrin 3 nga vektori dhe pastaj është valid.           
     
Shkruani logjikën mbrenda metodës zgjidhja.      
```php
function zgjidhja(array $v): bool {
    // shkruaj Logjikën                        
}

```   

Mund ta përdorni këtë test kodin që siguron që disa shembuj të thjeshtë kalojnë.     

```php

function zgjidhja(array $v): bool {
    // shkruaj Logjikën                        
}

assertEquals(false, zgjidhja([3, 6, 5, 8, 10, 20, 15]));
assertEquals(false, zgjidhja([1, 1, 2, 3, 4, 4]));
assertEquals(true, zgjidhja([10, 1, 2, 3, 4, 5]));
assertEquals(true, zgjidhja([1, 3, 2]));

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