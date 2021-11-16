---
title:  "Principet S.O.L.I.D dhe si ti aplikojme ne kod"
date:   2021-11-17 09:09:09
description: Mesoni SOLID principet dhe si ti aplikoni ne probleme te ndryshme.
tags: SOLID, OO, PHP, PROGRAMERAT, QYSHME
---
###  Principet S.O.L.I.D dhe si ti aplikojme ne kod

Pasi te keni shpenzuar ca kohe duke lexuar dhe duke menduar rreth shembujve qe merren ne kete artikull, ateher ju do te kuptoni SOLID principet dhe do te jeni te gatshem ti aplikoni ato.

Secila kompani ne Gjermani qe do te aplikoni si programer, do ju pyet ne interviste rreth SOLID principeve.

Principet SOLID ne OO programim do të ndihmojne shumë ne karrierën tuaj si programer.
Do te kesh nje baze te mrekullueshem per te ecur perpara, pa patur parasysh produktin qe ti e nderton.

### Prezantimi i problemit
Para se me fillu, do ta prezantoj problemin qe do te punoj gjat te gjitha shembujve qe do ti shpjegoj. 
Pra do te jete vetem nje projekt dhe do te mundohem ti aplikoj solid principet duke marrur shembuj nga i njejti projekt.

#### Problemi
Ta marrim shembull nje person i familjes po të kerkon me ja ndertu nje aplikacion, ky aplikacion do ti digjitalizon porosit ne restaurantin e tij _Villa Natyra_ qe vetem ben piza dhe hamburgera.

Tash ai po kerkon qe ne _hamburgera_ munden me shtu deri ne pese _shtesa_, gjithashtu edhe ne _pizza_, dhe vetem 2 here mundet me shtu te njejten shtese.

Na si programera te mir qe jem ja ndertojme aplikacionin, tash ai po e perdor dhe eshte i kenaqur.

Ne rregull, masi e kem ndertu produktin tash hajde te flasim per principet.

### Principi i parë - Nje Klase, nje pergjegjësi
> Një klasë duhet të ketë vetëm një përgjegjësi dhe nje arsyje të ndryshoj.

Nje shembull ku ky princip nuk respektohet
```
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
 
   private function percaktoKategorine(string $llojiIMishit): string
   {
       if (in_array($llojiIMishit, ['file_pule', 'pleskavice', 'dyner'])) {
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
       //ktu ruhet faktura ne databaze
   }
}
```

Nëse e kemi një klas vetëm për hamburgerin edhe kjo klasë pranon shtesa sikur sallatë, domate etj.
Gjithashtu e percaktojme kategorine mbrenda klases, i ruajm te dhenat ne databaze dhe e kalkulojme shumen.
Ateher kjo klase do te ndryshoj sa here qe menyra e ruajtjes ne databaze ose menyra e kalkulimit ose menyra e percaktimit te kategorise ndryshojne.
```
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
Kurse ketu sic edhe shihet qe i kemi ndare klasat me pergjegjesi te ndryshme, sa here qe kalkulimi i qmimit ndryshon ateher klasa `KalkulatoriUshqimit` ndryshon. 
Nese vendosim ta ndrrojme menyren se si i ruajme te dhenat ateher klasa `RuajtjaFaktures` ndryshon.

### Principi i dytë - E hapur për zgjatje, e mbyllur per ndryshime.
> Nje klase duhet te jete e mbyllur per ndryshime ndersa e hapur per zgjatje.

Ta marrim shembull klasen qe i ben kalkulimet `KalkulatoriUshqimit` dhe ta shohim si do te ndryshoj nese nje kerkes e re na vjen, shembull “Po me duhet qe per studente qmimi final te dale 20% me lire”

Tash na si programera pa dijeni per kete princip “E mbyllur per ndryshime” do ta bejme nje ndryshim si ne vijim
```
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
Nese bejme dicka si kjo ateher se pari klasa ka jo nje arsye por dy per te ndryshuar, qe e then edhe principin e pare, shohim qe po e kalkulon shumen e ushqimit dhe zbritjen per studenta. 
Tash nese ndryshon menyra e kalkulimit te ushqimit ose perqindja per studenta, ateher kjo klase duhet te modifikohet.

