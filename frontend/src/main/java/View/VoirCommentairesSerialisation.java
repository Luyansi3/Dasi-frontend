/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package View;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import service.Service;

/**
 *
 * @author rgouineaud
 */
public class VoirCommentairesSerialisation extends Serialisation{
    public VoirCommentairesSerialisation(Service service) {
        super(service);
    }
    @Override
    public void appliquer(HttpServletRequest request, HttpServletResponse response)  throws IOException {
        System.out.println("Voir Commentaires Serialisation");
        
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        JsonObject container = new JsonObject();
        
        List<String> commentaires = (List<String>) request.getAttribute("commentaires");
        
       JsonArray commentairesArray = new JsonArray();
        if(commentaires == null){
            container.addProperty("Commentaires_trouves", Boolean.FALSE);
        }
        else{
            container.addProperty("Commentaires_trouves", Boolean.TRUE);
            
            for(int i = 0; i < commentaires.size(); i++){
                JsonObject commentaire = new JsonObject();
                commentaire.addProperty("commentaire", commentaires.get(i));             
                commentairesArray.add(commentaire);
            }
            
            container.add("commentaires", commentairesArray);
        }
        
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(gson.toJson(container));
        out.close();
    }
}
