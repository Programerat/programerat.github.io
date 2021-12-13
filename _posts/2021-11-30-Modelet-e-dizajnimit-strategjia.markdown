---
title:  "Paternet e dizajnimit - Paterni Strategji"
date:   2021-12-13 17:35:00
description: Paterni strategji bën pjesë në kategorinë e kontrollit të sjelljes së objekteve duke mundësuar më shumë fleksibilitet në komunikimin në mes objekteve.
tags: OO, Design Patterns, PHP
profile_image: https://avatars.githubusercontent.com/u/8136247?v=4
author: Diar Selimi
author_github: https://github.com/diarselimi
author_linkedin: diarselimi
author_description: "Coding is an art, if you know what you're doing."
author_title: Senior Backend Engineer
archive: false
---

Paterni strategji mundësonë që ti izolojmë algoritmet në klasa të ndryshme, dhe mundëson zëvendesimin e algoritmeve pa pasur nevojë qe kodi të ndryshohet. Pra paterni strategji na mundësonë që të shtojmë klasa të tjera që implementojnë algoritme të ndryshme por janë të tipit të njëjtë.  
&nbsp;

Gjithashtu kjo e mbështetë  principin e parë <a href="https://programerat.github.io/2021/SOLID-principet-dhe-si-ti-aplikoni-ne-kod/#Principi%20i%20dytë%20-%20E%20hapur%20për%20zgjatje,%20e%20mbyllur%20për%20ndryshime."> Hapur për zgjerim e mbyllur për ndryshime.</a> E mbështetë  edhe principin e pestë në SOLID ku gjithçka varet në kontratë dhe jo në zbatim. 
Prandaj ky patern na mundësonë që të kemi shumë zbatime të bazuara  në një kontratë.  
&nbsp;
  
> Mos harroni <a href="https://en.wikipedia.org/wiki/KISS_principle">KISS</a> para çdo gjëje tjetër.

### Shembull konkret nga jeta reale
Nëse për shembull duam të udhëtojmë nga qyteti  A në qytetin B, ne duhet ta dimë se si të arrijmë më shpejtë në destinacion. Supozojmë që ne e  kemi ndërtuar një aplikacion i cili e llogaritë rrugën më të shpejtë me makinë. 

Implementimi në kod do të duket si më poshtë:
<script src="https://gist.github.com/Diarselimi/bfd539de510e269233dee8cdf5987403.js"></script>

### Një veçori e re
Tani na kërkohet të shtojmë një mënyrë të re transporti. Si do të shtonim një mënyrë të re transporti pa shkelur rregullat SOLID?


### Një shembull se si nuk duhet të zbatohet.
Në shembullin e mëposhtëm shohim se si rregulli i parë i principeve SOLID është thyer, <a href="https://programerat.github.io/2021/SOLID-principet-dhe-si-ti-aplikoni-ne-kod/#Principi%20i%20par%C3%AB%20-%20Nj%C3%AB%20klas%C3%AB,%20nj%C3%AB%20p%C3%ABrgjegj%C3%ABsi">Principi i një përgjegjësie</a>. <a href="https://programerat.github.io/2021/SOLID-principet-dhe-si-ti-aplikoni-ne-kod/#Principi%20i%20dyt%C3%AB%20-%20E%20hapur%20p%C3%ABr%20zgjatje,%20e%20mbyllur%20p%C3%ABr%20ndryshime.">Gjithashtu thyen principin e dytë e mbyllur për ndryshime</a>, nëse metoda e njërit prej transporteve ndryshon atëhere edhe  kjo klasë duhet të ndryshojë.
<script src="https://gist.github.com/Diarselimi/ab34e500d821307baf0bf48827f92039.js"></script>
Kjo klasë,  në jetën reale do të ishte klasa më e madhe në projekt  nëse do të punonim në një aplikacion si në shembullin më lartë.

### UML Modeli i strategjise
<img src="{{ "/" | relative_url  }}assets/diagrams/transporti.png" alt="uml diagrami" />
Në diagram e shohim se e kemi një kontratë `Transport`, pastaj, çdo klasë me zbatime të ndryshme në bazë të kontratës. Klientit nuk i intereson sesi zbatohet algoritmi sepse ai varet në kontratë dhe kjo e mbështetë principin e pestë <a href="https://programerat.github.io/2021/SOLID-principet-dhe-si-ti-aplikoni-ne-kod/#Principi%20i%20pest%C3%AB%20-%20Inversioni%20i%20var%C3%ABsis%C3%AB"> Inversionin i varësisë</a>.

### Implementimi korrent i dizajnit
<script src="https://gist.github.com/Diarselimi/d5eafb20f04cea71f0fe7b28b81d8b67.js"></script>
Pjesa me `switch` mund të bartet në një factory ku në bazë të inputit e krijon klasën specifike. 
P.SH
<script src="https://gist.github.com/Diarselimi/a3191d3e3b6ff9bf3ba3e31331bf15e5.js"></script>
Këtë pjesë mund ta shpjegoj kur të shkruaj për paternin Factory më në detaje.  

### Mbyllja
Gjithmonë kur shkruajmë kod duhet të përpiqemi të lidhim problemin me jetën e përditshme, nëse nuk është e mundur me biznesin.
Zbatimi i principeve dhe modeleve bëhet më i lehtë kur e kuptoni problemin. Për të parë nëse e kuptoni problemin atëherë  provoni t’ia shpjegoni dikujt ose përdorni metodën <a href="https://en.wikipedia.org/wiki/Rubber_duck_debugging">Rubber Duck.</a>
&nbsp;

> Siç thotë shprehja, nëse mund t’ia shpjegoni dikujt me fjalë të thjeshta, atëherë e kuptoni problemin.  

&nbsp;
&nbsp;

Rubber duck është një metodë shumë e popullarizuar që programuesit e përdorin sepse shpesh nuk kemi pyetje pasi që mendojmë se gjithçka është e qartë, ndërsa nëse përpiqemi ta shpjegojmë atë atëherë e shohim që nuk e kemi kuptuar në të vërtetë.  
Në vazhdim do të postoj për modele të tjera por edhe për metoda të ndryshme që përdorin programuesit.  
&nbsp;

Kodim të këndshëm. `<3 </>`  







