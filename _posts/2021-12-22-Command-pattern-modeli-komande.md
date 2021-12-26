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

Komanda eshte nje model i sjelljes i cili e kthen kerkesen ne nje objekt ku i ka te gjitha informatat rreth kerkeses. Ky transformim te lejon qe te i passon kerkasat si argumente ne metode, mund te vendoset ne radhe per tu egzekutuar.

Komanda eshte nje metode shum e perdorur ne aplikacion te ndryshme, sepse e mundeson qe nje komand te egzekutohet ne mbrapavije perderisa perdoruesi nuk eshte duke pritur per nje rezultat.


### Shembull konkret
//billie example.
Ta zejme qe kemi nje aplikacion ku jep mundsi me u perdor si metode per pagese nga dyqanet e ndryshme.
Tash na si metode per pagese kur shitorja na jep te dhenat se kush eshte duke blere edhe cka eshte duke blere, ne e bejme nje vlersim dhe ju pergjigjemi me nje response.

Tash Shitorja perpara se me na shfaq neve sikur nje opcion per pagese, duhet te na pyes se a jemi ne gjendje me be pagese, kjo behet permes nje thirrje ne API `/initiate`.

Pastaj ata na e dergojn nje thirrje ne API ku na japin te gjihta te dhenat qe neve na nevoiten, kjo thirrje behete ne `/autorizimi`

Pastaj nje tjeter thirrje duhet te dergohet nga shitorja per ta konfirmuar qe kjo blerje eshte approvuar nga bleresi.
Kjo thirrje behet ne `/konfirmo`.

Te fokusohemi ne thirrje e `/autorizimi`, me posht eshte nje UML diagram ku eshte e bere me shembullin konkret.



### Diagrami i modelit Komande.
<img src="{{ "/" | relative_url  }}assets/diagrams/TheCommandPattern.png" alt="UML diagrami i modelit komande" />

Klasa qe therret(eng. Invoke) komandat ajo e din se cilen metode me cilat parametra ta egzekutoj, por nuk ka dijeni se cka ben ajo metode.


### Implementimi pa modelin komande.
Ne shembullin e ardshem do ta shihni se nese nje kerkese vjen qe ta krijojme nje order, 

```php

class CreateOrderUseCase
{
    OrderRepository $orderRepository;
    RiskChecker $riskChecker;
    MessageBus $messageBus;
    public function __construct(OrderRepository $order, RiskCheckService $riskCheckService, MessageBus $messageBus)
    {
        $this->orderRepository = $order;
        $this->riskChecker = $riskCheckService;
        $this->messageBus = $messageBus;
    }

    public function execute(CreateOrderCommand $command)
    {
        $order = new Order();
        $order->setCustomer($command->getCustomer());
        $order->setProduct($command->getProduct());
        $order->setQuantity($command->getQuantity());
        $order->setPrice($command->getPrice());
        $order->setTotal($command->getTotal());
        $order->setStatus(OrderStatus::PENDING);

        $this->riskCheckService->check($order);

        $this->orderRepository->save($order);

        $this->messageBus->send(new OrderCreated($order));
    }
}

class CreateOrderController 
{
    CreateOrderUseCase $createOrderUseCase;
    public function __construct(CreateOrderUseCase $createOrderUseCase)
    {
        $this->createOrderUseCase = $createOrderUseCase;
    }

    public function create(Request $request)
    {
        $command = $this->validateRequest($request);
        $this->createOrderUseCase->execute($command);
    }

    private function validateRequest(Request $request) {
        //...
        //...
        return $command;
    }
}

// Te gjitha kontrolleret permbajne pothuajse permbajtjen e njejte.
class UpdateOrderController {}
class DeleteOrderController {}
class GetOrderController {}
class CreateInvoiceController {}
class ConfirmOrderController {}
//...
    
```

Pastaj le te themi se dojm ta ndryshojme se si i ruajme te dhenat ose si i dergojm mesazhet.  

&nbsp;

Tani pasi aplikacioni yne komunikon me aplikacione te tjera nuk dojme qe te dergojm mesazhe ne aplikacionet tjera nese nuk ka shkuar gjithqka ne rretull ne aplikacionin tone.  
&nbsp;

Zgjidhja do te jet qe ta bejme komanden qe te ruaj te dhenat me transaksion.  
&nbsp;

P.SH 

```php
class DbTransactionExecutor
{
    public functin __construct(CommandHandlerLocator $locator, MessageBus $messageBus)
    {
        $this->locator = $locator;
        $this->messageBus = $messageBus;
    }

    public function execute(Command $command)
    {
        $handler = $this->locator->getHandler($command);
        $connection = new PDO('mysql:host=localhost;dbname=my_db', 'root', 'root');
        $connection->beginTransaction();
        try {
            $handler->execute($command);
            $connection->commit();
        } catch (Exception $e) {
            $connection->rollback();
            throw $e;
        }

        $this->messageBus->send(new OrderCreated($order));
    }
}

class CommandHandlerLocator {
    private array $commandHandlers = [
        CreateOrderCommand::class => CreateOrderHandler::class,
        UpdateOrderCommand::class => UpdateOrderHandler::class,
        DeleteOrderCommand::class => DeleteOrderHandler::class,
        GetOrderCommand::class => GetOrderHandler::class,
        CreateInvoiceCommand::class => CreateInvoiceHandler::class,
        ConfirmOrderCommand::class => ConfirmOrderHandler::class,
    ];

    public function __construct(array $commandHandlers)
    {
        array_merge($this->commandHandlers, $commandHandlers);
    }

    public function getHandlerFor(Command $command)
    {
        return $this->commandHandlers[get_class($command)];
    }
}

class CreateOrderController 
{
    DbTransactionExecutor $dbTransactionExecutor;
    public function __construct(DbTransactionExecutor $transactionExecutor)
    {
        $this->createOrderUseCase = $transactionExecutor;
    }

    public function create(Request $request)
    {
        $command = $this->validateRequest($request);
        $this->dbTransactionExecutor->execute($command); //ky eshte ndryshimi ne te gjitha kontrolleret.
    }

    private function validateRequest(Request $request) {
        //...
        //...
        return $command;
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

//the controller would look like this.
class CreateOrderController 
{
    private CreateOrderHandler $createOrderHandler;
    private CommandExecutor $commandExecutor;
    public function __construct(CreateOrderHandler $createOrderHandler, CommandExecutor $dbTransactionCommandExecutor)
    {
        $this->createOrderHandler = $createOrderHandler;
        $this->commandExecutor = $dbTransactionCommandExecutor;
    }

    public function execute(Request $request)
    {
        $command = new CreateOrderCommand($this->createOrderHandler, $request);
        $this->commandExecutor->execute($command);
    }
}

```