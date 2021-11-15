> “Go will be the server language of the future.” — Tobias Lütke, Shopify

Go runs directly on the underlying hardware. Go is not executed on VMs which means that our code is directly compiled to a binary to be run on our processor.

Learn from the most visited websites for GO [https://golang.org/](https://golang.org/) and [https://godoc.org/](https://godoc.org/) there are libraries written in go which you can check them out and learn from them.

Google is already using GO to develop Mobile Apps, Backend Servers, Libraries and also they are using GO internally.

**Go** is a statically typed, compiled language like C++ and Java.

In Stack Overflow Survey GO appeared as #19 in the list of Most Popular Technologies out of nowhere and in this year is expected to be much higher.

Go is good for Stand-alone command-line apps or scripts Network and Web servers. It’s not good for desktop, system-level programming, and GUI-based apps.

Simplicity is cool: You don’t need to learn a lot of keywords.

Go can run processes concurrently as you will see in the example later.

And it is being used in particular for things that require high concurrency.

> “Modern processors are like nitro-fueled funny cars, they excel at the quarter mile. Unfortunately, modern programming languages are like Monte Carlo, they are full of twists and turns.” — [David Ungar](https://en.wikipedia.org/wiki/David_Ungar)

In April 2018 GO was [19th in the TIOBE index and now it's 16th](https://www.tiobe.com/tiobe-index/)

#### Syntax Introduction

-   Variables
    ```go
    var name string = "Person"     // first variant  
    name := "Person"             // second variant
    ```
-   Switch Statement
    ```go
    switch {  
    case x == 1:  
     //do something  
     fallthrough // this makes the program to continue in the cases  
    case x == 2:  
     //do something else  
    default:  
     // do this  
    }
    ```
-   For & Loop
    ```go
    //in go there is just for  
    for i < n {  
     //this is a while loop  
    }  
    ​  
    for key, item := range list {  
     // this is a for each list iteration  
     // if you don't want the key you can just do like: for _, item  
     // the underscore will mark it as not used variable  
    }  
    ​  
    for i := 0; i < 10; i++ {  
     // this is a for loop  
    }
    ```
-   Function definition
    ```go
    func calc() int {  
     // this is how you declare a function that returns an int  
     return 2  
    }
    ```
-   Arrays and Slices
    
    ```go
    // An array has a fixed size which you specify in the declaration  
    // you cannot add elements in an array like this arr1[5] = 9 as this will throw an error  
    arr1 := [5]int{1,2,3,4,5} // this is an array  
    ​  
    // A slice has a dynamic size you can add elements   
    arr2 := []int{1,2,3,4,5,6} // this is a slice  
    ​```
    
-   Maps in GO
    ```go
    keyList = make(map[int]string) // this will make a map list with int as key and string value
    ```
-   In GO you can make a function or variable accessible from outside just by capitalizing the name.
    ```go
    //this function is accesable from outside  
    func GetValue() int {  
     return 12  
    }
    ```

#### Go Concurrency

In comparison to older programming languages (Python, Java etc.) Go was released very recently in 2009. Go was built with concurrency in mind and the ability to utilize multiprocessors efficiently. [Rob Pike (Go creator) has an in-depth talk about this.](https://vimeo.com/49718712)

You can run a process concurrently in go very easily `go list.Sort() // run list.Sort concurrently; don't wait for it.`

In this next example, you can see how you can sort a list and do something else and get the signal when the list is sorted.
```go
c := make(chan int)  // Allocate a channel.  
// Start the sort in a goroutine; when it completes, signal on the channel.  
go func() {  
 list.Sort()  
 c <- 1  // Send a signal; value does not matter.  
}()  
doSomethingForAWhile()  
<-c   // Wait for sort to finish; discard sent value.
```
You can read about the `chan` channels here [https://golang.org/doc/effective_go.html#channels](https://golang.org/doc/effective_go.html#channels)

#### User-defined Types
```go
This is how you can make a new type struct based on your needs

type webPage struct {  
 url string  
 body []byte  
 err error  
}
```
here is an example of a function created in the struct above!
```go
// This function is named get() and this can be called as w.get()  
func (w *webPage) get() {  
 resp, err := http.Get(w.url) // this gets the url from the struct and gets the content  
 // checks for errors  
 if err != nil {  
 w.err = err  
 return  
 }  
 // this line tells this function that you have to call this befor exiting the function doesnt matter what you return  
 defer resp.Body.Close()  
​  
 // this reads all the body content and puts it in the struct body  
 w.body, err = ioutil.ReadAll(resp.Body)  
 if err != nil {  
 w.err = err  
 }  
​  
}
```
This is how we use this logic in the main to use the new type.
```go
func main() {  
 w := &webPage{url: "http://diarselimi.github.io/"} //we reference to the struct and update the url  
 w.get() // call the get() function that we created above.  
 fmt.Printf("URL: %s Error: %s Length: %d \n",w.url, w.err, len(w.body))  
 // output  
 //URL: http://diarselimi.github.io/ Error: %!s(<nil>) Length: 4728  
}
```
There are also interfaces where you can define behavior without defining types itself.
```go
// lets define an interface   
type shuffler interface {  
 Len() int  
 Swap(i, j int)  
}  
​  
// let's shuffle an array that is a shuffler type  
func shuffle(s shuffler) {  
 for i:= 0; i < s.Len(); i++ {  
 j  := rand.Intn(s.Len()-i)  
 s.Swap(i, j)  
 }  
}  
​  
//we just need this so that we can attach the functions to it  
type intSlice []int  
​  
//now we need two functions Len() and Swap(i, j int)  
func (is intSlice) Len() int {  
 return Len(is)  
}  
​  
// and the Swap(i, j int) function   
func (is intSlice) Swap(i, j int) {  
 is[i], is[j] = is[j], is[i] //yes you can swap values like this  
}  
​  
// now we can call the functionality like so  
in := intSlice{1,2,3,4,5,6}  
shuffle(in)  
fmt.Printf("%v \n", in)
```
#### Packages and Initialization

First, to create a package we have to put it somewhere, so we are going to put in inside `src/shuffler/shuffle.go` and name the package `shuffler`
```go
package shuffler  
​  
import (  
 "math/rand" //this is also a package that we are using here  
)  
​  
// we can declare variables like this  
var (  
 counter int = 0  
)  
​  
// also this is a function that gets called after the import is loaded  
func init() {  
    
}  
​  
//this is an interface   
type Shufflable interface {  
 Len() int  
 Swap(i, j int)  
}  
​  
// this interface it's the same as Shufflable but has Weight(i int) extra function  
type WheightedShufflable interface {  
 Shufflable   
 Weight(i int) int  
}  
​  
// and a function that shuffles `shufflable` interfaces  
func Shuffle(s shufflable) {  
 for i := 0; i < s.Len(); i++ {  
 j := rand.Intn(s.Len()-1)  
 s.Swap(i, j)  
 }  
}
```
#### Testing

Go has a built-in tool to run tests just run `go test <package>`

We are going to write a simple test just to see how it works.

Let's say you created a new package in `src/calc/calc.go` which looks something like this.
```go
package main  
​  
func Sum(x int, y int) int {  
 return x + y  
}  
​  
func main() {  
 Sum(5, 5)  
}
```
We then write our test in a separate file. The test file can be in a different package (and folder) or the same one (`main`). Here's a unit test to check addition:
```go
package main  
​  
import "testing"  
​  
func TestSum(t *testing.T) {  
 total := Sum(5, 5)  
 if total != 10 {  
 t.Errorf("Sum was incorrect, got: %d, want: %d.", total, 10)  
 }  
}
```
Now to test the package you just run `go test calc` and it will return the result.

Characteristics of a Golang test function:

-   The first and only parameter needs to be `t *testing.T`
    
-   It begins with the word Test followed by a word or phrase starting with a capital letter.
    
-   (usually the method under test i.e. `TestValidateClient`)
    
-   Calls `t.Error` or `t.Fail` to indicate a failure (I called t.Errorf to provide more details)
    
-   `t.Log` can be used to provide non-failing debug information
    
-   Must be saved in a file named `something_test.go` such as: `addition_test.go`
    

I am using `t.Fatalf` this function if something goes wrong the run stops as soon as there is an error, but you can use `Errorf` which keeps running.

You can also run `go test calc -v` which provides more details about the test.

To get the coverage of a test you just run `go test calc -cover`

#### Tips

You can use `godoc` in the terminal to get documentation for each library that you want to use also for it describes each function that is included.

You can use it `godoc library function` and it will print the documentation and describe each function in depth.

But first, you need to install the tools `apt install golang-golang-x-tools`

Ex: If I type in terminal `godoc string` I will get this as a result.

![](https://lh4.googleusercontent.com/82yULDOBTRZx0sSOqXwoWVq4I22vGM0Q7j0AJjZGHbvgeRHmU5zMpTUR4jJndDSWUETZkLRetlzyGwhuYr_C=w1920-h990-rw)

As you can see this is a pretty good documentation of the functions straight from the terminal.

If you have questions about the language please refer to their [FAQ Page](https://golang.org/doc/faq)
