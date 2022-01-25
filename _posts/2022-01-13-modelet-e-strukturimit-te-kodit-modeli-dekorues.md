---
title:  "Si ta përdorim modelin dekorues (eng. Decorator Pattern) për menagjim më të mirë të kodit."
date:   2021-12-31 08:15:20
description: "Modelet e strukturimit të kodit, Modeli dekorues"
tags: Design Patterns Decorator
author: diarselimi
archive: true
---

Modelet e dizajnimit të kodit janë një mënyr shum e mirë për të përmirsuar menagjimin e kodit dhe për të zvogëluar numrin e gabimeve(eng. bugs).
Njëra nga modelet më të përdorura është modeli Dekorues, i cili të mundëson që të shtojmë logjikë në në objekt pa e ndryshuar implementimin origjinal të objektit.

Qëllimi i këtij artikulli është që të shpjegoj se si përdoret ky model dhe si të aplikohet në dizajn.
Gjithashtu do të marr disa shembuj se si aplikohet në kod që të kuptohet më lehtë në mënyr që ti ta aplikosh në projektin tënd. Hajde ti hijmë punës.


### Definicioni
Modeli dekorues është ashtu si edhe tingëllon, është një model ose klasë që e dekoron një objekt pa patur nevojë të bëjmë ndryshime në klasën egzistuese.  
Ky model bën pjesë në kategorinë e modeleve te strukturimit të kodit.


### Qellimi
Pse duhet të përdorim këtë model dhe çfar problemi na mundëson që të zgjedhim.
Disa nga opcionet ku mund ta përdorim këtë model jan:
1. Nëse klasa egzistuese ka nevoj të përdoret edhe pse kemi nevoj për ndryshim të logjikës.
2. Nëse kodi i vjetër dhe kemi nevoj që ta ndryshojmë se si objekti sillet ose jep rezultat.


### Aplikimi
Ta marrim shembull qe dojme ta krijojme një program do të automatizoj shtuarjen e ekstrave në një piza. 

### UML Diagrami
![UML diagrami i modelit strategji](../assets/diagrams/decorator_pattern.png)

![Diagrami i huazuar nga wikipedia](../assets/diagrams/wikipedia_decorator_pattern.jpg)

### Shembulli
Ta zëmë që e kemi një pizeri dhe dëshirojmë ta automatizojmë pjesën ku dëshirojmë të shtojmë ekstra shtesa në piza.
P.SH nëse dojmë të shtojmë djathë, këpurdha, sallatë etj.
Tash varet se cka 

### Shembull se si nuk duhet aplikuar

```php

$userAskedFor = ['cheese', 'mushrooms'];

interface Topping {
  public function add(): void;
}

class DefaultTopping implements Topping 
{ 
  public function add(): void 
  {
    echo "Adding Default toppings <br>";
  }
}

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

$toppings = new DefaultTopping();

if (in_array('cheese', $userAskedFor)) {
  $toppings = new CheeseTopping($toppings);
}

if (in_array('mushrooms', $userAskedFor)) {
  $toppings = new MushroomTopping($toppings);
}

$toppings->add();

/**
---------------- OUTPUT 

Adding Default toppings
Adding Cheese
Adding Mushrooms

*/
```

--- english  AI

### How to Use Decorator Pattern in Design Patterns for Better Code Management.
Design patterns can be a great way to improve code management and reduce the number of bugs and errors. One of the most popular patterns is the decorator pattern, which enables you to add new functionality to an object without changing its original code. This article will introduce you to this pattern and some of its uses in designing coding. It will also provide some examples that give a better understanding on how this pattern might work in your own project. So what are you waiting for? Let’s dive right in!


What Is the Decorator Pattern?
The decorator pattern is a software design pattern, which can be applied to objects at runtime. It was first introduced by the “Gang of Four” in their book “Design Patterns: Elements of Reusable Object-Oriented Software.” The intent of this design pattern is to extend existing functionality without modifying the original code. It allows for new functionality to be added without having to change the code or interface of the original object. This way, it’s really easy to create your own customized features without altering any other part of the program.


When to Use the Decorator Pattern
The decorator pattern is a powerful tool for code management. It allows you to add new functionality to an object without changing its original code. You can think of it as a way to wrap objects or classes with other objects or classes.

Decorators are often used in the following cases:

- Adding logging and debugging information to an object

- Adding validation and error checking

- Adding specific routing rules for a URL

- Supervising the lifetime of your application

The Decorator Pattern is most useful when you need to wrap objects or classes with other objects or classes that provide different behavior. One such case is when you need to add logging and debugging information to an object like this:

public class Car { } // This is our basic car class.    // Now imagine we want to use the decorator pattern on this car object, so we can log it's activity by adding a Decorator public class LoggerCarDecorator extends Car{ public LoggerCarDecorator(Car original){ super(original); } @Override public void stop() { System.out.println("Stopped"); } @Override public void start() { System.out.println("Started"); } } // We can now create a new instance of LoggerCarDecorator with the constructor Car newLoggerCar = new LoggerCarDecorator(new Car()); newLoggerCar.start();// "Started" would be


The Implementation of the Decorator Pattern
This pattern is often used in cases where you need to add new functionality to an object without changing its code. For example, let's say you have a function that calculates the area of a triangle. You might want to use this function to calculate the area of other shapes too, but don't know how to do it.

One way would be to use inheritance, using a base class for calculating areas and another class inheriting from it for other shapes. Though this is possible, there are cases when you just want to add functionality without modifying the original code. This is where decorators come in handy.

A decorator derives from the same class as the object being decorated and adds its own functionality by overriding or wrapping other methods. You can then 'decorate' any object with this decoration by calling the constructor of your decorator class with the original object as an argument.


Example of the Decorator Pattern in Code
The following example demonstrates how the decorator pattern can be used.



public class Car { public void Drive() { Console.WriteLine("Car is driving"); } }

public class SportsCar : Car { public override void Drive() { Console.WriteLine("Sports car is driving"); } }

public class Limousine : Car { public override void Drive() { Console.WriteLine("Limousine is driving"); } }

public class Van : Car { public override void Drive() { Console.WriteLine("Van is driving"); } }

var cars = new List


Conclusion
The decorator pattern is a powerful software design pattern that allows you to add functionality to an existing class without having to subclass the original class and create a new instance.

The power of this pattern lies in the fact that you can extend an existing object and add additional functionality without changing the original code.

It’s a simple and elegant solution that can save time and effort, while still achieving your desired result.

So, next time you need to add functionality to an existing object, why not consider the decorator pattern?
