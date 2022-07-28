---
title: Gjej shekullin
description: Zgjidh problemin ku nëse ju jepet një vit atëher ju duhet ta gjeni se cili shekull është.
cover_img: https://programerat.github.io/assets/detyra/mbledhja-dy-numrave.png
level: Lehtë
---

### Problemi

Nëse jepet viti si input, gjeje shekullin se cili është.    

Shekulli i parë fillon nga viti 1 deri 100, shekulli i dytë 101 deri 200 e kështu me radhë.    

```php
function zgjidhja($viti): int
{
    //shkruaj logjiken
}
```

        
### Zgjidhja

Problemi është zgjidhur nga [arlinndi9](https://github.com/arlinndi9) në seksionin e komenteve në gjuhën python.

```python
def zgjidhja(viti):
    if int(viti) <= 0:
        return 0
    elif int(viti) <= 100:
        return 1
    elif int(viti) % 100 == 0:
        shekulli=int(viti)//100
        return shekulli
    else:
        shekulli=(int(viti)//100+1)
        return shekulli

```

      
Postojeni zgjidhjen në koment 👇