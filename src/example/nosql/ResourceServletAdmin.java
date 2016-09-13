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

@Path("/admin")
/**
 * CRUD service of todo list table. It uses REST style.
 */
public class ResourceServletAdmin {

	public ResourceServletAdmin() {
	}
 
	@POST 
	public Response create(@QueryParam("id") String id, @FormParam("name") String name, @FormParam("value") String value,
			 @FormParam("pwcode") String pwcode,  @FormParam("description") String description,  @FormParam("unit") String unit,
			 @FormParam("subunit") String subunit,  @FormParam("jobrole") String jobrole ,  @FormParam("skill") String skill,  @FormParam("status") String status)
			throws Exception {

		Database dbprod = null;
		try {
			dbprod = getDBProd();
		} catch (Exception re) {
			re.printStackTrace();
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		} 

		String idString = id == null ? null : id.toString();
		 
		
		System.out.println("enter post" + idString);
		
		JsonObject resultObject = create(dbprod, idString, name, value, pwcode, description,unit, subunit ,jobrole , skill, status,  null, null);

		System.out.println("Create Successful.");

		return Response.ok(resultObject.toString()).build();
	}
	
	
	

	protected JsonObject create(Database db, String id, String name, String value, String pwcode, String description, 
			String unit, String subunit, String jobrole , String skill, String status, Part part, String fileName)
			throws IOException {
		
		JsonObject resultObject  = new JsonObject();
		JsonArray jsonArray = new JsonArray();
		JsonObject jsonObject = new JsonObject();  
		 
		
		// check if document exist
		
		System.out.println("id input: " + id);  
		HashMap<String, Object> obj = (id == null) ? null : db.find(HashMap.class, id);

		
		
		if (obj == null) {
			
			System.out.println("new doc.");
			// if new document

			//id = String.valueOf(System.currentTimeMillis());
			//will use save id as stage 

			// create a new document
			System.out.println("Creating new document with id : " + id);
			Map<String, Object> data = new HashMap<String, Object>();
			data.put("name", name);
			data.put("_id", id);
			data.put("value", value);
			data.put("pwcode", pwcode);
			data.put("description", description);
			data.put("unit", unit);
			data.put("subunit", subunit);
			data.put("jobrole", jobrole);
			data.put("skill", skill);
			data.put("status", status); 
			data.put("creation_date", new Date().toString());
			data.put("modified_date", new Date().toString());
			db.save(data); 

			// attach the attachment object
			obj = db.find(HashMap.class, id); 
			saveAttachment(db, id, part, fileName, obj); 
		} else {
			
			System.out.println("update doc:" + id);
			// if existing document
			// attach the attachment object
			saveAttachment(db, id, part, fileName, obj);

			// update other fields in the document
			obj = db.find(HashMap.class, id);
			obj.put("name", name);
			obj.put("value", value);
			obj.put("pwcode", pwcode);
			obj.put("description", description);
			obj.put("unit", unit);
			obj.put("subunit", subunit);
			obj.put("jobrole", jobrole);
			obj.put("skill", skill);  
			obj.put("status", status); 
			obj.put("modified_date", new Date().toString());
			db.update(obj); 
		} 

		obj = db.find(HashMap.class, id);
		
		
		 resultObject = toJsonObject(obj);
		
		
	 
		//jsonArray.add(jsonObject); 
		//resultObject.add("body", jsonArray);
		return resultObject;
	}

