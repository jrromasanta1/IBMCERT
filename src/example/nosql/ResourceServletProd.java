package example.nosql;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Part;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.cloudant.client.api.Database;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.internal.LinkedTreeMap;

@Path("/ibmcert")
/**
 * CRUD service of todo list table. It uses REST style.
 */
public class ResourceServletProd {

	public ResourceServletProd() {
	}
 

	@GET 
	@Produces(MediaType.APPLICATION_JSON)
	public Response get(@QueryParam("id") Long id, @QueryParam("cmd") String cmd) throws Exception {

		
		Database dbprod  = null;
		JsonObject resultObject  ;

		JsonArray jsonArray ;
		
		JsonObject jsonObject; 
		try {	
			dbprod = getDBProd();
			System.out.println("cloud connection success prod!");
		} catch (Exception re) {
			re.printStackTrace();
			System.out.println("cloud connection FAIL:" + re.getMessage() );
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		} 
   
		 resultObject = new JsonObject();
		 jsonArray = new JsonArray();
		 
	
		 HashMap<String, Object> objprod ;

		if (id == null) {
			System.out.println("all");
			try {
				// get all the document present in database
				List<HashMap> allDocs = dbprod.getAllDocsRequestBuilder().includeDocs(true).build().getResponse()
						.getDocsAs(HashMap.class);

				if (allDocs.size() == 0) {
					allDocs = initializeSampleData(dbprod);
				}

	
				
				for (HashMap doc : allDocs) {
					objprod = dbprod.find(HashMap.class, doc.get("_id") + "");
				   jsonObject = new JsonObject();
															
					jsonObject.addProperty("id", objprod.get("_id") + "");
					jsonObject.addProperty("name", objprod.get("name") + "");
					jsonObject.addProperty("value", objprod.get("value") + ""); 
					jsonObject.addProperty("idescription", objprod.get("description") + "");
					jsonObject.addProperty("ipwcode", objprod.get("pwcode") + "");
					jsonObject.addProperty("iunit", objprod.get("unit") + "");
					jsonObject.addProperty("isubunit", objprod.get("subunit") + "");
					jsonObject.addProperty("ijobrole", objprod.get("jobrole") + "");
					jsonObject.addProperty("iskill", objprod.get("skill") + "");
					jsonObject.addProperty("email", objprod.get("email") + "");
					jsonObject.addProperty("fname", objprod.get("fname") + "");   
					jsonObject.addProperty("modified_date", objprod.get("modified_date") + "");
					jsonObject.addProperty("creation_date", objprod.get("creation_date") + "");
					
					
					jsonArray.add(jsonObject);
					
					
					
				} 
			} catch (Exception dnfe) { 
				System.out.println("Exception thrown : " + dnfe.getMessage());
			}

			resultObject.addProperty("id", "all");
			resultObject.add("body", jsonArray);

			return Response.ok(resultObject.toString()).build();
		}
		else 
		{
			System.out.println("Fetch id : " + id); 
		// FOR GETTING ONE obj
			try {
				System.out.println("sect 1"); 
				 resultObject = new JsonObject();
				System.out.println("sect 2");
				 jsonArray = new JsonArray();
				 System.out.println("sect 3");
				 jsonObject = new JsonObject();
				 System.out.println("sect 4");
			
				 try {
					 objprod = dbprod.find(HashMap.class, id + "");
						 } catch (Exception dnfe) {
							 objprod = null; 
						 }
				 
			 
			  
		     // prod
			 if (objprod != null){
					jsonObject.addProperty("id", objprod.get("_id") + "");
					jsonObject.addProperty("name", objprod.get("name") + "");
					jsonObject.addProperty("value", objprod.get("value") + ""); 
					jsonObject.addProperty("idescription", objprod.get("description") + "");
					jsonObject.addProperty("ipwcode", objprod.get("pwcode") + "");
					jsonObject.addProperty("iunit", objprod.get("unit") + "");
					jsonObject.addProperty("isubunit", objprod.get("subunit") + "");
					jsonObject.addProperty("ijobrole", objprod.get("jobrole") + "");
					jsonObject.addProperty("iskill", objprod.get("skill") + "");
					jsonObject.addProperty("email", objprod.get("email") + "");
					jsonObject.addProperty("fname", objprod.get("fname") + "");   
					jsonObject.addProperty("modified_date", objprod.get("modified_date") + "");
					jsonObject.addProperty("creation_date", objprod.get("creation_date") + "");
			 }	else {
					jsonObject.addProperty("p_idescription",  "");
					jsonObject.addProperty("p_ipwcode", "");
					jsonObject.addProperty("p_iunit", "");
					jsonObject.addProperty("p_isubunit",  "");
					jsonObject.addProperty("p_ijobrole",  "");
					jsonObject.addProperty("p_iskill",  "");
					jsonObject.addProperty("status",  "");
				}
			  
			 
			jsonArray.add(jsonObject); 
			
			resultObject.addProperty("id", id + "");
			resultObject.add("body", jsonArray);
			 
		
			 
			 
			} catch (Exception dnfe) {
				System.out.println("Exception thrown : " + dnfe.getMessage()); 
			}
	  
			

			return Response.ok(resultObject.toString()).build();
			
		} 
	}
	


