---
title:  "Principet S.O.L.I.D dhe si të aplikojmë ato në kod"
date:   2021-11-17 08:15:20
description: Krijoni një bazë të fortë në programim duke mësuar SOLID principet.
tags: SOLID, OO, PHP, PROGRAMERAT
profile_image: https://avatars.githubusercontent.com/u/8136247?v=4
author: Diar Selimi
author_github: https://github.com/diarselimi
author_linkedin: diarselimi
author_description: "Coding is an art, if you know what you're doing."
author_title: Senior Backend Engineer
archive: false
---

E pyeta një të afërm timin pse duhet ti mësojmë SOLID principet?
Ja si përgjigjet ai...
> Dallimi në mes amaterëve dhe profesinistëve që kërkohen nga cdo kompani, perfshir: Tesla, Google, Apple, SpaceX etj gjendet tek aplikimi i principeve të ndryshme.

Pasi të lexoni këtë artikull, si dhe të analizoni shembujt që janë në këtë artikull, ju do të kuptoni principet SOLID dhe do të jeni të gatshëm ti aplikoni ato.

Çdo kompani në Gjermani që do të aplikoni si zhvillues softveri, do të ju parashtrojn pytje në intervistë në lidhje me principet SOLID.

Principet SOLID në OO programim do të ndihmojnë shumë në karrierën tuaj si programer.
Do të kesh një bazë stabile për të ecur përpara, pa pasur parasysh produktin që ti e ndërton.

### Prezantimi i problemit
Para se të fillojm, do ta prezantoj problemin që do të punoj gjatë të gjithë shembujve që i marr. 

### Problemi
Të marrim shembull një klient i juaj do të ju kërkoj me zhvillu një aplikacion. Ky aplikacion do ti digjitalizoj porosit në restaurantin e tij _Villa Natyra_ që vetëm bën piza dhe hamburgera.
Ne si programera të mirë që jem ja ndërtojm aplikacionin, tash ai po e përdor dhe është i kënaqur.

Në rregull, masi e kem ndërtu produktin tash hajde të flasim për principet.

### Principi i parë - Një klasë, një përgjegjësi
> Një klasë duhet të këtë vetëm një përgjegjësi dhe një arsyje të ndryshoj.

Një shembull ku ky princip nuk respektohet
```PHP
class Hamburgeri
{
   private string $kategoria;
   private array $shtesat;
   private string $llojiIMishit;
 
   public function __constructor(string $llojiIMishit, array $shtesat)
   {
       $this->kategoria = $this->percaktoKategorine($llojiIMishit);
       $this->shtesat = $shtesat;
       $this->llojiIMishit = $llojiIMishit;
   }
 
   private function përcaktoKategorine(string $llojiIMishit): string
   {
       if (in_array($llojiIMishit, ['file_pule', 'mish_lope'])) {
           return 'zgare';
       }
 
       return 'furre';
   }
 
   public function llogaritShumen(): double
   {
       double $shuma = 0;
       foreach($this->shtesat as $shtesa) {
           $shuma += $shtesa->merrQmimin();
       }
 
       return $this->llojiIMishit + $shuma;
   }
 
   public function ruajFakturen(): void
   {
       //ktu ruhet faktura në databazë
   }
}
```

