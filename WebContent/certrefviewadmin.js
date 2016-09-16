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
    				"<td><a style='min-width:50px;min-height50px;margin-bottom: 5px;font-weight:bolder;' href='/certrefadmin.html?id=" +   item.id + "' class='ibm-btn-sec'>View</a></td>"+
    				"<td>"+ item.status  +"</td>"+
    				"<td>"+ item.ipwcode  +"</td>"+
    				"<td>"+ item.idescription  +"</td>"+
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

 









	
	
	