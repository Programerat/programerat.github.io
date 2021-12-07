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

# Modelet e dizajnimit - Strategjia
Strategjia e mundëson që ti izolojmë algoritmet në klasa të ndame por që secila mundet me u përdor.
Strategjia gjithashtu të mundson që me shtu klasa të tjera që implementojnë algoritme të ndryshme por jan të tipit të njejtë.

Gjithashtu kjo e suporton principin e pare  (Hapur per zgjatje e mbyllur per ndryshime)[link], ku nese egzekutimi i hapave është gjithmonë i njejt atëher klasa nuk ka nevoj që të ndryshohet.
Suporton edhe principin e peste ne SOLID ku gjithqka varet ne kontrat e jo ne implementim.

### Shembull konkret ne jeten reale
<script src="https://gist.github.com/Diarselimi/bfd539de510e269233dee8cdf5987403.js"></script>


### Problemi
E kemi bere nje api te thjesht ku kemi simple authentication me user edhe fjalkalim, tash po dojm me shtu nje metod te re per me u qas ne api me nje qels (api key).


### Kodi si duket paraprakisht, kodi primitiv ku nuk perdor strategji modelin.
<script src="https://gist.github.com/Diarselimi/bfd539de510e269233dee8cdf5987403.js"></script>

### uML Modeli i strategjise
<iframe width="768" height="432" src="https://miro.com/app/board/o9J_lmlGRFs=/?invite_link_id=992337608221&pres=1&frameId=3458764514163267405" frameBorder="0" scrolling="no" allowFullScreen></iframe>

### Implementimi ne kod


### Mbyllja



