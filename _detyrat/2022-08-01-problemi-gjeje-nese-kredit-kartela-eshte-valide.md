---
title: Vërteto Kredit Kartela është valide 
description: Do të jepen disa kredit kartela, dhe ju duhet ta shkuarni një program që validon ato.
cover_img: https://www.postoffice.co.uk/dam/jcr:a308ccc6-1c26-4834-b679-4d6a9fbd3d35/new-one-credit-card.png
level: Lehtë    
---

### Problemi

Nëse jepet një numër i një kredit kartelë, ju duhet ta vërtetoni se a është ai numër valid apo jo?

Për të arritur një validim të tillë ju duhet ti merrni të gjith numrat tek të atij numri duke filluar numrimin nga zero dhe nga ana e djathtë, të gjithë ata numra duhet të shumzohen për 2 dhe nëse shumzimi jep rezultat 2 shifror, ata 2 numra duhet të mbledhen (p.sh 12: 1+2, 18: 1+8), dhe shuma e të gjitha numrave duhet të merret.
Pastaj shuma e numrave çift duke filluar nga ana e djathtë duhet të mbledhen në mes vete.
Pasi që numrat të jenë shumzuar dhe mbledhur, rezultatet e të dy hapave duhet të mblidhen të gjithë bashk.    

Në fund rezultati duhet të bëhet i pjestueshëm me 10.
                     
Shembull:
* Për `c = "379354508162306"` rezultati nga metoda është `zgjidhja(c) = true`.
* Për `c = "4388576018402626"` rezultati nga metoda është `zgjidhja(c) = false`.
* Për `c = "5196081888500645"` rezultati nga metoda është `zgjidhja(c) = true`.

     
Shkruani logjikën mbrenda metodës zgjidhja.      
```php
function zgjidhja(string $c): bool {
    // shkruaj Logjikën                        
}

```   

Mund ta përdorni këtë test kodin që siguron që disa shembuj të thjeshtë kalojnë.     

```php

function zgjidhja(string $c): bool {
    // shkruaj Logjikën                        
}

assertEquals(true, zgjidhja(379354508162306));
assertEquals(false, zgjidhja(4388576018402626));
assertEquals(true, zgjidhja(5196081888500645));
assertEquals(false, zgjidhja(12312312312312312));


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