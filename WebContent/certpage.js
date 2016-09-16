// index.js

var REST_DATA = 'api/Prod';

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

 
function loadItems(){
	
	var current_id = getParameterByName('id');
	var searchquery = "";
	
	var message = getParameterByName('m'); 
	 
 
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
    		
    
    	
    		 $("#pwcode" ).append( item.pwcode); 
    		 $("#description" ).append( item.description); 
    		 $("#unit" ).append( item.unit); 
    		 $("#subunit" ).append( item.subunit); 
    		 $("#jobrole" ).append( item.jobrole); 
    		 $("#skill" ).append( item.skill); 
    		 
    		 
    	}, function(err){
    		
    		
    		console.log(err);
    		//stop showing loading message
    	
    	
    		
    	});
    }
}
 

//();
//updateServiceInfo();

$( document ).ready(function() {

loadItems(); 
}); 
 


	