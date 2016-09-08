// index.js

var REST_DATA = 'api/favorites';

var KEY_ENTER = 13;
var defaultItems = [
	
];

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
	
    if ( current_id == null ) {
    	searchquery = "";
    } else {
    	searchquery = '?id=' + current_id;
    	
    	xhrGet(REST_DATA  + searchquery , function(data){  
    		
    		//stop showing loading message  
    		stopLoadingMessage();
    		
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
    		 document.getElementById('iunit').value = item.unit;  
    		 document.getElementById('isubunit').value = item.subunit;
    		 document.getElementById('ijobrole').value =  item.jobrole;
    		 document.getElementById('iskill').value  = item.skill; 
    		 document.getElementById('areajobrole').value =  item.jobrole;
    		 document.getElementById('areaskill').value  = item.skill; 
    		  
    	}, function(err){
    		console.log(err);
    		//stop showing loading message
    		stopLoadingMessage();
    		document.getElementById('errorDiv').innerHTML = err;
    		
    	});
    }
}
 



function showLoadingMessage()
{
	document.getElementById('loadingImage').innerHTML = "Loading data "+"<img height=\"100\" width=\"100\" src=\"images/loading.gif\"></img>";
}
function stopLoadingMessage()
{
	document.getElementById('loadingImage').innerHTML = "";
}

//showLoadingMessage();
//updateServiceInfo();
loadItems(); 



 
 
	
	function SaveTestInfo()
{
		
		var requestParam; 
		
		if  (document.getElementById('iid').value != "") {
		requestParam = '?id=' +  document.getElementById('iid').value;
		}else {
			requestParam = ""
			
		}
		
		showLoadingMessage(); 
		
		console.log("start");
		
	var form = new FormData();
	
	//var id =document.getElementById('iseries').value;
	
	var data = { 		
			"pwcode" : document.getElementById('ipwcode').value,
			"description" : document.getElementById('idescription').value,
			"unit" : document.getElementById('iunit').value,
			"subunit" : document.getElementById('isubunit').value,
			"jobrole" : document.getElementById('ijobrole').value,
			"skill" : document.getElementById('iskill').value 
		};
	 
	  
	
	
	xhrPost(REST_DATA + requestParam , data, function(item){
		if ($('#iid').val() != ""){
		
		} else { 
		
		}
		document.getElementById('iid').value  = item.id; 
		stopLoadingMessage();
	}, function(err){ 
		console.log(err);
		//stop showing loading message
		stopLoadingMessage();
		document.getElementById('errorDiv').innerHTML = err;
	});
	
	console.log("end");
	
	
	 stopLoadingMessage();

	

	
}
	
	
	