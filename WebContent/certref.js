// index.js

var REST_DATA = 'api/favorites';

var KEY_ENTER = 13;
var defaultItems = [
	
];

function loadItems(){
	//	xhrGet(REST_DATA  + '?id=1473055137477' , function(data){
	//xhrGet(REST_DATA  , function(data){
	xhrGet(REST_DATA  + '?id=1473055137477' , function(data){ 
		
		//stop showing loading message  
		stopLoadingMessage();
		
		var receivedItems = data.body || [];
		var items = [];
		var i;
		// Make sure the received items have correct format
		
		
		/*
		for(i = 0; i < receivedItems.length; ++i){
			var item = receivedItems[i];
			if(item && 'id' in item){
				items.push(item);
			}
		}
		*/
		
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
		 
		 
	}, function(err){
		console.log(err);
		//stop showing loading message
		stopLoadingMessage();
		document.getElementById('errorDiv').innerHTML = err;
		
	});
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
	//	row.setAttribute('data-id', item.id);
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
	
	
	