Nëse e kemi një klasë vetëm për hamburgerin edhe kjo klasë pranon shtesa sikur sallatë, domate etj.
Gjithashtu e përcaktojmë kategorinë mbrenda klasës, i ruajm të dhënat në databazë dhe e kalkulojmë shumën.
Atëher kjo klasë do të ndryshoj sa herë që mënyra e ruajtjës në databazë ose mënyra e kalkulimit ose mënyra e përcaktimit të kategorise ndryshojnë.
```PHP
interface Ushqim {}
 
class Hamburgeri implements Ushqim
{
   private const KATEGORIA = 'furre';
   public array $shtesat;
   public string $llojiIMishit;
   public double $shuma;
 
   public function __constructor(string $llojiIMishit, array $shtesat)
   {
       $this->kategoria = $this->percaktoKategorine($llojiIMishit);
       $this->shtesat = $shtesat;
       $this->llojiIMishit = $llojiIMishit;
   }
 
   public function merrKategorine(): string
   {
       return self::KATEGORIA;
   }
}
 
class KalkulatoriUshqimit
{
   public function __constructor(Ushqim $ushqimi){}
 
   public function merrShumen(): double
   {
       return 0.0; //ktu  kalkulohet shuma.
   }
}
 
class RuajtjaFaktures
{
   public function ruaj(Faktura $faktura): void
   {
       $this->save($faktura);
   }
}
 
class Faktura
{
   public function __constructor(Ushqim $ushqimi, double $shuma)
}

```
Kurse këtu siç edhe shihet që i kemi ndarë klasat me përgjegjësi të ndryshme, sa herë që kalkulimi i çmimit ndryshon atëher klasa `KalkulatoriUshqimit` po ashtu ndryshon. 
Nëse vendosim ta ndrrojmë mënyrën se si i ruajmë të dhënat atëher klasa `RuajtjaFaktures` ndryshon.

### Principi i dytë - E hapur për zgjatje, e mbyllur për ndryshime.
> Një klasë duhet të jete e mbyllur për ndryshime ndërsa e hapur për zgjatje.

Ta marrim shembull klasën që i bën kalkulimet `KalkulatoriUshqimit` dhe ta shohim si do të ndryshoj nëse një kërkes e re na vjen, shembull “Po me duhet që për studente çmimi final të dal 20% më lirë”

Tash na si programera pa dijeni për këtë princip “E mbyllur për ndryshime” do ta bëjme një ndryshim si në vijim
```PHP
interface Ushqim {}
 
class KalkulatoriUshqimit
{
   public function merrShumen(Ushqim $ushqim): double
   {
       $shuma = $ushqimi->merrLlojinEMishit()->merrShumen();
       foreach($ushqimi->merrShtesat() as $shtesa) {
           $shuma += $shtesa->merrShumen();
       }
 
       return $shuma;
   }
 
   public function merrShumenPerStudente(Ushqim $ushqim): double
   {
       $shuma = $this->merrShumen($ushqim);
 
       return $shuma - ($shuma * 0.2);
   }
 
}
```
Nëse bëjme diçka si kjo atëher së pari klasa ka jo një arsye por dy për të ndryshuar, që e then edhe principin e parë, shohim që po e kalkulon shumën e ushqimit dhe zbritjen për studenta. 
Tash nëse ndryshon mënyra e kalkulimit të ushqimit ose përqindja për studenta, atëher kjo klasë duhet të modifikohet.

Nëse e konsiderojm Principin e parë, zbritja duhet të jete në një klas ndamas dhe në bazë të principit të dytë, klasa e re mund ta përdor klasën që kalkulon por nuk duhet ta ndryshoj atë.

Si rezultat kemi bërë një ndryshim si në vijim.
```PHP
interface Ushqim {}
 
class KalkulatoriUshqimit
{
   public function merrShumen(Ushqim $ushqim): double
   {
       $shuma = $ushqimi->merrLlojinEMishit()->merrShumen();
       foreach($ushqimi->merrShtesat() as $shtesa) {
           $shuma += $shtesa->merrShumen();
       }
 
       return $shuma;
   }
 
}
 
class KalkulatoriUshqimitPerStudente extends KalkulatoriUshqimit
{
   private const ZBRITJE_NE_PERQINDJE = 0.2;
 
   public function merrShumen(Ushqim $ushqimi): double
   {
       return $this->zbritShumen(parent::merrShumen($ushqimi));
   }
 
   private function zbritShumen(double $shuma): double
   {
       return $shuma - ($shuma * self::ZBRITJE_NE_PERQINDJE);
   }
 
}

```
Siç edhe pe shihni i kemi ndarë përgjegjsit në klasa të ndryshme, tash nëse mënyra e kalkulimit të ushqimit ndryshon atëher do të ndryshoj vetem `KalkulatoriUshqimit` dhe nëse zbritja për student ndryshon atëher do të ndryshoj vetëm klasa `KalkulatoriUshqimitPerStudente`.

