var article = getElementByClass('post');

if (article != null) {
  var headers = article.getElementsByTagName('h3');
  var tocHeaders = [];

  for(var i=0; i < headers.length; i++) {
    headers[i].setAttribute('id', headers[i].innerHTML)
    tocHeaders.push(headers[i].innerText);
  }

  appendListToList(getElementByClass('toc-content'), tocHeaders);
}

function appendListToList(list, items) {
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var newElement = document.createElement('li');
    newElement.innerHTML = '<a href="#' + item + '">' + item + '</a>';
    list.appendChild(newElement);
  }
}
