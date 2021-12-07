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
<iframe width="768" height="432" src="https://miro.com/app/embed/o9J_lmlGRFs=/?pres=1&frameId=3458764514163267405" frameBorder="0" scrolling="no" allowFullScreen></iframe>

### Implementimi ne kod


### Mbyllja



