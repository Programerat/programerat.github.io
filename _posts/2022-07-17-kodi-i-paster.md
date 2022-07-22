---
title: Kodi i pastër dhe çka duhet të konsideroni
description: Çka është kodi i pastër dhe si të efekton karrieren tënde si një programer profesional.
cover_img: https://programerat.github.io/assets/images/clean_code-cover.jpg
author: diarselimi
tags: karriera programim mesime
archive: true
---

### Hyrje

Në fushën e programimit gjithmonë është një gjë me rëndësi Kodi i pastër, por çka domethënë kodi i pastër?   

Kodi i pastër do të thotë kur një person përpos teje e lexon atë që ti e ke shkruar dhe e kupton pa patur nevojë të pyes ty se çfar pune bën një një program një klasë ose një metodë.

Një programer profesional shpenzon më shumë kohë duke analizuar ose lexuar kodin që të tjerët e shkruajnë.

Diferenca në mes të një programeri të menqur dhe ati profesional është që, i menquri mund të mbaj në mend shum gjëra.

p.sh Ai e din që variabla **r** në klasën **Processor** e përmban vlerën e **url path**, por nëse një programer tjetër dëshiron të punoj në atë klasë atëher ai duhet ta pyes programerin e menqur.

Ndërsa ai profesionali shpenzon kohë në emërtimin dhe organizimin e kodit që të tjerët ta kenë më të lehtë ta kuptojnë dhe të bëjnë ndryshime.

> Bëhu profesional.    

      

### Rregullat me shembull

Sikur në gjuhën që e flasim dhe komunikojmë, egzistojnë rregulla që të gjithë i mësojmë në shkollë.

Në programim këto rregulla askush nuk të shtynë ti mësosh, por mundësia për të u pranuar në një punë është më e madhe nëse i mëson ato rregulla.

Nuk do ti listoj të gjitha rregullat por disa më të thjeshta do të mundohem ti shpjegoj me disa pjesë kodi.

p.sh Jeni duke bërë një kërkesë në API dhe doni të ktheni të gjitha blerjet të listuara.

```php

class OrdersController {
//Emri i klasës duhet të jetë i përshkueshëm në nivelin ku
//programeri i radhës kur e sheh klasën e kupton se çfar pune bën pa e hapur atë.
//GetOrdersWithFiltersController do të ishte më e përshkrueshme
	

	public function get(Request $request) : Response {
        
        if (!$this->auth->getUser()->isAuthenticated()) {
            //Në këtë rast thehet rregulli ku metoda ka njohuri 
            //se çka përmban getUser()
            //idealisht duhet të duket
            //$this->auth->isUserAuthenticated() 
            //..
            return new UnauthorizedResponse();
        }
        
        $filters = [
            'order_by' => $request->get('order_by'),
            'order_direction' => $request->get('order_direction'),
            'search' => $request->get('search'),
            ...
        ];
        //konstruktimi i filterave mbrenda controllerit nuk është ideale
        //metoda duhet të lexohet pastër dhe jo të shohim strukturen e filterave
        //pra kjo mund të bartet në një Factory ose DTO objekt ku do të duket si në vijim
        //RequestFiltersFactoryIml::create($request->getParams())
        
        
        if (!in_array($filters['order_direction'], ['asc', 'desc'])) {
        //asc dhe desc duhesh ti deklarosh si konstante 
        //apo ti fusesh mbrenda objektit / DTO objektit qe e kemi përmendur më lartë
        
            throw new SortingIsNotSupported();
        }
        
        $list = $this->orders->findAll($filters);
        //Emertimi i variablës në këtë rast nuk është aq i vetë shpjegueshëm
        //$filteredOrders do të ishte më e përshkrueshme
		
        $isPagination = str_contains('/count', $request->getUri()->getPath());
        //Në këtë rresht kjo metodë po qaset në path për ta gjetur nëse 
        //egziston /count në url
        //por kjo është një shtresë më e thellë e aplikacionit prandaj 
        //edhe kjo e then rregullin që metoda duhet të qaset gjithmonë në të njejtën shtresë
        //$request->isPaginated() ose $request->
        
        if ($isPagination) {
            return new PaginatedResponse($list);
        }
        
        return new Response($list);
	}
}
```

I njejti funksionalitet por me rregulla të konsideruara dhe me funksionalitet të fshehur në objekte.    


