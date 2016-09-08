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
	
	var searchquery = "";
	
    	xhrGet(REST_DATA  , function(data){  
    		
    		//stop showing loading message  
   
    		
    		var receivedItems = data.body || [];
    		var items = [];
    		var i;
    		
    		var item ;
    		
    		var html;
    		
    		html = "<table id='test1table' data-widget='datatable' data-info='false' data-ordering='false' data-paging='false' data-searching='false'" +
			" class='ibm-data-table ibm-padding-small ibm-grid '> " +
			" <thead><tr><th style='width:40px'></th><th>Status</th><th>PW Code</th><th>Description</th><th>Created Date</th><th>Updated Date</th>" +
			" </tr></thead><tbody>"; 
			
    	
    		for(i = 0; i < receivedItems.length; ++i){
    			item = receivedItems[i];
    			if(item && 'id' in item){
    				

    				html = html + "<tr>"+
    				"<td><a style='min-width:50px;min-height50px;margin-bottom: 5px;font-weight:bolder;' href='/certref.html?id=" +   item.id + "' class='ibm-btn-sec'>View</a></td>"+
    				"<td>"+ item.status  +"</td>"+
    				"<td>"+ item.pwcode  +"</td>"+
    				"<td>"+ item.description  +"</td>"+
    				"<td>"+ item.modified_date  +"</td>"+
    				"<td>"+ item.creation_date  +"</td>";  
    			}
    		}
    		
    		
    		html = html + "</tbody></table>"
	 
    		
    		console.log(html); 
    		 $('#tcertref_content').append(html);  
   		  
    	}, function(err){
    		console.log(err);
    		//stop showing loading message
    		document.getElementById('errorDiv').innerHTML = err;
    		
    	});
    }

 

 


loadItems(); 



	
	
	