	private JsonArray getAttachmentList(LinkedTreeMap<String, Object> attachmentList, String docID) {
		JsonArray attachmentArray = new JsonArray();

		for (Object key : attachmentList.keySet()) {
			LinkedTreeMap<String, Object> attach = (LinkedTreeMap<String, Object>) attachmentList.get(key);

			JsonObject attachedObject = new JsonObject();
			// set the content type of the attachment
			attachedObject.addProperty("content_type", attach.get("content_type").toString());
			// append the document id and attachment key to the URL
			attachedObject.addProperty("url", "attach?id=" + docID + "&key=" + key);
			// set the key of the attachment
			attachedObject.addProperty("key", key + "");

			// add the attachment object to the array
			attachmentArray.add(attachedObject);
		}

		return attachmentArray;
	}

	private JsonObject toJsonObject(HashMap<String, Object> obj) {
		JsonObject jsonObject = new JsonObject();
		LinkedTreeMap<String, Object> attachments = (LinkedTreeMap<String, Object>) obj.get("_attachments");
		if (attachments != null && attachments.size() > 0) {
			JsonArray attachmentList = getAttachmentList(attachments, obj.get("_id") + "");
			jsonObject.add("attachements", attachmentList);
		}
		jsonObject.addProperty("id", obj.get("_id") + "");
		jsonObject.addProperty("name", obj.get("name") + "");
		jsonObject.addProperty("pwcode", obj.get("pwcode") + "");
		jsonObject.addProperty("description", obj.get("description") + "");
		jsonObject.addProperty("unit", obj.get("unit") + "");
		jsonObject.addProperty("subunit", obj.get("subunit") + "");
		jsonObject.addProperty("jobrole", obj.get("jobrole") + "");
		jsonObject.addProperty("skill", obj.get("skill") + "");
		jsonObject.addProperty("status", obj.get("status") + "");
		jsonObject.addProperty("modified_date", obj.get("modified_date") + "");
		
		  
	
		return jsonObject;
	}



	/*
	 * Create a document and Initialize with sample data/attachments
	 */
	private List<HashMap> initializeSampleData(Database db) throws Exception {

		long id = System.currentTimeMillis();
		String name = "Sample category";
		String value = "List of sample files";

		// create a new document
		System.out.println("Creating new document with id : " + id);
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("name", name);
		data.put("_id", id + "");
		data.put("value", value);
		data.put("creation_date", new Date().toString());
		db.save(data);

		// attach the object
		HashMap<String, Object> obj = db.find(HashMap.class, id + "");

		// attachment#1
		File file = new File("Sample.txt");
		file.createNewFile();
		PrintWriter writer = new PrintWriter(file);
		writer.write("This is a sample file...");
		writer.flush();
		writer.close();
		FileInputStream fileInputStream = new FileInputStream(file);
		db.saveAttachment(fileInputStream, file.getName(), "text/plain", id + "", (String) obj.get("_rev"));
		fileInputStream.close();

		return db.getAllDocsRequestBuilder().includeDocs(true).build().getResponse().getDocsAs(HashMap.class);

	}


	
	private Database getDBProd() {   
		return CloudantClientMgrProd.getDB(); 
	}
 
}
