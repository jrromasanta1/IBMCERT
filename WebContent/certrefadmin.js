// index.js

var REST_DATA = 'api/admin'; 

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
    		
    		 
   
    		$("#iid" ).val( item.id);
    		$("#s_ipwcode" ).append( item.s_ipwcode);
    		$("#p_ipwcode" ).append( item.p_ipwcode);
    		
    	    if( item.s_ipwcode != item.p_ipwcode){
    	    	$( "#s_ipwcode" ).addClass( "ibm-bgcolor-yellow-10" );
    	    	$( "#p_ipwcode" ).addClass( "ibm-bgcolor-yellow-10" );
    	    }else{
    	    	 
    	    }
    	    
    	    $("#ipwcode" ).val( item.s_ipwcode);
    	    
    	    
    	    
    		$("#s_idescription" ).append( item.s_idescription);
    		$("#p_idescription" ).append( item.p_idescription);
    		
    	    if( item.s_idescription != item.p_idescription){
    	    	$( "#s_idescription" ).addClass( "ibm-bgcolor-yellow-10" );
    	    	$( "#p_idescription" ).addClass( "ibm-bgcolor-yellow-10" );
    	    }else{
    	    	
    	    }
    	    
    	    $("#idescription" ).val( item.s_idescription);
    	    
    	    
    	    
    		$("#s_iunit" ).append( item.s_iunit);
    		$("#p_iunit" ).append( item.p_iunit);
    		
    	    if( item.s_iunit != item.p_iunit){
    	    	$( "#s_iunit" ).addClass( "ibm-bgcolor-yellow-10" );
    	    	$( "#p_iunit" ).addClass( "ibm-bgcolor-yellow-10" );
    	    }else{
    	    	
    	    }
    	    
    	    $("#iunit" ).val( item.s_iunit);
    	    
    	    
    	    
    		$("#s_isubunit" ).append( item.s_isubunit);
    		$("#p_isubunit" ).append( item.p_isubunit);
    		
    	    if( item.s_isubunit != item.p_isubunit){
    	    	$( "#s_isubunit" ).addClass( "ibm-bgcolor-yellow-10" );
    	    	$( "#p_isubunit" ).addClass( "ibm-bgcolor-yellow-10" );
    	    }else{
    	    	
    	    }
    	    
    	    $("#isubunit" ).val( item.s_isubunit);
    	    
    	    
    	    $("#s_ijobrole" ).append( item.s_ijobrole);
    		$("#p_ijobrole" ).append( item.p_ijobrole);
    		
    	    if( item.s_ijobrole != item.p_ijobrole){
    	    	$( "#s_ijobrole" ).addClass( "ibm-bgcolor-yellow-10" );
    	    	$( "#p_ijobrole" ).addClass( "ibm-bgcolor-yellow-10" );
    	    }else{
    	    	
    	    }
    	    
    	    $("#ijobrole" ).val( item.s_ijobrole);
    	    
    	    
    	    $("#s_iskill" ).append( item.s_ijobrole);
    		$("#p_iskill" ).append( item.p_ijobrole);
    		
    	    if( item.s_iskill != item.p_iskill){
    	    	$( "#s_iskill" ).addClass( "ibm-bgcolor-yellow-10" );
    	    	$( "#p_iskill" ).addClass( "ibm-bgcolor-yellow-10" );
    	    }else{
    	    	
    	    }
    	    
    	    $("#iskill" ).val( item.s_iskill); 
      		  
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



 
 
	
	function SaveTestInfo(status)
{
		var inputstatus;
		
		
		/*
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
		 */
		
		
		
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
			"pwcode" : $('#ipwcode').val(),
			"description" : $('#idescription').val(),
			"unit" : $('#iunit').val(),
			"subunit" : $('#isubunit').val(),
			"jobrole" : $('#ijobrole').val(),
			"skill" : $('#iskill').val(),
			"status" : $('#istatus').val()  
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
	
	
	