```php
class GetOrdersWithFiltersController {
    
    public function get(Request $request): Response
    {
        if ($this->authorization->isAuthorized()) {
            throw new NotAuthorized();
        }
        
        $getOrdersRequest = $this->prepareQuery($request->getParams());
        
        $orders = $this->query->execute($query);
        return $this->buildResponse($orders);
    }
}
```

Pra siç e shihni në këtë shembull, kodi i pastër do të thotë duhet të lexohet lehtë, që nëse dikush përpos teje e lexon këtë metodë dhe e sheh se çka po shkruan dhe e kupton se çfar pune po kryen.

[Një përmbledhje e rregullave të librit Clean Code - R. Martin mund ti gjeni në këtë link.](https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29)     
      



### Një kalkulim


Nëse projekti ku punon ti i përmban 8000 rreshta kod.

Ta zëmë që ti do të punosh në atë kompani për 1 vit = 230 ditë pune.

Nëse çdo ditë mundohesh ta përmirsosh projektin për vetem 0.43% në ditë që i bjen 34 rreshta ne ditë.

Ne fund te vitit ti do ta ndryshosh komplet kodin në atë projekt.

Në fillim kur ti vendos ti aplikosh rregullat në kodin që je duke shkruar do të jetë më e vështirë sepse je duke mbjellur shprehi të reja, por kjo do të ndryshoj në mënyrë lineare, pas disa muajsh ju nuk do të keni nevoj të mendoni aq shumë.         


 
### Efekti mbrenda ekipit

* Ti dhe ekipi ytë 70% të kohës do të shpenzoni duke lexuar kod dhe jo duke shkruar, për të shkruar kod duhet të lexosh.
* Puna e të gjith ekipit do të lehtësohet nëse bini në dakordim që të aplikoni rregulla.
* Ti do të jesh pika kyqe ku të gjithë do të referohen për pyetje apo këshilla.
* Secili ekip do të dëshiroj që ti të jesh pjes e ekipit sepse e lehtëson punen e ekipit kur ata me lehtësi e lexojnë kodin tënd.

Një efekt negativ është që në fillim ndoshta do të hasësh rezistencë nga antarët e ekipit, por nëse ja prezenton faktet dhe referencat në libra dhe artikuj atëher argumentet përfundojnë.

> Sigurohu që ta lexosh **Mbaje në mend** në fund të artikullit.


### Efekti afatgjatë

Nëse shefi të pyet se për sa kohë mund ta përfundosh një projekt me x kërkesa.

Ti ja prezenton një diagram si në vijim:

![Diagrami i kohes dhe kompleksitetit]({{ "/" | relative_url  }}assets/images/code-quality.png)    



Ja shpjegon që nëse dëshiron rezultat të shpejt, pasojat do të jenë më vonë, dhe anasjelltas. 

Kjo përveq që e efekton të ardhmen e projektit të efekton edhe ty si programer në dy mënyra:

1. Fuqia e shprehisë
2. Madhësia e projektit   

     


#### Fuqia e shprehisë 

Ti je programer që je për shkak të shprehive që i ke adaptuar me kohë.

Prandaj duhet të jesh shumë i kujdesshëm se çka dhe si punon në fillim të karrierës.

Nëse punon në projekte ku ata mbi ty të shtyjnë të adaptosh shprehi të kqija sikur

* Shkimi i kodit duke i thyer rregullat e përmendura në artikull më lartë
* Injorimi i formateve 
* Injorimi i shkrimit të testeve.

dhe i bën të gjitha këto pa asnjë benefit për ty atëher duhet ta mendosh edhe njëher atë vend pune.       



Duke punuar në këtë mënyr për një vit ju do ti mbjellni ato shprehi në karakterin ose eksperiencen tuaj.

Në të ardhmen nëse dëshironi të aplikoni në një kompani më të mirë atëher ju duhet ti harroni shprehit të kqija dhe të mësoni shprehit e mira.

Pra siç e shihni që nuk ka asnjë benefit për ty si programer prej asaj kompanisë, gjithmon duhet të mendosh në të ardhmen çfar benefite do të mbesin ty si programer.

Dikush edhe zgjedh të sakrifikoj standartet për një benefit që është më i vlefshëm se vet kualiteti i kodit, dhe ajo nuk është një zgjedhje e gabuar.      


      

#### Madhësia e projektit

