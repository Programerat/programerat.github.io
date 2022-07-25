---
title: Kodi i pastër dhe çka duhet të konsideroni
description: Çka është kodi i pastër dhe si të efekton karrieren tënde si një programer profesional.
cover_img: https://programerat.github.io/assets/images/show-love.jpg
author: diarselimi
tags: karriera programim mesime
archive: true
type: artikull
---

### Hyrje

Në fushën e programimit gjithmonë është një gjë me rëndësi Kodi i pastër, por çka domethënë kodi i pastër?   

Kodi i pastër do të thotë kur një person përpos teje e lexon atë që ti e ke shkruar dhe e kupton pa pasur nevojë të pyes ty se çfar pune bën një program një klasë apo një metodë.

Një programer profesional shpenzon më shumë kohë duke analizuar ose lexuar kodin që të tjerët e shkruajnë.

Diferenca në mes të një programeri të menqur dhe ati profesional është që, i menquri mund të mbaj në mend shumë gjëra.

p.sh Ai e din që variabla **r** në klasën **Processor** e përmban vlerën e **url path**, por nëse një programer tjetër dëshiron të punoj në atë klasë atëher ai duhet ta pyes programerin e menqur (do e lexoni më poshtë artikullit se pse kjo nuk është mirë).

Ndërsa ai profesionali shpenzon kohë në emërtimin dhe organizimin e kodit që të tjerët ta kenë më të lehtë ta kuptojnë dhe të bëjnë ndryshime.

> Bëhu profesional.    

![Pro coder]({{ "/" | relative_url  }}assets/images/coding-pro.gif)    
    

### Rregullat me shembuj

Sikur në gjuhën që e flasim dhe komunikojmë, ekzistojnë rregulla që të gjithë i mësojmë në shkollë.

Në programim këto rregulla askush nuk të shtynë ti mësosh, por mundësia për të u pranuar në një punë është më e madhe nëse i mëson këto rregulla.

Nuk do ti listoj të gjitha rregullat por disa më të thjeshta do të mundohem ti shpjegoj me disa pjesë të kodit.

p.sh Jeni duke punuar në një API dhe doni të ktheni të gjitha blerjet të listuara.