	@GET 
	@Produces(MediaType.APPLICATION_JSON)
	public Response get(@QueryParam("id") Long id, @QueryParam("cmd") String cmd) throws Exception {

		Database dbstage  = null;
		Database dbprod  = null;
		JsonObject resultObject  ;

		JsonArray jsonArray ;
		
		JsonObject jsonObject; 
		try {
			dbstage = getDBStage();
			System.out.println("cloud connection success stage!");
			dbprod = getDBProd();
			System.out.println("cloud connection success prod!");
		} catch (Exception re) {
			re.printStackTrace();
			System.out.println("cloud connection FAIL:" + re.getMessage() );
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
   
		 resultObject = new JsonObject();
		 jsonArray = new JsonArray();
		 HashMap<String, Object> objstage ;
		 HashMap<String, Object> objprod ;

		if (id == null) {
			System.out.println("all");
			try {
				// get all the document present in database
				List<HashMap> allDocs = dbstage.getAllDocsRequestBuilder().includeDocs(true).build().getResponse()
						.getDocsAs(HashMap.class);

				if (allDocs.size() == 0) {
					allDocs = initializeSampleData(dbstage);
				}

				for (HashMap doc : allDocs) {
					objstage = dbstage.find(HashMap.class, doc.get("_id") + "");
				   jsonObject = new JsonObject();
					
					jsonObject.addProperty("id", objstage.get("_id") + "");
					jsonObject.addProperty("name", objstage.get("name") + "");
					jsonObject.addProperty("value", objstage.get("value") + ""); 
					jsonObject.addProperty("description", objstage.get("description") + "");
					jsonObject.addProperty("pwcode", objstage.get("pwcode") + "");
					jsonObject.addProperty("unit", objstage.get("unit") + "");
					jsonObject.addProperty("subunit", objstage.get("subunit") + "");
					jsonObject.addProperty("jobrole", objstage.get("jobrole") + "");
					jsonObject.addProperty("skill", objstage.get("skill") + "");
					jsonObject.addProperty("status", objstage.get("status") + "");
					jsonObject.addProperty("modified_date", objstage.get("modified_date") + "");
					jsonObject.addProperty("creation_date", objstage.get("creation_date") + "");
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
			
			
			objstage = dbstage.find(HashMap.class, id + "");
			 
			 System.out.println("sect 5-inside");   
			  
		     // stage
			 if (objstage != null){
			jsonObject.addProperty("id", objstage.get("_id") + "");
			jsonObject.addProperty("name", objstage.get("name") + "");
			jsonObject.addProperty("value", objstage.get("value") + ""); 
			jsonObject.addProperty("s_idescription", objstage.get("description") + "");
			jsonObject.addProperty("s_ipwcode", objstage.get("pwcode") + "");
			jsonObject.addProperty("s_iunit", objstage.get("unit") + "");
			jsonObject.addProperty("s_isubunit", objstage.get("subunit") + "");
			jsonObject.addProperty("s_ijobrole", objstage.get("jobrole") + "");
			jsonObject.addProperty("s_iskill", objstage.get("skill") + "");
			jsonObject.addProperty("status", objstage.get("status") + "");
			jsonObject.addProperty("modified_date", objstage.get("modified_date") + "");
			jsonObject.addProperty("creation_date", objstage.get("creation_date") + "");
			 }
			 
			 
			 System.out.println("sect 6-middle");
		 	
			//prod 

			 
			  /*
			objprod = dbprod.find(HashMap.class, id + "");
			
			 System.out.println("sect 7-inside");
			 
			if (objprod != null){
			jsonObject.addProperty("p_idescription", objprod.get("description") + "");
			jsonObject.addProperty("p_ipwcode", objprod.get("pwcode") + "");
			jsonObject.addProperty("p_iunit", objprod.get("unit") + "");
			jsonObject.addProperty("p_isubunit", objprod.get("subunit") + "");
			jsonObject.addProperty("p_ijobrole", objprod.get("jobrole") + "");
			jsonObject.addProperty("p_iskill", objprod.get("skill") + "");
			jsonObject.addProperty("status", objprod.get("status") + "");
			}	
			
			*/ 
		
			 System.out.println("sect 8");
			jsonArray.add(jsonObject); 
			
			resultObject.addProperty("id", id + "");
			resultObject.add("body", jsonArray);
			 
			 System.out.println("sect 9");
			 
			 
			} catch (Exception dnfe) {
				System.out.println("Exception thrown : " + dnfe.getMessage()); 
			}
	 
			

			return Response.ok(resultObject.toString()).build();
			
		} 
	}
	

	@DELETE
	public Response delete(@QueryParam("id") long id) {

		Database db = null;
		try {
			db = getDBStage();
		} catch (Exception re) {
			re.printStackTrace();
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}

		// check if document exist
		HashMap<String, Object> obj = db.find(HashMap.class, id + "");

		if (obj == null) {
			return Response.status(Response.Status.NOT_FOUND).build();
		} else {
			db.remove(obj);

			System.out.println("Delete Successful.");

			return Response.ok("OK").build();
		}
	}

	@PUT
	public Response update(@QueryParam("id") long id, @QueryParam("name") String name,
			@QueryParam("value") String value) {

		Database db = null;
		try {
			db = getDBStage();
		} catch (Exception re) {
			re.printStackTrace();
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}

		// check if document exist
		HashMap<String, Object> obj = db.find(HashMap.class, id + "");

		if (obj == null) {
			return Response.status(Response.Status.NOT_FOUND).build();
		} else {
			obj.put("name", name);
			obj.put("value", value);

			db.update(obj);

			System.out.println("Update Successful.");

			return Response.ok("OK").build();
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

	private void saveAttachment(Database db, String id, Part part, String fileName, HashMap<String, Object> obj)
			throws IOException {
		if (part != null) {
			InputStream inputStream = part.getInputStream();
			try {
				db.saveAttachment(inputStream, fileName, part.getContentType(), id, (String) obj.get("_rev"));
			} finally {
				inputStream.close();
			}
		}
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

	private Database getDBStage() {
		return CloudantClientMgrStage.getDB(); 
	}
	
	private Database getDBProd() {   
		return CloudantClientMgrProd.getDB();
	}
 
}
