var article = getElementByClass('post');

if (article != null) {
  var headers = article.getElementsByTagName('h3');
  var tocHeaders = [];

  for(var i=0; i < headers.length; i++) {
    headers[i].setAttribute('id', headers[i].innerHTML)
    tocHeaders.push(headers[i].innerText);
  }

  appendElementsToElement(getElementByClass('toc-content'), tocHeaders, 'li', undefined);
}

