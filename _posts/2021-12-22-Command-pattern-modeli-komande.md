---
title:  "Modelet e strukturimit te kodit, Modeli Komande"
date:   2021-11-17 08:15:20
description: "Modelet e strukturimit te kodit, Modeli Komande"
tags: Design Patterns, Command
author: "diar"
archive: true
---

### Modeli Komande (eng. Command Pattern)

Njihet edhe si: Veprim (eng. Action), Transakcion (eng. Transaction)

Modeli Komande permbane te gjitha parametrat e nevojshme per veprimin i cili do te behet ne nje komande.
Prandaj kjo na lejon qe komanda te egzekutohet ne menyra te ndryshme.

Perparsit e modelit komande:
1. E ben ndarjen e klases qe fillon procesin prej klases qe e kryen punen.
2. Lejon qe te bejme nje group te komandave njepasnjeshme duke na e mundesuar nje sistem radhë pritje (eng. Queue System).
3. Zgjerimi eshte i lehte, mund te behet pa u ndryshuar kodi egzistues.
4. Mund te definohet sistemi per fshirjen e ndryshimeve (eng. Rollback).


### Shembull konkret
Ta zejme qe jemi ne nje shitore online, dhe deshirojm ta bejme nje blerje.
Zgjedhim produktin e fusim ne kosh dhe klikojm ne butonin Bli.
Kjo na drejton ne nje dritare per te marrur te dhenat bankare dhe te konfirmojm blerjen.

### Shembulli konkret i aplikuar ne kod
Kodi ne nje MVC framework sikur symfony do te dukej si ne vijim.

```php
class CreateOrderController {
    
    public function execute(Request $request) {

        $this->validate($request); //validimi i requestit do te behet ne controller
        $order = $this->createOrder($request);

        if ($this->shouldBeApproved($order)) {
            $this->approve($order);
        }

        $this->orderRepository->create($order);
        $this->integrationBus->send($order); //njofton sistemet tjera qe blerja u krijua
    }

}
```
Nese punojme me mvc dhe nuk perdorim ndonje organizim te kodit ateher nuk do te kemi ndarje se ku behet thirrja e serviseve dhe ku kryhet puna.
Nuk mund ti grupojme ose egzekutojme disa pune radhazi, shembull nese nje `order` mund ta krijojme ku na duhet ta konfirmojme menjehere ateher duhet te vendosim kushte ne kontroller ose ta krijojme nje servis tjeter qe e ben krijimin e nje `order` pa pritur per konfirmimin e saj.
Nese dojm ta shtojme nje mekanizem per kthimin e egzekutimit qe mos te ruajme te dhenat te gjysmuara ateher duhet ti ndryshojme te gjitha kontrolleret.


### UML Diagrami i modelit Komande.
<img src="{{ "/" | relative_url  }}assets/diagrams/TheCommandPattern.png" alt="UML diagrami i modelit komande" />

Klasa qe therret(eng. Invoke) komandat ajo e din se cilen metode me cilat parametra ta egzekutoj, por nuk ka dijeni se cka ben ajo metode.


### Implementimi i modelit komande
Ne shembullin e ardshem do ta shihni se nese nje kerkese vjen qe ta krijojme nje order  

```php

class CreateOrderCommand implements Command {
    
    private CreateOrderHandler $receiver;
    public function __construct(Receiver $receiver)
    {
        $this->receiver = $receiver;
    }
    //some properties

    // the command knows the receiver AND knows what the methods need but doesnt know what they do.
    public function execute(): void
    {
        $this->receiver->checkMoneyLimit($this->totalAmount());
        $this->receiver->identifyCompany($this->getComapany());
        $this->receiver->checkRisk($this->getCustomer());
        $this->receiver->authorizeOrder($this->getOrder())
    }
}

class CreateOrderHandler implements CommandHandler {
    public function authorizeOrder(Order $order)
    {
        //...
    }

    //...
}

class CreateOrderInvoker {
    private array $commands = [];
    public function addCommand(Command $command)
    {
        $this->commands[] = $command;
    }

    public function execute(): void
    {
        $this->db->beginTransaction(); //transaction for rollback support
        try {
            foreach ($this->commands as $command) {
                $command->execute();
            }
        } catch (Exception $e) {
            $this->db->rollback();
            throw $e;
        }

        $this->db->commit();
        $this->dispatchIntegrationMessages(); 
    }

    private function dispatchIntegrationMessages(): void //integration messages after everything went well.
    {
        $this->bus->dispatch(new OrderCreated($order));
    }
}

//the controller would look like this.
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

Pasi qe gjithqka shkon ne rregull ateher ne commit i ruajm tedhenat dhe i dergojm mesazhet ne aplikacionet tjera.
Nese e marrim shbullin e mehershem te kodit ateher per ta prezentuar kete ndryshim duhet te gjitha controlleret ose usecases ti ndryshojme e cila e then rregullin e <a href="">principit te dyte</a>.  
&nbsp;

Per ta bere te mundur qe ti ndryshojme se si komandat ruhen ose egzekutohen, dhe kjo arrihet duke e bere i treguar komandes se cilat metoda egzistojne tek pranuesi.  

### Implementimi me modelin komande.

Pra secila komande e njeh pranuesin
P.SH