### Principi i tretë - Zëvendesimi Liskov
> Ky princip thot që nëse funksioni f(x) punon me objektet e tipit T. Atëher funksioni f(y) duhet të punoj me objektet y të tipit S ku S është nën tip i T.

Ndoshta shembulli që e then këtë princip do ta lehtsoj kuptimin e ketij principi.
```PHP
interface Ushqim {}
 
class KalkulatoriUshqimit
{
   public function merrShumen(Ushqim $ushqim): double
   {
       $shuma = $ushqimi->merrLlojinEMishit()->merrShumen();
       foreach($ushqimi->merrShtesat() as $shtesa) {
           $shuma += $shtesa->merrShumen();
       }
 
       return $shuma;
   }
 
}
 
class KalkulatoriUshqimitPerStudente extends KalkulatoriUshqimit
{
   private const ZBRITJE_NE_PERQINDJE = 0.2;
 
   public function merrShumen(Ushqim $ushqimi): double
   {
       return $this->zbritShumen(parent::merrShumen($ushqimi));
   }
 
   private function zbritShumen(double $shuma): double
   {
       return $shuma - ($shuma * self::ZBRITJE_NE_PERQINDJE);
   }
 
}

```
Kjo pjese e kodit është pjesë e principit të dytë ku e kem zgjatur klasën `KalkulatoriUshqimit`, me këtë ndryshim të metodës `merrShumen` e kemi thyer rregullin e principit të tretë.
Nëse i referohemi definicionit i bjen që e njëjta metodë nuk duhet të kthen vlera të ndryshme edhe pse është klasë tjeter.

Do ta rregullojme këtë klasë si në vijim.
```PHP
interface Ushqim {}
 
class KalkulatoriUshqimit
{
   public function merrShumen(Ushqim $ushqim): double
   {
       $shuma = $ushqimi->merrLlojinEMishit()->merrShumen();
       foreach($ushqimi->merrShtesat() as $shtesa) {
           $shuma += $shtesa->merrShumen();
       }
 
       return $shuma;
   }
 
}
 
class KalkulatoriUshqimitPerStudente extends KalkulatoriUshqimit
{
   private const ZBRITJE_NE_PERQINDJE = 0.2;
 
   public function merrShumenEZbritur(): double
   {
       $this->zbritShumen($this->merrShumen());
   }
 
   private function zbritShumen(double $shuma): double
   {
       return $shuma - ($shuma * self::ZBRITJE_NE_PERQINDJE);
   }
 
}

```
Në vend që ta modifikojm metodën e klasës origjinale, do ta përdorim atë në klasën për studente dhe do të shtojmë metoda në klasën për studente.

### Principi i katert - Ndarja e kontratave
> Një klasë nuk duhet ta implementoj një metodë që nuk i nëvojitet.

Shembull shtesat e ushqimeve, siq e kemi parë me lartë secila shtesë e ka çmimin e vet, po çka nëse kemi shtesa që nuk kushtojn?
Shembull: 
```PHP
interface Ushqim {}
interface Shtesa {
   public function merrShumen(): double;
}
 
class Sallate implements Shtesa {
   public const QMIMI = 0.50;
 
   public function merrShumen() {
       return self::QMIMI;
   }
}
 
class BbqSos implements Shtesa {
   public const QMIMI = 0.20;
 
   public function merrShumen() {
       return self::QMIMI;
   }
}
 
class Ketchup implements Shtesa {
   public const QMIMI = 0.00;
 
   public function merrShumen() {
       return self::QMIMI;
   }
}
 
class Hamburger implements Ushqim {
   private const QMIMI = 2.00;
 
   public function merrQmimin():double
   {
       return self::QMIMI;
   }
}

```
Siç e shohim në shembullin më lart, shtesa  `Ketchup` edhe pse është falas  duhet ta implementoj metodën `merrShumen` dhe kjo nuk e respekton principin e katërt, një klasë nuk duhet ta implementoj një metodë që nuk i nevojitet.

