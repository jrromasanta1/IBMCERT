// index.js

var REST_DATA = 'api/stage';

var KEY_ENTER = 13;
var defaultItems = [];

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function generate_message(message) {


	if(message == "1"){ 
    	
    	$("#messagebox").show();
    	$("#messagecard").addClass( "ibm-background-green-10" );

    	$("#messagecontent").append("<span class='ibm-h4'>Save Successful</span>");
	}else  if(message == "2"){ 
        
        	$("#messagebox").show();
        	$("#messagecard").addClass( "ibm-background-green-10" );

        	$("#messagecontent").append("<span class='ibm-h4'>Save and Request to Promote Successful</span>"); 
    
    } else {
    	
    	$("#messagebox").hide();  
    	$("#messagecontent").empty();     
    }   
}  


function loadItems(){
	
	var current_id = getParameterByName('id');
	var searchquery = "";
	
	var message = getParameterByName('m'); 
	 
	if (message != null) {
	  generate_message(message);    
	}
	
    if ( current_id == null ) {
    	searchquery = "";
    } else {
    	searchquery = '?id=' + current_id;
    	
    	xhrGet(REST_DATA  + searchquery , function(data){  
    		
    		//stop showing loading message  

    		
    		var receivedItems = data.body || [];
    		var items = [];
    		var i;
    		
    		var item = receivedItems[0];
    		
    		 
    		console.log("id:" + item.id);
    		console.log("description:" + item.description);
    		console.log("pwcode:" + item.pwcode);
    		console.log("unit:" + item.unit); 
    		
    		
    		 document.getElementById('iid').value  = item.id;
    		 document.getElementById('ipwcode').value = item.pwcode;  
    		 document.getElementById('idescription').value = item.description;
    		 document.getElementById('unit').value = item.unit;  
    		 document.getElementById('subunit').value = item.subunit;
    		 document.getElementById('iunit').value = item.unit;  
    		 document.getElementById('isubunit').value = item.subunit;
    		 document.getElementById('ijobrole').value =  item.jobrole;
    		 document.getElementById('iskill').value  = item.skill; 
    		 document.getElementById('areajobrole').value =  item.jobrole;
    		 document.getElementById('areaskill').value  = item.skill; 
    		  
    	}, function(err){
    		console.log(err);
    		//stop showing loading message
    	
    		document.getElementById('errorDiv').innerHTML = err;
    		
    	});
    }
}
 



//();
//updateServiceInfo();

$( document ).ready(function() {
loadItems(); 
}); 


 
 
	
	function SaveTestInfo(status)
{
		var inputstatus;
		
		
		if (status == 0 ) {
			 if( $('#iid').val() == "" ){
				 $('#istatus').val("DRAFT");
			 }else {
				 
			 } 
		}else {
			 if( $('#iid').val() == "" ){
				 $('#istatus').val("PENDING");
			 }else {
				 $('#istatus').val("PENDING");
			 } 
		}
	
		
		
		
		var requestParam; 
		
		if  (document.getElementById('iid').value != "") {
		requestParam = '?id=' +  document.getElementById('iid').value;
		}else {
			requestParam = "";
			
		}
		
	
		
		console.log("start");
		
	var form = new FormData();
	
	//var id =document.getElementById('iseries').value;
	
	var data = { 		
			"pwcode" : document.getElementById('ipwcode').value,
			"description" : document.getElementById('idescription').value,
			"unit" : document.getElementById('iunit').value,
			"subunit" : document.getElementById('isubunit').value,
			"jobrole" : document.getElementById('ijobrole').value,
			"skill" : document.getElementById('iskill').value,
			"status" : document.getElementById('istatus').value 
		};
	 
	  
	
	
	xhrPost(REST_DATA + requestParam , data, function(item){
		if ($('#iid').val() != ""){
		
		} else { 
		
		}
		document.getElementById('iid').value  = item.id; 
		
		if (status == 0) {
		window.location.replace("http://ibmcert.mybluemix.net/certref.html?id=" + item.id  + "&m=1");
		} else {
		window.location.replace("http://ibmcert.mybluemix.net/certref.html?id=" + item.id  + "&m=2");
			
		}
		  

	}, function(err){ 
		console.log(err);
		//stop showing loading message

		document.getElementById('errorDiv').innerHTML = err;
	});

	
}
	
	
	