```php

class OrdersController {
//Emri i klasës duhet të jetë i përshkueshëm në nivelin ku
//programeri i radhës kur e sheh klasën e kupton se çfar pune bën pa e hapur atë.
//GetOrdersWithFiltersController do të ishte më e përshkrueshme
// ose GetFilteredOrdersController
	

	public function get(Request $request) : Response {
        
        if (!$this->auth->getUser()->isAuthenticated()) {
            //Në këtë rast thehet rregulli ku metoda ka njohuri 
            //se çka përmban getUser()
            //idealisht duhet të duket si në vijim
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
        //RequestFiltersFactory::create($request->getParams())
        
        
        if (!in_array($filters['order_direction'], ['asc', 'desc'])) {
        //asc dhe desc duhesh ti deklarosh si konstante 
        //apo ti fusesh mbrenda objektit / DTO objektit qe e kemi përmendur më lartë
        
            throw new SortingIsNotSupported();
        }
        
        $list = $this->orders->findAll($filters);
        //Emertimi i variablës në këtë rast nuk është aq i vetë shpjegueshëm
        //$filteredOrders do të ishte më e përshkrueshme ose
        //$orders është e mjaftueshme
		
        $isPagination = str_contains('/count', $request->getUri()->getPath());
        //Në këtë rresht kjo metodë po qaset në path për ta gjetur nëse 
        //egziston /count në url
        //por kjo është një shtresë më e thellë e aplikacionit prandaj 
        //edhe kjo e then rregullin që metoda duhet të qaset gjithmonë në të njejtën shtresë
        //$request->isPaginated()
        
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


Nëse projekti me të cilin po punoni përmban 8000 rreshta kodi.

Le të supozojmë se ju do të punoni në atë kompani për 1 vit = 230 ditë pune.

Nëse çdo ditë përpiqeni të përmirësoni projektin për vetëm 0.43% në ditë, kjo bën 34 rreshta në ditë.

Në fund të vitit ju do të ndryshoni plotësisht kodin në atë projekt.

Në fillim kur të vendosni të zbatoni rregullat në kodin që po shkruani do të jetë më e vështirë sepse po mbillni shprehi të reja, por kjo do të ndryshojë në mënyrë lineare, pas disa muajsh nuk do të duhet të mendoni aq shumë.        


 
### Efekti brenda ekipit

* Ju dhe ekipi juaj do të shpenzoni 70% të kohës tuaj duke lexuar kodin dhe jo duke shkruar, për të shkruar kod duhet të lexoni.
* Puna e të gjithë ekipit do të lehtësohet nëse dakordoheni të aplikoni rregullat.
* Ju do të jeni pika qendrore që të gjithë do të referohen për pyetje ose këshilla.
* Çdo ekip do të dëshirojë që ju të jeni pjesë e ekipit sepse kjo e bën punën e ekipit më të lehtë kur ata lexojnë lehtësisht kodin tuaj.

Një efekt negativ është se në fillim ndoshta do të hasni në rezistencë nga anëtarët e ekipit, por nëse i paraqisni faktet dhe referencat në libra dhe artikuj, atëherë argumentet mbarojnë.

> Sigurohu që ta lexosh **Mbani mend** në fund të artikullit.


### Efekt afatgjatë

Nëse shefi juaj pyet për sa kohë mund të përfundoni një projekt me x kërkesa.

Ju paraqisni një diagram si më poshtë:

![Diagrami i kohes dhe kompleksitetit]({{ "/" | relative_url  }}assets/images/code-quality.png)    



I shpjegon se nëse doni rezultate të shpejta, pasojat do të jenë më vonë, dhe anasjelltas.

Kjo, përveçse ndikon në të ardhmen e projektit, ndikon edhe ju si programues në dy mënyra:

1. Fuqia e shprehisë
2. Madhësia e projektit

     


#### Fuqia e shprehisë

Ju jeni programuesi që jeni për shkak të shprehive që keni adaptuar me kalimin e kohës.

Prandaj, duhet të jeni shumë të kujdesshëm se çfarë dhe si punoni në fillim të karrierës suaj.

Nëse punoni në projekte ku ju shtyjnë të adaptosh shprehi të kqija sikur

* Thyerja e kodit duke thyer rregullat e përmendura në artikullin e mësipërm
* Injorimi i formateve
* Injorimi i shkrimit të testeve

dhe i bën të gjitha këto pa asnjë përfitim për ty, atëherë duhet të mendoni mirë për atë vend pune.

Duke punuar në këtë mënyrë për një vit, ju do t'i mbillni ato shprehi në memorien ose përvojën tuaj.

Në të ardhmen, nëse doni të aplikoni në një kompani më të mirë, atëherë duhet të harroni shprehitë e këqija dhe të mësoni shprehi të mira.     

Pra, siç mund ta shihni që nuk ka asnjë përfitim për ju si programues nga ajo kompani, duhet të mendoni gjithmonë në të ardhmen se çfarë përfitimesh do të mbeten për ju si programues.

Dikush zgjedh të sakrifikojë standardet për një përfitim që është më i vlefshëm se cilësia e kodit dhe kjo nuk është një zgjedhje e gabuar.    


#### Madhësia e projektit

Nëse vendosni për të mos i aplikuar formatet dhe rregullat e përmendura në projekt, atëherë pas një viti projekti për të cilin po punoni do të bëhet aq i madh sa nuk mund të përballoni të punoni vetëm me të.

Shefi vendos të punësojë një programues të ri në projekt, por për shkak se nuk arritët ta bindni shefin për kodin e pastër, vendosët të mos ndiqni standardet dhe pa teste, programuesi i ri e ka shumë të vështirë të mësojë dhe të kontribuojë në projekt.

Prandaj koha juaj tani është e ndarë në dy pjesë,

* Vazhdimi i punës për aplikimin e gjërave të reja në projekt
* Ndihmon programuesin e ri për të kuptuar se çfarë po bëhet në kodin me të cilin po punon.

Pas kësaj i thoni shefit se keni nevojë për një programues me më shumë përvojë, sepse ai nuk po bën shumë punë.

Dhe kështu përfundon deri në dështimin e projektit.

Në fund, ju do të jeni ai që e bëri projektin të dështojë, sepse jeni ai që shkroi kodin, dhe shefi juaj ju pushon nga puna dhe ia jep punën një programuesi më me përvojë.

Përfitimi i vetëm që keni marrë nga ai vend pune është përvoja se si një projekt dështon.      
      

### Aplikimi i rregullave

Për të aplikuar të gjitha rregullat, një shprehi e mirë është kur jeni duke shkruar kod, përpiquni t'i shpjegoni vetes me fjalë se çfarë po bën ky kod.

Mundohuni ta adaptoni këtë mentalitet

1. Shkruani kodin për ta bërë atë të funksionojë
2. Shkruani disa teste që ju lejojnë të ndryshoni kodin pa prishur funksionalitetin
3. Fillon me riemërtimin e metodave dhe klasave
4. Fillon ndarjen e klasave në klasa të veçanta
5. Ndarja e metodave që përmbajtja të është më e lexueshme.
6. E lexon disa herë
7. Kthehuni në hapin 3.
8. Nëse mendoni se gjithçka është në rregull, atëherë vazhdoni.      


### Automatizimi i rregullave

Ka disa vegla që ju ndihmojnë dhe ju tregojnë nëse keni probleme me standarde të ndryshme në kod.

Por në një pikë veglat nuk mund ta rishkruajnë kodin për ty.

Veglat:
1. [https://phpstan.org/try](https://phpstan.org/try)
2. [https://www.npmjs.com/package/phplint](https://www.npmjs.com/package/phplint)
3. [snyk.io](https://snyk.io/lp/snyk-code-checker/?utm_medium=Paid-Search&utm_source=google&utm_campaign=nb_lg_snyk-code&utm_content=code_analysis&utm_term=code%20analysis%20tools&gclid=CjwKCAjw5s6WBhA4EiwACGncZWBRlgUwVS6fGws6nsb3dD1yQZ0iCzuN5neSZZEiM3UhbXxzl7SeJBoCf5AQAvD_BwE)
4. [https://www.sonarqube.org/](https://www.sonarqube.org/)    
5. [https://phpinsights.com/](https://phpinsights.com/)


       
### Përfundim

Në librin “Clean Code – R. Martin” ka një rregull interesant që më ka mbetur në mendje dhe është si më poshtë, “Lëre kodin ku po punon pak më mirë se sa e gjete”.

Pra, përmbledhja e të gjithë tekstit në këtë artikull flet për kodin e pastër.
Nëse shkruani kod të pastër, je ti që përfiton nga përvoja dhe je ai që përfiton nga zakonet e mira që do t'ju shtyjnë përpara në karrierën tuaj.

Fillimi nuk është i lehtë për të shkruar kod të pastër, por pas ca kohësh do të bëhet intuitive.

Nëse dikush tjetër do ta lexojë atë klasë ose funksion që keni shkruar, ai do të jetë mirënjohës sepse ju keni kursyer kohën e tyre.
     
Mos e merrni kodin e pastër si rregull dhe ndiqni atë pa u menduar, përdorni intuitën tuaj dhe konsiderojeni atë si një rrugë që ju bën të mendoni për atë që shkruani në një këndvështrim unik.         

#### Mbani mend 🧠
Duhet të komunikoni gjithmonë me ekipin dhe kolegët, të arrini në një përfundim së bashku, në fund të fundit, ju jeni një ekip dhe që një ekip të funksionojë, komunikimi duhet të jetë i rëndësishëm.

