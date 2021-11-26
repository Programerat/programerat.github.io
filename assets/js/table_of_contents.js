var article = getElementByClass('post');

if (article != null) {

  var headers = article.getElementsByTagName('h3');

  function appendHeader(header){
    var content = document.getElementsByClassName('table_of_contents');
    var html = '<li><a href="#'+header+'">'+header+'</a></li>';
    content[0].innerHTML += html;
  }

  for(var i=0; i < headers.length; i++) {
    appendHeader(headers[i].innerHTML);  
    headers[i].setAttribute('id', headers[i].innerHTML)
  }
}

