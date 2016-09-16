// checkcred.js


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
			 $("#adminlink").hide();  
		 } else {
			 $("#adminlink").show();
		 }
	         
	      
	 } else{
		  window.location.replace("http://ibmcert.mybluemix.net/index.html");
	 } 
	
	 
}

