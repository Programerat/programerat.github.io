---
title:  "Modelet e dizajnimit - Strategjia"
date:   2021-11-17 08:15:20
description: Modelet e dizajnimit - Strategjia
tags: SOLID, OO, PHP, PROGRAMERAT
profile_image: https://avatars.githubusercontent.com/u/8136247?v=4
author: Diar Selimi
author_github: https://github.com/diarselimi
author_linkedin: diarselimi
author_description: "Coding is an art, if you know what you're doing."
author_title: Senior Backend Engineer
archive: true
---

Strategjia e mundëson që ti izolojmë algoritmet në klasa të ndame por që secila mundet me u përdor ne vend te tjetres.
Strategjia gjithashtu të mundson që me shtu klasa të tjera që implementojnë algoritme të ndryshme por jan të tipit të njejtë.

Gjithashtu kjo e suporton principin e pare  (Hapur per zgjatje e mbyllur per ndryshime)[link], ku nese egzekutimi i hapave është gjithmonë i njejt atëher klasa nuk ka nevoj që të ndryshohet.
Suporton edhe principin e peste ne SOLID ku gjithqka varet ne kontrat dhe jo ne implementim.

### Shembull konkret ne jeten reale
Nese shembull deshirijme me udhtu prej nje qyteti A ne qytetin B, ne duhet ta dijme se si mund te arrijme me shpejt ne destinacion.
Ta zejme qe e kemi ndertuar nje aplikacion ku e kalkulon rrugen me te shpejt me veture.
Ky shembull ne kod do te duket si ne vijim 
<script src="https://gist.github.com/Diarselimi/bfd539de510e269233dee8cdf5987403.js"></script>

### Nje shtese
Tash po na kerkohet qe ta shtojme nje menyr te re te transportit, si do ta shtonim nje menyr te re te transportit pa e thy rregullat SOLID?


### Nje shembull se si nuk duhej ta implementonim.
<script src="https://gist.github.com/Diarselimi/ab34e500d821307baf0bf48827f92039.js"></script>

### UML Modeli i strategjise
<img src="{{ "/" | relative_url  }}assets/diagrams/transporti.png" alt="uml diagrami" />

### Implementimi korrent i dizajnit
<script src="https://gist.github.com/Diarselimi/d5eafb20f04cea71f0fe7b28b81d8b67.js"></script>

### Mbyllja
Nuk po dini cka me lexu tash? 
Sygjerimi i imi eshte qe reflektoni ne kete dizajn pak edhe mendoni se si do e kishit perdorur edhe ne cfar probleme mundet me u apliku ky dizajn?






