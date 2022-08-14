---
title: Gjej shumën e matricës
description: Zgjidhe problemin ku nëse jepet një matric dhe ju duhet ta gjeni shumën e pozitave të matricës valide.
date: 2022-08-14 12:12:12
cover_img: https://codesignal.s3.amazonaws.com/tasks/matrixElementsSum/img/example1.png?_tm=1624661706824
level: Lehtë
---

### Problemi
Nëse jepet një matric x, ku mbrenda matrices do të jenë numra të ndryshëm.

Detyra juaj është që ta gjeni shumën e numrave mbrenda asaj matrice.

Rregullat për ta zgjedhur këtë matricë janë:
1. Nëse në një pozitë të matricës gjendet një vlerë zero (0) atëherë ju duhet të i injoroni numrat që gjenden nën atë numër.
p.sh:
```js
matrica = [[0, 1, 1, 2],
          [0, 5, 0, 0], 
          [2, 0, 3, 3]]
```

Në këtë matricë rezultati duhet të jep `zgjidhja(matrica) = 9`.

Nëse e shohim në rreshtin e parë kemi: **0**, 1, 1, 2 dhe në këtë rast e marrim shumën e të gjitha numrave, dhe e mbajmë në mend që kemi zero në kolonën e parë, rezultati deri më tani është **4**.

Rreshti dytë : **0**, 5, **0**, **0**, këtu kemi edhe dy zero në kolonën 3 dhe 4, rezultati deri më tani është = **9**.
Rreshti i tretë: 2, **0**, 3, 3 dhe për shkak që kolonat më sipër vetëm kan zero këto vlera nuk i konsiderojmë.

Shembulli radhës :
```js
matrica = [[1,1,1,0], 
 [0,5,0,1], 
 [2,1,3,10]];
```
Rezultati duhet të jetë 9.

Shkruani logjikën mbrenda metodës zgjidhja.      
```php
function zgjidhja(array $m): int {
    // shkruaj Logjikën                        
}

```   

Mund ta përdorni këtë test kodin që siguron që disa shembuj të thjeshtë kalojnë.     

```php

function zgjidhja(array $m): int {
    // shkruaj Logjikën                        
}

assertEquals(9, zgjidhja([[0,1,1,2], [0,5,0,0], [2,0,3,3]]));
assertEquals(9, zgjidhja([[1,1,1,0], [0,5,0,1], [2,1,3,10]]));
assertEquals(18, zgjidhja([[1,1,1], [2,2,2], [3,3,3]]));
assertEquals(0, zgjidhja([[0]]));

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


