var i=0;
var j=0;
var title;
var imgLink;
var author;
var volumeId;
var searchvalue = document.getElementById("searchValue");
var select = document.getElementById("selectId");
var activityRegion = document.getElementById("activityRegion");

var la = new Array();
var lad = new Array();

var xmlhttp;
if (window.XMLHttpRequest) {
	xmlhttp = new XMLHttpRequest();
} 
else{
  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}


function initialise(){

	var k=0;
	var xmlhttp;
	if (window.XMLHttpRequest) {
	  		xmlhttp = new XMLHttpRequest();
	} 
	 else{
	  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var url = "https://www.googleapis.com/books/v1/volumes?q=harry+potter";
	var data;
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
	    	data = JSON.parse(this.responseText);
	    	if(data.totalItems==0){
	    		noBooksDisplay();
	    	}	
	    	else{	
		    	for(i=0;i<data.items.length;i++){
		    		title = data.items[i].volumeInfo.title;
		    		author = data.items[i].volumeInfo.authors;
		    		imgLink = data.items[i].volumeInfo.imageLinks.thumbnail;
		    		volumeId = data.items[i].id;
		    		createBox(k,volumeId,title,author,imgLink);
		    		k++;
		    	}
		    }		
	    }
	};
	xmlhttp.open("GET",url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send();

}

function search(){

	var k=0;

	while(activityRegion.firstChild){
		activityRegion.removeChild(activityRegion.firstChild);
	}
	
	var url = "https://www.googleapis.com/books/v1/volumes?q=";
	var optValue = select.options[select.selectedIndex].text;
	var searchString;

	if(optValue=="Title"){
		searchString = "intitle:"+searchValue;
	}

	else if(optValue=="Author"){
		searchString = "inauthor:"+searchValue;
	}

	else if(optValue=="Publisher"){
		searchString = "inpublisher:"+searchValue;
	}

	else if(optValue=="ISBN"){
		searchString = "isbn:"+searchValue;
	}

	else if(optValue=="Subject"){
		searchString = "subject:"+searchValue;
	}

	url+=searchString;
	var k=0;
	var xmlhttp;
	if (window.XMLHttpRequest) {
	  		xmlhttp = new XMLHttpRequest();
	} 
	 else{
	  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var data;
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
	    	data = JSON.parse(this.responseText);
	    	if(data.totalItems==0){
	    		noBooksDisplay();
	    	}	
	    	else{
	    		for(i=0;i<data.items.length;i++){
		    		title = data.items[i].volumeInfo.title;
		    		author = data.items[i].volumeInfo.authors;
		    		imgLink = data.items[i].volumeInfo.infoLink;
		    		volumeId = data.items[i].id;
		    		createBox(k,volumeId,title,author,imgLink);
		    		k++;
	    		}	
	    	}
	    }
	    searchValue.value = "";
	    searchValue.placeholder = "Search";
	};
	xmlhttp.open("GET",url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send();

}

function noBooksDisplay(){
	var div = document.createElement("div");
	var divText = document.createTextNode("No books to show!");
	div.appendChild(divText);
	activityRegion.appendChild(div);
	div.setAttribute("class","no-books card bg-light");
}

