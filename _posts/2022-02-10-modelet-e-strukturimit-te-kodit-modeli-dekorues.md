---
title:  "Si ta përdorim modelin dekorues (eng. Decorator Pattern)."
date:   2022-02-10 17:03:20
description: "Modelet e strukturimit të kodit, Modeli dekorues, për menagjim më të mirë të kodit."
tags: Design Patterns Decorator
author: diarselimi
archive: false
---

Modelet e dizajnimit të kodit janë një mënyrë shumë e mirë për të përmirësuar  menagjimin e kodit dhe për të zvogëluar numrin e gabimeve(eng. bugs).
Njëra nga modelet më të përdorura është modeli Dekorues, i cili mundëson që të shtojmë logjikë në një objekt pa e ndryshuar implementimin origjinal të objektit.

Qëllimi i këtij artikulli është të shpjegojë  se si përdoret ky model dhe si të aplikohet në dizajn. Gjithashtu do të marr disa shembuj se si aplikohet në kod që të kuptohet më lehtë në mënyrë që ti ta aplikosh në projektin tënd.

### Definicioni

Modeli dekorues është ashtu edhe si tingëllon, është një model ose klasë që e dekoron një objekt pa pasur  nevojë të bëjmë ndryshime në klasën ekzistuese. 

Ky model bën pjesë në kategorinë] e modeleve të strukturimit të kodit.

### Qëllimi 

Pse duhet të përdorim këtë model dhe çfarë problemi na mundësonë që të zgjedhim?
Disa nga opsionet ku mund ta përdorim këtë model janë:
Nëse klasa ekzistuese ka nevojë të përdoret edhe pse kemi nevojë për ndryshim të logjikës.
Nëse dëshirojmë të shtojmë validim të inputit ose menaxhim të problemeve.
Nëse kodi i vjetër e përdor logjikën që ekziston dhe kemi nevojë  që ta ndryshojmë atë në varësi se si objekti sillet ose jep rezultat.
Shtimi i logjikës së regjistrimit ose raportit (eng. Logging)

### UML Diagrami
![UML diagrami i modelit strategji](../../assets/diagrams/decorator_pattern.png)

![Diagrami i huazuar nga wikipedia](../../assets/diagrams/wikipedia_decorator_pattern.jpg)


### Shembulli
Ta zëmë që e kemi një piceri  dhe dëshirojmë ta automatizojmë pjesën ku dëshirojmë të shtojmë ekstra shtesa në pica. P.SH nëse duam të shtojmë djathë, këpurdha, sallatë etj.

### Shembull se si duhet aplikuar

```php

$userAskedFor = ['cheese', 'mushrooms'];

//tipi
interface Topping {
  public function add(): void;
}

//shtesa e parë
class DefaultTopping implements Topping 
{ 
  public function add(): void 
  {
    echo "Adding Spices and Ketchup <br>";
  }
}

//shtesa e dytë
class TomatoTopping implements Topping
{
  private Topping $topping;
  
  public function __construct(Topping $topping) {
    $this->topping = $topping;  
  }
  
  public function add(): void
  {
    echo $this->topping->add() . ' Adding Tomatoes <br>'; 
  }
}

//shtesa e tretë
class CheeseTopping implements Topping
{
  private Topping $topping;
  
  public function __construct(Topping $topping) {
    $this->topping = $topping;  
  }
  
  public function add(): void
  {
    echo $this->topping->add() . ' Adding Cheese <br>'; 
  }
}

//shtesa e katërt
class MushroomTopping implements Topping
{
  private Topping $topping;
  
  public function __construct(Topping $topping) {
    $this->topping = $topping;  
  }
  
  public function add(): void
  {
    echo $this->topping->add() . ' Adding Mushrooms <br>';  
  }
}

//implementimi në klient
$toppings = new DefaultTopping();

if (in_array('cheese', $userAskedFor)) {
  $toppings = new CheeseTopping($toppings);
}

if (in_array('mushrooms', $userAskedFor)) {
  $toppings = new MushroomTopping($toppings);
}

$toppings->add();

/**
---------------- REZULTATI

Adding Spices and Ketchup
Adding Cheese
Adding Mushrooms

*/
```

Ky është një shembull tjetër i marrur nga interneti ku implementimi i klasës Car është aplikuar, pastaj kanë ardhur veturat e tjera si veturë sportive, limuzinë etj.

```java
public class Car { public void Drive() { Console.WriteLine("Car is driving"); } }

public class SportsCar : Car { public override void Drive() { Console.WriteLine("Sports car is driving"); } }

public class Limousine : Car { public override void Drive() { Console.WriteLine("Limousine is driving"); } }

public class Van : Car { public override void Drive() { Console.WriteLine("Van is driving"); } }

var cars = new List
```

### Përmbledhja

Modeli dekorues të mundësonë ta shtojmë  logjikën  në objektet ekzistuese, pa pasur nevojë ta ndryshosh objektin ekzistues. Është zgjidhje e lehtë dhe elegante, nuk humb  kohë për të menduar  për zgjidhje të  tjera sepse identifikohet shumë lehtë se ku aplikohet.   

Pra herën tjetër kur të shtoshë  logjikë në një klasë, mendo për modelin dekorues edhe shikoje se a mund ta aplikosh.
Një nga këshillat për të pasur kod më të organizuar dhe më të qartësuar është që kodi të mbahet i vogël dhe i ndarë në klasa dhe metoda adekuate. Emërtimi të jetë i thjeshtë dhe me kuptim të plotë.   

P.SH Nëse një klasë jep si rezultat shumën e dy numrave, është më mirë ta quajmë shumëzuesi sesa Kalkulatori sepse kalkulatori përmbanë më shumë se një logjikë, andaj për ta kuptuar se çfarë kryen ajo klasë duhet ta hapim kodin dhe të shohim.

[Ja një libër shum i mirë ku autori dhe disa nga krijuesit e gjuhëve programuese c# kanë shprehur mendim në këtë libër.](https://www.amazon.de/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882/ref=sr_1_1?adgrpid=1195169790325301&hvadid=74698212755372&hvbmt=be&hvdev=c&hvlocphy=127338&hvnetw=o&hvqmt=e&hvtargid=kwd-74698309079548%3Aloc-72&hydadcr=3707_1873341&keywords=clean+coding&qid=1643633753&sr=8-1)