Nese i konsiderojm Principin e pare, zbritja duhet te jete ne nje klas ndamas dhe ne baze te principit te dyte, klasa e re mund ta perdor klasen qe kalkulon por nuk duhet ta ndryshoj ate.

Si rezultat kemi bere nje ndryshim si ne vijim.
```
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
Sic edhe pe shihni i kemi ndare pergjegjsite ne klasa te ndryshme, tash nese menyra e kalkulimit te ushqimit ndryshone ateher do te ndryshoje vetem `KalkulatoriUshqimit` dhe nese zbritja per student ndryshon ateher do te ndryshoj vetem klasa `KalkulatoriUshqimitPerStudente`.

### Principi i trete - Zevendesimi Liskov 
> Ky princip thot qe nese funksioni f(x) punon me objektet e tipit T. Ateher funksioni f(y) duhet te punoj me objektet y te tipit S ku S eshte nen tip i T.

Ndoshta shembulli qe e then kete princip do ta lehtsoj kuptimin e ketij principi.
```
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
Kjo pjese e kodit eshte pjese e principit te dyte ku e kem zgjatur klasen KalkulatoriUshqimit, me kete ndryshim te metodes `merrShumen` e kemi thyer rregullin e principit te trete.
Nese i referohemi definicionit i bjen qe e njejta metode nuk duhet te kthen vlera te ndryshme edhe pse eshte klase tjeter.

Do ta rregullojme kete klase si ne vijim.
```
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
Ne vend qe ta modifikojm metoden e klases origjinale, do ta perdorim ate ne klasen per studente dhe do te shtojme metoda ne klasen per studente.

### Principi i katert - Ndarja e kontratave
> Nje klase nuk duhet ta implementoj nje metode qe nuk i nevojitet.

Shembull shtesat e ushqimeve, siq e kemi pare me larte secila shtese e ka cmimin e vet, po cka nese kemi shtesa qe nuk kushtojne?
Shembull: 
```
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
Sic e shohim ne shembullin me larte, shtesa  `Ketchup` edhe pse eshte falas  duhet ta implementoj metoden `merrShumen` dhe kjo nuk e respekton principin e katert, nje klase nuk duhet ta implementoj nje metode qe nuk i nevojitet.

Keshtu duhet  ta ndryshojme kodin qe ta respektojme principin e katert.
```
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
Ky eshte nje shembull ku ndahet kontrata per shtesat me qmime dhe ato pa qmime, per arsye qe shtesat pa qmime nuk kan nevoj ta implementojne metoden `merrQmimin()`.

### Principi i peste - Inversioni i varësisë
> Një klasë që kryen një punë asnjëherë nuk duhet të varet në mjetin që e përdor por në kontrate.

Nje shembull do te ishte ta ruajm fakturen ne MySql databaze si ne shembullin ne vijim.
E mbani mend si klasa `RuajtjaFaktures` varet direkt ne klasen `Databaza` qe eshte edhe implementimi mbrenda.
Tani klasa `RuajtjaFaktures` e then principin e pare sepse nese e ndryshojme databazen  ateher duhet ta ndryshojme edhe klasen `RuajtjaFaktures`.
```
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
Nje shembull  qe do ta respektonte principin e peste do te ishte si ne vijim.
```
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
Ne kete shembull e shohim qe tani kemi nje kontrate `Databaza` dhe nje klas ku gjendet implementimi i ruajtjes se fakturave `HapsiraRuajtjesSeFakturave`, tash nese vendosim ta ndryshojme databazen ne MongoDB, NoSQL ose ckado qofte nuk kemi nevoj ta ndryshojm klasen `RuajtjaFaktures` sepse ajo varet ne kontrat e jo ne implementim.

### Finalizimi dhe hapat e tjere
Keto jane pra pese principet ne OO te cilat shikohen ne secilen interviste se sa mir i ke kuptuar dhe a din si ti perdor ato.
Hapat e radhes jane: 
1. Qe te provosh ti aplikosh keto principe duhet startuar nje projekt te vogel apo edhe ne punen ku punon.
2. Kur e shikon nje kod ne fillim te merr kohe ti shikosh te gjitha principet, por pas ca kohe behet me e lehte.
3. Perserite kete proces disa here.

🤘 🤓

Nese keni ndonje koment, kritike ose   vetem don te kemi nje bised rreth OO ateher me kontakto ne rrjetet sociale.
[Github](https://github.com/diarselimi)



