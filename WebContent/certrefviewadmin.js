// index.js

var REST_DATA = 'api/admin'; 

var KEY_ENTER = 13;
var defaultItems = [
	
];



$( document ).ready(function() {
	checkcred();
	loadItems();
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
		console.log("sname:" + sname); 
		
		
	 if(semail != null ) {
		 
		 
		 document.getElementById("demail").innerHTML  = semail;
		 document.getElementById("dname").innerHTML  = sname;
		 document.getElementById("iemail").value = semail;
		 document.getElementById("iname").value = sname;
		
		 
		 
		 if (srole != "ADMIN" ) {
			 window.location.replace("http://ibmcert.mybluemix.net/certrefview.html");
		 }
	         
	      
	 } else{
		  window.location.replace("http://ibmcert.mybluemix.net/index.html");
	 } 
	
	 
}





function loadItems(){
	
	var searchquery = "";
	
    	xhrGet(REST_DATA  , function(data){  
    		
    		//stop showing loading message  
   
    		
    		var receivedItems = data.body || [];
    		var items = [];
    		var i;
    		
    		var item ;
    		
    		var html;
    		
    		
			
    	
    		for(i = 0; i < receivedItems.length; ++i){
    			item = receivedItems[i];
    			if(item && 'id' in item){
    				
    				
    				 

    				html = html + "<tr>"+
    				"<td><a style='min-width:50px;min-height50px;margin-bottom: 5px;font-weight:bolder;' href='/certref.html?id=" +   item.id + "' class='ibm-btn-sec'>View</a></td>"+
    				"<td>"+ item.status  +"</td>"+
    				"<td>"+ item.pwcode  +"</td>"+
    				"<td>"+ item.description  +"</td>"+
    				"<td>"+ item.fname  +"</td>"+    	 			
    				"<td>"+ item.creation_date  +"</td>" +
    				"<td>"+ item.modified_date  +"</td>"+
    				"</tr>";  
    			}
    		}
    				
    
    		$('#tableph').hide(); 
    		 $('#tcertref_content').append(html);  
   		  
    	}, function(err){
    		console.log(err);
    		//stop showing loading message
    		document.getElementById('errorDiv').innerHTML = err;
    		
    	});
    }

 









	
	
	