Kështu duhet  ta ndryshojm kodin që ta respektojme principin e katërt.
```PHP
interface Ushqim {}
interface Shtesa {
   public function merrSasine(): int;
}
interface ShtesaMePages implements Shtesa {
   public function merrShumen(): double;
}
 
class Sallate implements ShtesaMePages {
   public const QMIMI = 0.50;
 
   public function merrShumen() {
       return self::QMIMI;
   }
}
 
class Ketchup implements Shtesa {
   private int $sasia = 1;
 
   public function merrSasine(): int
   {
       return $this->sasia;
   }
}
 
class Hamburger implements Ushqim {
   private const QMIMI = 2.00;
 
   public function merrQmimin():double
   {
       return self::QMIMI;
   }
}
 
class KalkulatoriUshqimit
{
   public function merrShumen(Ushqim $ushqim): double
   {
       $shuma = $ushqimi->merrLlojinEMishit()->merrShumen();
       foreach($ushqimi->merrShtesat() as $shtesa) {
           if ($shtesa instanceof ShtesaMePages) {
               $shuma += $shtesa->merrShumen();  
           }
       }
 
       return $shuma;
   }
 
}
```
Ky është një shembull ku ndahet kontrata për shtesat me  çmime dhe ato pa  çmime, për arsye që shtesat pa çmime nuk kan nevoj ta implementojnë metodën `merrQmimin()`.

### Principi i pestë - Inversioni i varësisë
> Një klasë që kryen një punë asnjëherë nuk duhet të varet në mjetin që e përdor por në kontratë.

Një shembull do të ishte ta ruajm fakturen në MySQL databazë si në shembullin në vijim.
E mbani mend si klasa `RuajtjaFaktures` varet direkt në klasën `Databaza` që është edhe implementimi mbrenda.
Tani klasa `RuajtjaFaktures` e then principin e parë sepse nëse e ndryshojme databazën  atëher duhet ta ndryshojm edhe klasën `RuajtjaFaktures`.
```PHP
class Databaza
{
   public function ruaj(Faktura $faktura): void
   {
       $sql = "INSERT into FAKTURAT (val1, val2, val3) VALUES (1,2,3);"
       $this->db->executeSql($sql);
   }
}
 
class RuajtjaFaktures
{
   public function __constructor(Databaza $databaza){}
 
   public function ruaj(Faktura $faktura): void
   {
       $this->databaza->ruaj($faktura);
   }
}
 
class Faktura
{
   public function __constructor(Ushqim $ushqimi, double $shuma)
}
```
Një shembull  që do ta respektonte principin e pestë do të ishte si në vijim.
```PHP
interface Databaza {
   public function ruaj(Faktura $faktura): void;
}
 
class HapsiraRuajtjesSeFakturave implements Databaza
{
   public function ruaj(Faktura $faktura): void
   {
       $sql = "INSERT into FAKTURAT (val1, val2, val3) VALUES (1,2,3);"
       $this->db->executeSql($sql);
   }
}
 
class RuajtjaFaktures
{
   public function __constructor(Databaza $databaza){}
 
   public function ruaj(Faktura $faktura): void
   {
       $this->databaza->ruaj($faktura);
   }
}
 
 
 
class Faktura
{
   public function __constructor(Ushqim $ushqimi, double $shuma)
}

```
Ne këtë shembull e shohim që tani kemi një kontratë `Databaza` dhe një klasë ku gjendet implementimi i ruajtjes së fakturave `HapsiraRuajtjesSeFakturave`, tash nëse vendosim ta ndryshojm databazën në MongoDB, NoSQL ose çkado qoft nuk kemi nevoj ta ndryshojm klasën `RuajtjaFaktures` sepse ajo varet në kontrat e jo në implementim.

### Finalizimi dhe hapat e tjerë
Këto janë pra pesë principet në OO të cilat shikohen në secilën intervistë se sa mirë i ke kuptuar dhe a din si ti përdorni ato.
Hapat e radhës janë: 
Që të provosh ti aplikosh këto principe duhet startuar një projekt të vogël ose edhe në punën ku punon.
Kur e shikon një kod në fillim të merr kohe ti shikosh të gjitha principet, por pas ca kohe bëhet më e leht.
Përserite këtë proces disa here.

Nëse keni ndonjë koment, kritike ose   vetëm don të kemi një bised rreth OO atëher me kontakto në rrjetet sociale.
[Github](https://github.com/diarselimi)



