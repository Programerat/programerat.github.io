// To make images retina, add a class "2x" to the img element
// and add a <image-name>@2x.png image. Assumes jquery is loaded.
 
function isRetina() {
	var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
					  (min--moz-device-pixel-ratio: 1.5),\
					  (-o-min-device-pixel-ratio: 3/2),\
					  (min-resolution: 1.5dppx)";
 
	if (window.devicePixelRatio > 1)
		return true;
 
	if (window.matchMedia && window.matchMedia(mediaQuery).matches)
		return true;
 
	return false;
};
 
 
function retina() {
	
	if (!isRetina())
		return;
	
	$("img.2x").map(function(i, image) {
		
		var path = $(image).attr("src");
		
		path = path.replace(".png", "@2x.png");
		path = path.replace(".jpg", "@2x.jpg");
		
		$(image).attr("src", path);
	});
};
 
$(document).ready(retina);

function getElementByClass(className){
	var elements = document.getElementsByClassName(className);
	return elements[0];
}

function getAttributeValue(element, attributeName) {
	var attribute = element.getAttribute(attributeName);
	return attribute;
}

function appendElementsToElement(element, items, type = 'div', className = 'tag') {
	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		var newElement = document.createElement(type);
		newElement.className = className;
		newElement.innerHTML = item;
		element.appendChild(newElement);
	}
}

var tags = document.getElementsByClassName('tags');
if (tags !== undefined) {
	for (var i = 0; i < tags.length; i++) {
		var tag = tags[i];
		var tagsArray = getAttributeValue(tag, 'content').split(',');
		appendElementsToElement(tag, tagsArray);
	}
}