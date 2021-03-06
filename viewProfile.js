var i=0;
var j=0;
var title;
var imgLink;
var author;
var volumeId;
var liked;
var cards=0;
var shelves = 0;
var searchData;//stores the search suggestion book data in database
var bookData;//stores all the book data in database
var searchBookData;//stores all the search results book data in database
var allBookData;//stores all the book data in database
var searchvalue = document.getElementById("searchValue");
var select = document.getElementById("selectId");
var searchSuggestionsRegion = document.getElementById("searchSuggestionsRegion");
var removeRegion = document.getElementById("removeRegion");
var activityRegion = document.getElementById("activityRegion");

var shelvesArrayInit = new Array();
var la = new Array();
var lad = new Array();

var xmlhttp;
if (window.XMLHttpRequest) {
	xmlhttp = new XMLHttpRequest();
} 
else{
  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

searchValue.addEventListener("keyup",function(event){
		if(event.keyCode==13){ //enter key
			search();
		}
},false);

document.addEventListener("click",function(event){

	if(event.target!=document.getElementById("searchValue")){
		searchFocusOut();
	}

},false);

function searchSuggestions(text){

	var optValue = select.options[select.selectedIndex].text;

	if(text!=""&&optValue!="Users"){

		searchSuggestionsRegion.style.display = "block";
		var xmlhttp;
		if (window.XMLHttpRequest) {
		  		xmlhttp = new XMLHttpRequest();
		} 
		 else{
		  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		var url = "https://www.googleapis.com/books/v1/volumes?q="+text;
		var data;
		xmlhttp.onreadystatechange = function(){
		    if(this.readyState==4&&this.status==200){

		    while(searchSuggestionsRegion.firstChild){
				searchSuggestionsRegion.removeChild(searchSuggestionsRegion.firstChild);
			} 	
		    	data = JSON.parse(this.responseText);
		    	if(data.totalItems!=0){
		    		var numSuggestions = 4;
		    		numSuggestions = 4<data.items.length?4:data.items.length;
			    	for(i=0;i<numSuggestions;i++){
			    		title = data.items[i].volumeInfo.title;
			    		author = data.items[i].volumeInfo.authors;
			    		imgLink = data.items[i].volumeInfo.imageLinks.smallThumbnail;
			    		volumeId = data.items[i].id;
			    		searchSuggestionsAppend(i,title,author,imgLink,volumeId);
			    	}
			    }	
		    }
		};
		xmlhttp.open("GET",url,true);
		xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xmlhttp.send();
	}

	else{
		searchFocusOut();
	}
	
}

function searchSuggestionsAppend(k,title,author,imgLink,volumeId){

	var div = document.createElement("div");
	var a = document.createElement("a");
	var imgSpan = document.createElement("span");
	var img = document.createElement("img");
	var titleSpan = document.createElement("span");
	var authorDiv = document.createElement("div");
	var idSpan = document.createElement("span");

	var titleSpanText = document.createTextNode(title);
	var authorDivText = document.createTextNode(author);
	var idSpanText = document.createTextNode(volumeId);
	titleSpan.appendChild(titleSpanText);
	authorDiv.appendChild(authorDivText);
	idSpan.appendChild(idSpanText);

	imgSpan.appendChild(img);
	a.appendChild(imgSpan);
	titleSpan.appendChild(idSpan);
	a.appendChild(titleSpan);
	div.appendChild(a);
	document.getElementById("searchSuggestionsRegion").appendChild(div);

	idSpan.setAttribute("id","suggVolId"+k);
	idSpan.setAttribute("style","display:none");
	a.setAttribute("id","a"+k);
	a.setAttribute("class","searchSuggestionsA container card bg-light");
	a.setAttribute("onclick","searchSuggestionClick(this);")
	img.setAttribute("src",imgLink);
	img.setAttribute("class","searchSuggestionsThumbnail");
	titleSpan.setAttribute("class","searchSuggestionsTitle")

}

function searchSuggestionClick(y){

	var idAttr = y.getAttribute("id");
    var res = idAttr.split("a");
    var k = parseInt(res[1]);
    var volumeId = document.getElementById("suggVolId"+k).innerHTML;

	while(activityRegion.firstChild){
			activityRegion.removeChild(activityRegion.firstChild);
		} 

	var xmlhttp;
	if (window.XMLHttpRequest) {
	  		xmlhttp = new XMLHttpRequest();
	} 
	 else{
	  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var url = "https://www.googleapis.com/books/v1/volumes/"+volumeId;
	var data;
	xmlhttp.onreadystatechange = function(){
	   if(this.readyState==4&&this.status==200){ 
	    	cards=0;	
	    	searchBookData = JSON.parse(this.responseText);
	    	getBookData();	
	    }
	};
	xmlhttp.open("GET",url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send();

}

function searchFocusOut(){

	while(searchSuggestionsRegion.firstChild){
		searchSuggestionsRegion.removeChild(searchSuggestionsRegion.firstChild);
	}
	searchSuggestionsRegion.style.display = "none";

}

function initialise(){


}

function shelvesInit(){

	var xmlhttp;
	if (window.XMLHttpRequest) {
	  		xmlhttp = new XMLHttpRequest();
	} 
	 else{
	  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var url = "getShelvesName.php";
	var data;
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
	    	data = this.responseText;
	    	shelvesArrayInit = data.split("%");
	    	shelvesArrayInit.splice(shelvesArrayInit.length-1, 1);
			for(var v=1;v<shelvesArrayInit.length;v++){//Starting at v=1 as shelf 'Favourites is already appended'
				var shelfName = shelvesArrayInit[v];
				shelfDropDownAppend(shelfName);
			}	
	    }
	};
	xmlhttp.open("GET",url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send();

}

function search(){

	while(removeRegion.firstChild){
		removeRegion.removeChild(removeRegion.firstChild);
	}

	var div = document.createElement("div");
	document.getElementById("removeRegion").appendChild(div);
	div.setAttribute("id","activityRegion");

	var optValue = select.options[select.selectedIndex].text;

	if(optValue=="Users"){

		var xmlhttp;
		if (window.XMLHttpRequest) {
		  		xmlhttp = new XMLHttpRequest();
		} 
		 else{
		  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		var userSearchValue = searchValue.value;
		var url = "getUserSearchData.php";
		var params = "userSearchValue="+userSearchValue;
		var userData;
		xmlhttp.onreadystatechange = function(){
		    if(this.readyState==4&&this.status==200){
		    	cards=0;
		    	userData = JSON.parse(this.responseText);
		    	if(userData.length==0){
		    		noUsersDisplay();
		    	}
		    	else{
		    		var currentUser = userData[0].currentUser;
		    		for(var g=0;g<userData.length;g++){
			
		    			var btnText = "Follow";
		    			var isfollowing = false;
		    			if(userData[g].Username==currentUser){
			    			btnText = "View Profile";
			    		}
		    			if(userData[g].Followers!="NULL"||!userData[g].Followers){
		    				var followingArray = userData[g].Followers.split(",");
			    			for(var x=0;x<followingArray.length-1;x++){
			    				if(currentUser==followingArray[x]){
			    					isfollowing = true;
			    					btnText = "Following";
			    				}
			    			}
		    			}
		    			createUserBox(cards,userData[g].Username,btnText);
		    			cards++;
		    		}
		    	}
		   	}
		    searchValue.value = "";
		    searchValue.placeholder = "Search";
		};
		xmlhttp.open("POST",url,true);
		xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xmlhttp.send(params);

	}
	else{

		var k=0;
		var url = "https://www.googleapis.com/books/v1/volumes?q=";
		var searchString;
		searchValue = searchvalue.value;

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
		    	cards=0;
		    	data = JSON.parse(this.responseText);
		    	searchData = JSON.parse(this.responseText);
		    	if(data.totalItems==0){
		    		noBooksDisplay();
		    	}
		    	else{
		    		getAllBooksData();
		    	}
		    }

		    searchValue.value = "";
		    searchValue.placeholder = "Search";
		};
		xmlhttp.open("GET",url,true);
		xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xmlhttp.send();

	}	

}

function createUserBox(cards,username,btnText){

	var li = document.createElement("span");
	var userSpan = document.createElement("span");
	var btnSpan = document.createElement("span");
	var button = document.createElement("button");
	var button2;
	if(btnText!="View Profile"){
		button2 = document.createElement("button");
	}

	var userSpanText = document.createTextNode(username);
	var buttonText = document.createTextNode(btnText);
	var button2Text;
	if(btnText!="View Profile"){
		button2Text = document.createTextNode("View Profile");
		button2.appendChild(button2Text);
	}

	userSpan.appendChild(userSpanText);
	button.appendChild(buttonText);

	li.appendChild(userSpan);
	btnSpan.appendChild(button);
	if(btnText!="View Profile"){
		btnSpan.appendChild(button2);
	}	
	li.appendChild(btnSpan);
	activityRegion.appendChild(li);

	userSpan.setAttribute("id","username"+cards);
	button.setAttribute("id","followBtn"+cards);
	if(btnText!="View Profile"){
		button2.setAttribute("id","viewProfileBtn"+cards);
	}

	li.setAttribute("class","userBoxClass liClass container card card-body bg-light");
	li.setAttribute("style","display:inline-block");
	userSpan.setAttribute("class","userNameDisp");
	button.setAttribute("class","userBtn btn btn-brown");
	button.setAttribute("onclick","followBtnClick(this)");
	if(btnText!="View Profile"){
		button2.setAttribute("class","userBtn btn btn-brown");
		button2.setAttribute("onclick","viewProfileBtnClick(this)");
	}

}


function followBtnClick(y){

	var idAttr = y.getAttribute("id");
    var res = idAttr.split("followBtn");
    var k = parseInt(res[1]);
    var click;
    click = y.innerHTML;

    if(y.innerHTML=="Follow"){
    	y.innerHTML = "Following";
    } 
    else if(y.innerHTML=="Following"){
		y.innerHTML = "Follow";
    }
    else if(y.innerHTML=="View Profile"){
    	window.location = "profile.php";
    }

    var followUsername = document.getElementById("username"+k).innerHTML;
    var purpose = "followBtnClick";

	var xmlhttp;
	if (window.XMLHttpRequest){
	  		xmlhttp = new XMLHttpRequest();
	} 
	 else{
	  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var params = "followUsername="+followUsername+"&click="+click+"&purpose="+purpose;
	var url = "followUser.php";
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
	    	console.log(this.responseText);
	    }
	};
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

function noUsersDisplay(){
	var div = document.createElement("div");
	var divText = document.createTextNode("No Users to display!");
	div.appendChild(divText);
	activityRegion.appendChild(div);
	div.setAttribute("class","no-books card bg-light");
}

function noBooksDisplay(){
	var div = document.createElement("div");
	var divText = document.createTextNode("No books to show!");
	div.appendChild(divText);
	activityRegion.appendChild(div);
	div.setAttribute("class","no-books card bg-light");
}

function createBox(k,volumeId,title,author,imgLink,liked){

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
	var ad0 = document.createElement("a");
	var likeDiv = document.createElement("div");
	var i = document.createElement("i");
	var idDiv = document.createElement("div");

	var titleText = document.createTextNode(title);
	var bySpanText = document.createTextNode("by ");
	var authorText = document.createTextNode(author);
	var dropbtnText = document.createTextNode("");
	var a0Text = document.createTextNode("Want To Read");
	var a1Text = document.createTextNode("Currently Reading");
	var a2Text = document.createTextNode("Finished Reading");
	var dropDivideHeadText = document.createTextNode("Shelves");
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
	ad0.appendChild(ad0Text);
	idDiv.appendChild(idDivText);

	imgDiv.appendChild(img);
	dropDiv.appendChild(dropBtn);
	dropmenuDiv.appendChild(a0);
	dropmenuDiv.appendChild(a1);
	dropmenuDiv.appendChild(a2);
	dropmenuDiv.appendChild(dropDownDivider);
	dropmenuDiv.appendChild(dropDivideHead);
	dropmenuDiv.appendChild(ad0);
	dropDiv.appendChild(dropmenuDiv);
	li.appendChild(dropDiv);
	li.appendChild(imgDiv);
	div2.appendChild(titleDiv);
	byAuthDiv.appendChild(bySpan);
	byAuthDiv.appendChild(authorSpan);
	div2.appendChild(byAuthDiv);
	li.appendChild(div2);
	likeDiv.appendChild(i);
	li.appendChild(likeDiv);
	li.appendChild(idDiv);
	activityRegion.appendChild(li);

	img.setAttribute("id","img"+k);
	titleDiv.setAttribute("id","title"+k);
	authorSpan.setAttribute("id","author"+k);
	dropBtn.setAttribute("id","dropBtn"+k);
	dropmenuDiv.setAttribute("id","dropmenuDiv"+k);
	a0.setAttribute("id","0a"+k);
	a1.setAttribute("id","1a"+k);
	a2.setAttribute("id","2a"+k);
	ad0.setAttribute("id","0ad"+k);
	i.setAttribute("id","like"+k);
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
	dropmenuDiv.setAttribute("class","dropdown-menu scrollable-menu");
	a0.setAttribute("class","dropdown-item");
	a1.setAttribute("class","dropdown-item");
	a2.setAttribute("class","dropdown-item");
	dropDivideHead.setAttribute("class","dropdown-header");
	ad0.setAttribute("class","dropdown-item");

	if(liked=="yes"){
		i.setAttribute("class","fa fa-thumbs-up fa-2x liked");
	}
	else{
		i.setAttribute("class","fa fa-thumbs-up fa-2x");
	}

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
	ad0.setAttribute("onclick","adClick(this)");
	i.setAttribute("onclick","likeButtonClick(this)");
	idDiv.setAttribute("style","display:none");


}

function shelfDropDownAppend(shelfName){

	var ad;
	var adText;

	for(var u=0;u<cards;u++){

		shelves++;

		ad = document.createElement("a");
		adText = document.createTextNode(shelfName);
		ad.appendChild(adText);
		document.getElementById("dropmenuDiv"+u).appendChild(ad);

		ad.setAttribute("id",shelves+"ad"+u);
		ad.setAttribute("class","dropdown-item");
		ad.setAttribute("onclick","adClick(this)");

	}
}

function aClick(y){

	var idAttr = y.getAttribute("id");
    var res = idAttr.split("a");
    var k = parseInt(res[1]);
	var l = parseInt(res[0]);
	var bookStatus = y.innerHTML;
	document.getElementById("dropBtn"+k).innerHTML = bookStatus;

	var title = document.getElementById("title"+k).innerHTML;
	var author = document.getElementById("author"+k).innerHTML;
	var imgLink = document.getElementById("img"+k).getAttribute("src");
	imgLink = encodeURIComponent(imgLink);
	var volumeId = document.getElementById("volumeId"+k).innerHTML;
	var purpose = "aClickAdd";

	var xmlhttp;
	if (window.XMLHttpRequest){
	  		xmlhttp = new XMLHttpRequest();
	} 
	 else{
	  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var params = "volumeId="+volumeId+"&title="+title+"&author="+author+"&imgLink="+imgLink+"&status="+bookStatus+"&purpose="+purpose;
	var url = "saveBookData.php";
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
	    	console.log(this.responseText);
	    }
	};
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

function adClick(y){

	var idAttr = y.getAttribute("id");
    var res = idAttr.split("ad");
    var k = parseInt(res[1]);
    var l = parseInt(res[0]);
    var columnName = y.innerHTML;

    var title = document.getElementById("title"+k).innerHTML;
	var author = document.getElementById("author"+k).innerHTML;
	var imgLink = document.getElementById("img"+k).getAttribute("src");
	imgLink = encodeURIComponent(imgLink);
	var volumeId = document.getElementById("volumeId"+k).innerHTML;
	var purpose = "adClickAdd";

	var xmlhttp;
	if (window.XMLHttpRequest){
	  		xmlhttp = new XMLHttpRequest();
	} 
	 else{
	  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var params =  "volumeId="+volumeId+"&title="+title+"&author="+author+"&imgLink="+imgLink+"&columnName="+columnName+"&purpose="+purpose;
	var url = "saveBookData.php";
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
	    	console.log(this.responseText);
	    }
	};
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

function likeButtonClick(y){

	var idAttr = y.getAttribute("id");
    var res = idAttr.split("like");
    var k = parseInt(res[1]);

    var volumeId = document.getElementById("volumeId"+k).innerHTML;
    var title = document.getElementById("title"+k).innerHTML;
	var author = document.getElementById("author"+k).innerHTML;
	var imgLink = document.getElementById("img"+k).getAttribute("src");
	imgLink = encodeURIComponent(imgLink);
    var columnName = "Liked";
    var purpose = "likeUpdate";
  	var likeStatus;

  	if(y.classList.contains("liked")){
		y.classList.remove("liked");
		likeStatus = "no";
	}
	else{
		y.classList.add("liked");
		likeStatus = "yes";
	}

    var xmlhttp;
	if (window.XMLHttpRequest){
	  		xmlhttp = new XMLHttpRequest();
	} 
	 else{
	  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var params =  "volumeId="+volumeId+"&title="+title+"&author="+author+"&imgLink="+imgLink+"&columnName="+columnName+"&likeStatus="+likeStatus+"&purpose="+purpose;
	var url = "saveBookData.php";
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
	    	console.log(this.responseText);
	    }
	};
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);
 
}

function appendSearchBook(){//For appending search suggestion click book

	var appended=false;
	var dropBtnText;
	cards=0;

	appended=false;
	for(var d=0;d<bookData.length;d++){
		if(searchBookData.id==bookData[d].VolumeId){
			title = bookData[d].Title;
		    author = bookData[d].Authors;
		   	imgLink = bookData[d].ImgLink;
		   	imgLink = decodeURIComponent(imgLink);
		   	volumeId = bookData[d].VolumeId;
		   	liked = bookData[d].Liked;
	    	dropBtnText = bookData[d].Status;
	    	createBox(cards,volumeId,title,author,imgLink,liked);
		    if(dropBtnText!=="NULL"){
		   		document.getElementById("dropBtn"+cards).innerHTML = dropBtnText;
		   	}
		   	appended=true;
		}
	}
	if(appended==false){
		title = searchBookData.volumeInfo.title;
	    author = searchBookData.volumeInfo.authors;
	    imgLink = searchBookData.volumeInfo.imageLinks.thumbnail;
	    volumeId = searchBookData.id;
	    liked="no";
	    createBox(cards,volumeId,title,author,imgLink,liked);
	}
	cards++;
	shelvesInit();
}

function appendSearchBooks(){//For appending search books

	var appended=false;
	var dropBtnText;
	cards=0;

	for(var c=0;c<searchData.items.length;c++){
		appended=false;
		for(var d=0;d<allBookData.length;d++){
			if(searchData.items[c].id==allBookData[d].VolumeId){
				title = allBookData[d].Title;
		    	author = allBookData[d].Authors;
		    	imgLink = allBookData[d].ImgLink;
		    	imgLink = decodeURIComponent(imgLink);
		    	volumeId = allBookData[d].VolumeId;
		    	liked = allBookData[d].Liked;
		    	dropBtnText = allBookData[d].Status;
		    	createBox(cards,volumeId,title,author,imgLink,liked);
		    	if(dropBtnText!=="NULL"){
		    		document.getElementById("dropBtn"+cards).innerHTML = dropBtnText;
		    	}
		    	appended=true;
			}
		}
		if(appended==false){
			title = searchData.items[c].volumeInfo.title;
		    author = searchData.items[c].volumeInfo.authors;
		    imgLink = searchData.items[c].volumeInfo.imageLinks.thumbnail;
		    volumeId = searchData.items[c].id;
		    liked="no";
		    createBox(cards,volumeId,title,author,imgLink,liked);
		}
		cards++;
	}
	shelvesInit();
}

function getBookData(){//function does the same job(get data of all the books in database) as getAllBooksData() except it calls appendSearchBook() instead of appendSearchBooks

	var xmlhttp;
	if (window.XMLHttpRequest){
	  		xmlhttp = new XMLHttpRequest();
	} 
	 else{
	  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var data;
	var params="";
	var url = "getAllBooksData.php";
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
	    	bookData = JSON.parse(this.responseText);
	    	appendSearchBook();
	    }
	};
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

function getAllBooksData(){//function which gets data of all the books in database<button id="searchButtonId" onclick="search()"><i class="fa fa-search"></i></button>	

	var xmlhttp;
	if (window.XMLHttpRequest){
	  		xmlhttp = new XMLHttpRequest();
	} 
	 else{
	  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var data;
	var params="";
	var url = "getAllBooksData.php";
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
	     allBookData = JSON.parse(this.responseText);
	     appendSearchBooks();
	    }
	};
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

function activitySelectorDraw(){

	var select = document.createElement("select");
	var opt1 = document.createElement("option");
	var opt2 = document.createElement("option");

	var opt1Text = document.createTextNode("Books");
	var opt2Text = document.createTextNode("Following");

	opt1.appendChild(opt1Text);
	opt2.appendChild(opt2Text);

	select.appendChild(opt1);
	select.appendChild(opt2);
	activityRegion.appendChild(select);

	select.setAttribute("id","activitySelect");
	select.setAttribute("onchange","activityDraw()");

	activityDraw();

}

function activityDraw(){	

	while (activityRegion.childNodes.length > 1) {
    	activityRegion.removeChild(activityRegion.lastChild);
	}

	var activityOptValue = document.getElementById("activitySelect").options[document.getElementById("activitySelect").selectedIndex].text;

	if(activityOptValue=="Books"){

		var xmlhttp;
		if (window.XMLHttpRequest){
		  		xmlhttp = new XMLHttpRequest();
		} 
		 else{
		  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		var data;
		var purpose = "Books";
		var params="purpose="+purpose;
		var url = "getOthersPublicActivity.php";
		xmlhttp.onreadystatechange = function(){
		    if(this.readyState==4&&this.status==200){
				cards=0;
				if(this.responseText.trim()!==""){
					data = JSON.parse(this.responseText);
				    if(data.length==0){
				    	noActivityDisplay();
				    }	
				    else{
				    	for(i=data.length-1;i>=0;i--){
					    	title = data[i].Title;
					    	author = data[i].Authors;
					    	imgLink = data[i].ImgLink;
					    	imgLink = decodeURIComponent(imgLink);
					    	volumeId = data[i].VolumeId;
					    	liked = data[i].Liked;
					    	activity = data[i].Activity;

							activityTextCreator(cards,activity);			    	
					    	createBox(cards,volumeId,title,author,imgLink,liked);
					    	
					    	cards++;
				    	}

				    	for(var t=1;t<shelvesArrayInit.length;t++){//For appending shelves name inside dropdown-menu
				    		var shelfName = shelvesArrayInit[t];
				    		shelfDropDownAppend(shelfName);	
				    	}	
				    }   
			    }  
			    else{
			    	privateActivityDisplay();
			    }
		    }
		};
		xmlhttp.open("POST",url,true);
		xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xmlhttp.send(params);

	}

	else if(activityOptValue=="Following"){

		var xmlhttp;
		if (window.XMLHttpRequest){
		  		xmlhttp = new XMLHttpRequest();
		} 
		 else{
		  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		var data;
		var purpose = "Following";
		var params="purpose="+purpose;
		var url = "getOthersPublicActivity.php";
		xmlhttp.onreadystatechange = function(){
		    if(this.readyState==4&&this.status==200){
				cards=0;
			    data = (this.responseText).trim();
			    var dataArray = data.split(",");
			    if(dataArray.length==0){
			    	noActivityDisplay();
			    }	
			    else{
			    	for(i=dataArray.length-2;i>=0;i--){
			    		var text = dataArray[i].trim();
				    	userFollowingCardCreator(cards,text);
				    	cards++;
			    	}
			    }     
		    }
		};
		xmlhttp.open("POST",url,true);
		xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xmlhttp.send(params);

	}

}

function userFollowingCardCreator(cards,text){

	var div = document.createElement("div");
	var text = document.createTextNode(text);

	div.appendChild(text);
	activityRegion.appendChild(div);

	div.setAttribute("id","userActivity"+cards);
	div.setAttribute("class","userActivityClass container card bg-light");

}

function activityTextCreator(k,activity){

	var div = document.createElement("div");
	var divText = document.createTextNode(activity);
	div.appendChild(divText);
	activityRegion.appendChild(div);
	div.setAttribute("id","activityText"+k);
	div.setAttribute("class","activityText");

}

function noActivityDisplay(){
	var div = document.createElement("div");
	var divText = document.createTextNode("No Recent Activity!");
	div.appendChild(divText);
	activityRegion.appendChild(div);
	div.setAttribute("class","no-books card bg-light");
}

function privateActivityDisplay(){
	var div = document.createElement("div");
	var divText = document.createTextNode("User kept his activity private!");
	div.appendChild(divText);
	activityRegion.appendChild(div);
	div.setAttribute("class","no-books card bg-light");
}

function followBtnClick(y){

    var click = y.innerHTML;

    if(y.innerHTML=="Follow"){
    	y.innerHTML = "Following";
    } 
    else if(y.innerHTML=="Following"){
		y.innerHTML = "Follow";
    }
    else if(y.innerHTML=="View Profile"){
    	window.location = "profile.php";
    }

    var followUsername = document.getElementById("viewUser").innerHTML.trim();
    var purpose = "followBtnClick";

	var xmlhttp;
	if (window.XMLHttpRequest){
	  		xmlhttp = new XMLHttpRequest();
	} 
	 else{
	  	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var params = "followUsername="+followUsername+"&click="+click+"&purpose="+purpose;
	var url = "followUser.php";
	xmlhttp.onreadystatechange = function(){
	    if(this.readyState==4&&this.status==200){
	    	console.log(this.responseText);
	    }
	};
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xmlhttp.send(params);

}

activitySelectorDraw();