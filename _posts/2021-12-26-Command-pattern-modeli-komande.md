---
title:  "Modelet e strukturimit të kodit, modeli komandë (eng. Command Pattern)"
date:   2021-12-31 08:15:20
description: "Modelet e strukturimit të kodit, Modeli Komandë"
tags: Design Patterns Command
author: diarselimi
archive: false
---

> Njihet edhe si Veprim (eng. Action), Transakcion (eng. Transaction)  

Modeli Komandë përmbanë të gjitha parametrat e nevojshme për veprimin i cili do të bëhet në një komandë. Prandaj, kjo na lejon që komanda të ekzekutohet  në mënyra të ndryshme.    
  

Perparësitë e modelit komandë:
1. E bën ndarjen e klasës që fillon procesin prej klasës që e kryen punën.
2. Lejon që të bëjmë një grup të komandave të njëpasnjëshme duke na e mundësuar një sistem rradhë pritje (eng. Queue System).
3. Zgjerimi  është i lehtë, mund të bëhet pa u ndryshuar kodi ekzistues. 
4. Mund të definohet sistemi për fshirjen e ndryshimeve (eng. Rollback).   

### Konteksti se ku do ta aplikojmë modelin
Ta zëmë  që jemi në një shitore online, dhe dëshirojmë ta bëjmë një blerje. 
Zgjedhim produktin e fusim në kosh dhe klikojmë në butonin Bli. 
Kjo na drejton në një dritare për të mbushur të dhënat bankare dhe të konfirmojmë blerjen.

### Shembulli konkret i aplikuar në kod
Kodi në një <a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller" target="_blank">MVC</a> kornizë pune (*eng. framework*) sikur <a href="https://symfony.com/" target="_blank"> symfony </a> do të dukej si në vijim.

```php
class CreateOrderController {
    
    public function execute(Request $request) {

        $this->validate($request); //validimi i kërkesës do të bëhet në controller
        $order = $this->createOrder($request);

        if ($this->shouldBeApproved($order)) {
            $this->approve($order);
        }

        $this->orderRepository->create($order);
        $this->integrationBus->send($order); //njofton sistemet tjera që një blerje është bërë 
    }

}
```
Nëse punojmë me një kornizë të punës (eng. Framework) MVC dhe nuk përdorim ndonjë organizim të kodit atëherë nuk do të kemi ndarje aty ku bëhet thirrja e serviseve dhe ku kryhet puna, andaj e gjithë logjika do të vendoset në një klasë të vetme. Prandaj edhe shtimi i logjikës të re ose ndryshimeve nuk do të jetë shumë i lehtë.   

Ndryshimi se si do të ekzekutohet  logjika në këtë rast, do të ishte shumë e vështirë.  
Gjithashtu nëse dëshirojmë ta shtojmë një mekanizëm për kthimin e ekzekutimit që mos të ruajmë të dhënat të përgjysmuara atëherë duhet ti ndryshojmë të gjithë  kontrollerët.
      

### UML Diagrami i modelit Komandë

<img src="{{ "/" | relative_url  }}assets/diagrams/TheCommandPattern.png" alt="UML diagrami i modelit komandë" />

<img src="{{ "/" | relative_url  }}assets/diagrams/Design_Command_Design_Pattern_UML.jpeg" alt="UML diagrami i modelit komandë i huazuar nga wikipedia." />

Klasa që thërret (eng. Invoke) komandat e di  se cilën metodë dhe cilat parametra ti ekzekutojë, por nuk ka dijeni se çka bën ajo metodë.   

P.SH: Nëse e dërgon veturën tek miku yt mekanik, ai nuk mund të bëj asgjë nëse nuk i tregon se çfarë dëshiron ti.

```php
$mechanic = new Mechanic();
$mechanic->replaceWheels('type', 'size', 'model');
```

### Implementimi i modelit komandë
Në shembullin e ardshëm do ta shihni që nëse një kërkesë vjen që ta krijojmë një blerje.  

```php

class CreateOrderCommand implements Command {
    
    private CreateOrderHandler $receiver;
    public function __construct(Receiver $receiver)
    {
        $this->receiver = $receiver;
    }

    //komanda e njeh pranuesin por nuk ka dijeni se cka ben ai.
    public function execute(): void
    {
        $this->receiver
            ->checkMoneyLimit($this->totalAmount())
            ->identifyCompany($this->getComapany())
            ->checkRisk($this->getCustomer())
            ->authorizeOrder($this->getOrder())
        ;
    }
}

//në rastin e mekanikut kjo klasë do ta luaj rolin e ndërmjetsuesit në mes teje dhe mekanikut.
class CreateOrderInvoker {
    private array $commands = [];
    public function addCommand(Command $command)
    {
        $this->commands[] = $command;
    }

    public function execute(): void
    {
        foreach ($this->commands as $command) {
            $command->execute();
        }

        $this->dispatchIntegrationMessages(); 
    }

//kjo i dërgon mesazhet për të njoftuar sistemet tjera që një blerje është bërë.
    private function dispatchIntegrationMessages(): void 
    {
        $this->bus->dispatch(new OrderCreated($order));
    }
}

//kontrolleri do te duket si ne vijim.
class CreateOrderController 
{
    private CreateOrderHandler $createOrderHandler;
    private CreateOrderInvoker $invoker;
    public function __construct(CreateOrderHandler $createOrderHandler, CreateOrderInvoker $invoker)
    {
        $this->createOrderHandler = $createOrderHandler;
        $this->invoker = $invoker;
    }

    public function execute(Request $request)
    {
        $command = new CreateOrderCommand($this->createOrderHandler, $request);
        
        $this->invoker
        ->addCommand($command)
        ->execute();

        //ose
        //->addCommand($createOrderCommand)
        //->addCommand($confirmOrderCommand)
        //->queue();
    }
}

```
Siç shihet në shembull,  komandat mund të shtohen njëra pas tjetrës. , Mënyra se si do të ekzekutohen  ato mund të përmbaj logjikë specifike dhe nëse diçka shkon gabim atëherë mund të vendoset një mekanizëm që i kthen ndryshimet e prezentuara  (eng. Rollback).    


Nëse duam  të shtojmë komanda të reja atëherë nuk ka nevojë që ta ndryshojmë kodin ekzistues, gjë që i mbështetë principet solid.


### Vështiresit që ka ky model
Shumë klasa duhet të inkuadrohen në procese që të kryhet një komandë, andaj edhe duhet të punohet me kujdes të shtuar duke menduar mirë se çfarë klasa shtohen. Sygjeroj që nëse përdorni DDD (eng. Domain Driven Design) atëherë ky model do të jetë më natyral në projektin tuaj.    


Sugjerohet  në disa libra që edhe komanda prej kërkesës (eng. Query) të jetë e ndarë. Komanda nuk duhet të kthej rezultat ndërsa kërkesa është që të kthej rezultat. Ky term është propozuar nga autori  <a href="https://www.amazon.com/gp/product/0136291554/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0136291554&linkCode=as2&tag=martinfowlerc-20" target="_blank"> Bertrand Meyer në librin e tij</a>.  


> “Secili mundet me shkru kod që kompjuteri e kupton. Programerat e mirë shkruajnë kod që të tjerët e kutojnë.” – Martin Fowler