Nëse vendosni të mos adaptoni formatet dhe rregullat e përmendura në projekt, atëher pas një viti projekti që ti je duke punuar do të bëhet aq i madh sa që nuk mund ta përballoni të punoni i vetëm në të.

Shefi vendos që ta punsoj një programer të ri në projekt, por për shkak që ti ke dështuar me e bindë shefin për kod të pastër, keni vendosur që mos ti ndjekni standarde dhe mos të shkuani teste, programeri i ri e ka shumë të vështirë ta mësoj dhe kontriboj në projekt.

Prandaj koha jote tash ndahet në dy pjesë, 

* Vazhdimi i punës në implementimin e gjërave të reja në projekt
* Ndihma e programerit të ri që ta kuptoj se çka po bëhet në kod ku ai është duke punuar.

Pas kësaj ti i tregon shefit që të duhet edhe një programer me më shum eksperience sepse ky nuk po kryen shumë punë.

Dhe kështu përfundon deri te dështimi i projektit.


Në fund ti do të jesh ai që e ke bërë projektin të dështoj sepse ti je ai që e ke shkruar kodin e pa pastër, dhe shefi të qet prej pune dhe ja jep punën tënde një programeri me më eksperiencë.      

I vetmi benefit që ke marrur nga ai vend pune është eksperienca se si një projekt të dështon.
      

### Aplikimi i rregullave

Për ti aplikuar të gjitha rregullat një shprehi e mirë është kur jeni duke shkruar kod, provoni të ja shpjegoni vetës me fjalë se çka po bën ky kodi.

Provoni ta adaptoni këtë mentalitet

1. E shkruani kodin që të funksionoj
2. I shkruani disa teste që ta mundsojnë ty për ta ndryshuar kodin pa e prishur funksionalitetin
3. Fillon me riemertimin e metodave dhe klasave 
4. Fillon ndarjen e klasave ne klasa të veçanta 
5. I zvoglon metodat që të jetë më i lexueshëm kodi.
6. E lexon disa herë
7. kthehesh tek hapi 3. 
8. Nëse mendon që gjithqka është në rregull atëher vazhdon.      


### Automatizimi i rregullave 

Janë disa vegla që të ndihmoj në dhe të tregojnë nëse ki probleme me standarte të ndryshme të kodit.

Por në një pikë veglat nuk mund ta ri shkruajnë kodin për ty.

Veglat:
1. [https://phpstan.org/try](https://phpstan.org/try)
2. [https://www.npmjs.com/package/phplint](https://www.npmjs.com/package/phplint)
3. [snyk.io](https://snyk.io/lp/snyk-code-checker/?utm_medium=Paid-Search&utm_source=google&utm_campaign=nb_lg_snyk-code&utm_content=code_analysis&utm_term=code%20analysis%20tools&gclid=CjwKCAjw5s6WBhA4EiwACGncZWBRlgUwVS6fGws6nsb3dD1yQZ0iCzuN5neSZZEiM3UhbXxzl7SeJBoCf5AQAvD_BwE)
4. [https://www.sonarqube.org/](https://www.sonarqube.org/)    
5. [https://phpinsights.com/](https://phpinsights.com/)


       
### Konkluzioni

Në librin e “Clean Code - R. Martin” është një rregull interesant që më ka mbetur në mendje dhe ai është si në vijim, “Leje kodin ku je duke punuar pak më mirë se që e ke gjetur”.

Pra përmbledhja e gjithë tekstit në këtë artikull flet për kodin e pastër.
Nëse shkruan kod të pastër je ti ai që përfiton nga eksperienca dhe je ti ai që përfiton shprehi të mira që të shtyjnë përpara në karrierë.

Fillimi nuk është i lehtë për të shkruar kod të pastër, por pas disa kohe do të bëhet intuitive.

Nëse dikush tjetër do ta lexoj atë klasë apo funksion që ti e ke shkruar, do të është falenderues sepse e ke kursyer kohën e tij.
     
Mos e merrni kodin e pastër sikur një rregull dhe ta ndjekni atë pa menduar fare, përdoreni intuitën dhe  konsiderojeni si një rrugë që ju shtyn të mendoni për atë që shkruani në një perspektive unike.      


#### Mbaje në mend 🧠
Gjithmon duhet të komunikoni me ekipin dhe kolegët, të bini në një konkluzion së bashku, në fund, ju jeni një ekip, dhe një ekip për të funksionuar, komunikimi duhet të jetë i rëndësishëm.

