// index.js

var REST_DATA = 'api/stage'; 

var KEY_ENTER = 13;
var defaultItems = [
	
];



$( document ).ready(function() {
	checkcred();
});



function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function checkcred() { 
	 var semail = getCookie("semail");
	 var srole = getCookie("srole");
	 var sname = getCookie("sname"); 
	 

		console.log("semail:" + semail);
		console.log("srole:" + srole); 
		console.log("srole:" + sname); 
		
		
	 if(semail != null ) {
		 
		 
		 document.getElementById("demail").innerHTML  = semail;
		 document.getElementById("dname").innerHTML  = sname;
		 document.getElementById("iemail").value = semail;
		 document.getElementById("iname").value = sname;
	 
		 if (srole != "ADMIN" ) {
			 $("#adminlink").show(); 
		 } else {
			 $("#adminlink").hide();
		 }
	               
	      
	 } else{
		  window.location.replace("http://ibmcert.mybluemix.net/index.html");
	 } 
	
	 
}







 









	
	
	