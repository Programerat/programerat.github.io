---
title: A është palindromë?
description: Gjeje nëse një tekst ose fjalë është një palindrom.
cover_img: https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Ambigram_palindrome_%CE%9D%CE%99%CE%A8%CE%9F%CE%9D%CE%91%CE%9D%CE%9F%CE%9C%CE%97%CE%9C%CE%91%CE%A4%CE%91%CE%9C%CE%97%CE%9C%CE%9F%CE%9D%CE%91%CE%9D%CE%9F%CE%A8%CE%99%CE%9D_%28Wash_your_sins%2C_not_only_your_face%2C_in_Greek%29.jpg/800px-Ambigram_palindrome_%CE%9D%CE%99%CE%A8%CE%9F%CE%9D%CE%91%CE%9D%CE%9F%CE%9C%CE%97%CE%9C%CE%91%CE%A4%CE%91%CE%9C%CE%97%CE%9C%CE%9F%CE%9D%CE%91%CE%9D%CE%9F%CE%A8%CE%99%CE%9D_%28Wash_your_sins%2C_not_only_your_face%2C_in_Greek%29.jpg
level: Lehtë    
solved_by: arlinndi9
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

### Zgjidhja

Problemi është zgjidhur nga [arlinndi9](https://github.com/arlinndi9) në seksionin e komenteve në gjuhën python.

```python
def palindrom(text):
    if text==text[::-1]:
        return True
    else:
        return False

```
      
   

Postojeni zgjidhjen në koment 👇