function createBox(k,volumeId,title,author,imgLink){

	la[k]=1;
	lad[k]=1;

	var li = document.createElement("li");
	var imgDiv = document.createElement("div");
	var img = document.createElement("img");
	var div2 = document.createElement("div");
	var titleDiv = document.createElement("div");
	var byAuthDiv = document.createElement("div");
	var bySpan = document.createElement("span");
	var authorSpan = document.createElement("span");
	var dropDiv = document.createElement("div");
	var dropBtn = document.createElement("button");
	var dropmenuDiv = document.createElement("div");
	var a0 = document.createElement("a");
	var a1 = document.createElement("a");
	var a2 = document.createElement("a");
	var dropDownDivider = document.createElement("div");
	var dropDivideHead = document.createElement("h5");
	var ad = document.createElement("a");
	var ad0 = document.createElement("a");
	var idDiv = document.createElement("div");

	var titleText = document.createTextNode(title);
	var bySpanText = document.createTextNode("by ");
	var authorText = document.createTextNode(author);
	var dropbtnText = document.createTextNode("DropDown button");
	var a0Text = document.createTextNode("Want To Read");
	var a1Text = document.createTextNode("Currently Reading");
	var a2Text = document.createTextNode("Finished Reading");
	var dropDivideHeadText = document.createTextNode("Shelves");
	var adText = document.createTextNode("Add New Shelf");
	var ad0Text = document.createTextNode("Favourites");
	var idDivText = document.createTextNode(volumeId);

	titleDiv.appendChild(titleText);
	bySpan.appendChild(bySpanText);
	authorSpan.appendChild(authorText);
	dropBtn.appendChild(dropbtnText);
	a0.appendChild(a0Text);
	a1.appendChild(a1Text);
	a2.appendChild(a2Text);
	dropDivideHead.appendChild(dropDivideHeadText);
	ad.appendChild(adText);
	ad0.appendChild(ad0Text);
	idDiv.appendChild(idDivText);

	imgDiv.appendChild(img);
	dropDiv.appendChild(dropBtn);
	dropmenuDiv.appendChild(a0);
	dropmenuDiv.appendChild(a1);
	dropmenuDiv.appendChild(a2);
	dropmenuDiv.appendChild(dropDownDivider);
	dropmenuDiv.appendChild(dropDivideHead);
	dropmenuDiv.appendChild(ad);
	dropmenuDiv.appendChild(ad0);
	dropDiv.appendChild(dropmenuDiv);
	li.appendChild(dropDiv);
	li.appendChild(imgDiv);
	div2.appendChild(titleDiv);
	byAuthDiv.appendChild(bySpan);
	byAuthDiv.appendChild(authorSpan);
	div2.appendChild(byAuthDiv);
	li.appendChild(div2);
	li.appendChild(idDiv);
	activityRegion.appendChild(li);

	img.setAttribute("id","img"+k);
	titleDiv.setAttribute("id","title"+k);
	authorSpan.setAttribute("id","author"+k);
	dropBtn.setAttribute("id","dropBtn"+k);
	a0.setAttribute("id","0a"+k);
	a1.setAttribute("id","1a"+k);
	a2.setAttribute("id","2a"+k);
	ad.setAttribute("id","ad"+k);
	ad0.setAttribute("id","0ad"+k);
	idDiv.setAttribute("id","volumeId"+k);

	la[k]=2;
	lad[k]=0;

	li.setAttribute("class","liClass container card bg-light");
	img.setAttribute("class","imgClass");
	imgDiv.setAttribute("class","imgDivClass");
	titleDiv.setAttribute("class","titleClass");
	byAuthDiv.setAttribute("class","byAuthClass");
	dropDiv.setAttribute("class","dropdown dropDivClass");
	dropBtn.setAttribute("class","btn btn-brown dropdown-toggle");
	dropmenuDiv.setAttribute("class","dropdown-menu");
	a0.setAttribute("class","dropdown-item");
	a1.setAttribute("class","dropdown-item");
	a2.setAttribute("class","dropdown-item");
	dropDivideHead.setAttribute("class","dropdown-header");
	ad.setAttribute("class","dropdown-item");
	ad0.setAttribute("class","dropdown-item");


	if(author==null){
		byAuthDiv.setAttribute("style","display:none");
	}

	img.setAttribute("src",imgLink);
	img.setAttribute("onerror","this.style.display='none';");
	dropBtn.setAttribute("type","button");
	dropBtn.setAttribute("data-toggle","dropdown");
	a0.setAttribute("onclick","aClick(this)");
	a1.setAttribute("onclick","aClick(this)");
	a2.setAttribute("onclick","aClick(this)");
	ad.setAttribute("onclick","addNewShelf(this)");
	ad0.setAttribute("onclick","adClick(this)");
	idDiv.setAttribute("style","display:none");


}


function aClick(y){

	var idAttr = y.getAttribute("id");
    var res = idAttr.split("a");
    var k = parseInt(res[1]);
	var l = parseInt(res[0]);
	var bookStatus = y.innerHTML;

	var title = document.getElementById("title"+k).innerHTML;
	var author = document.getElementById("author"+k).innerHTML;
	var imgLink = document.getElementById("img"+k).getAttribute("src");
	var volumeId = document.getElementById("volumeId"+k).innerHTML;
	var purpose = "aClickAdd";

	var xmlhttp;
	if (window.XMLHttpRequest){
	  		xmlhttp = new XMLHttpRequest();
	} 
	 else{
	  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var params = "volumeId="+volumeId+"&title="+title+"&author="+author+"&imgLink="+imgLink+"&status="+bookStatus+"&volumeId="+volumeId+"&purpose="+purpose;
	var url = "saveBookData.php";
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

function addNewShelf(y){

	var idAttr = y.getAttribute("id");
    var res = idAttr.split("ad");
    var k = parseInt(res[1]);

    var title = document.getElementById("title"+k).innerHTML;
	var author = document.getElementById("author"+k).innerHTML;
	var imgLink = document.getElementById("img"+k).getAttribute("src");

	/*var xmlhttp;
	if (window.XMLHttpRequest) {
	  		xmlhttp = new XMLHttpRequest();
	} 
	 else{
	  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var url = "https://www.googleapis.com/books/v1/volumes?q=harry+potter";
	var data;
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
	    	data = JSON.parse(this.responseText);
	    	if(data.totalItems==0){
	    		noBooksDisplay();
	    	}	
	    	else{	
		    	for(i=0;i<data.items.length;i++){
		    		title = data.items[i].volumeInfo.title;
		    		author = data.items[i].volumeInfo.authors;
		    		imgLink = data.items[i].volumeInfo.imageLinks.thumbnail;
		    		createBox(k,title,author,imgLink);
		    		k++;
		    	}
		    }		
	    }
	};
	xmlhttp.open("GET",url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send();*/


}

function adClick(y){

	var idAttr = y.getAttribute("id");
    var res = idAttr.split("ad");
    var k = parseInt(res[1]);
    var l = parseInt(res[0]);
    var bookStatus = y.innerHTML;

    var title = document.getElementById("title"+k).innerHTML;
	var author = document.getElementById("author"+k).innerHTML;
	var imgLink = document.getElementById("img"+k).getAttribute("src");
	var volumeId = document.getElementById("volumeId"+k).innerHTML;
	var purpose = "adClickAdd";

	var xmlhttp;
	if (window.XMLHttpRequest){
	  		xmlhttp = new XMLHttpRequest();
	} 
	 else{
	  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var params =  "volumeId="+volumeId+"&title="+title+"&author="+author+"&imgLink="+imgLink+"&status="+bookStatus+"&volumeId="+volumeId+"&purpose="+purpose;
	var url = "saveBookData.php";
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

initialise();