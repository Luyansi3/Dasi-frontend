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
import modele.Medium;
import service.Service;

/**
 *
 * @author rgouineaud
 */
public class ListeMediumSerialisation extends Serialisation{

    public ListeMediumSerialisation(Service service) {
        super(service);
    }

    @Override
    public void appliquer(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("Serial : Affichage medium");
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        JsonObject container = new JsonObject();
        
        List<Medium> mediums = (List<Medium>) request.getAttribute("mediums");
        
        JsonArray mediumArray = new JsonArray();
        if(mediums == null){
            container.addProperty("Medium_trouve", Boolean.FALSE);
        }
        else{
            container.addProperty("Medium_trouve", Boolean.TRUE);
            
            for(int i = 0; i < mediums.size(); i++){
                JsonObject medium = new JsonObject();
                medium.addProperty("denomination", mediums.get(i).getDenomination());
                medium.addProperty("genre", mediums.get(i).getGenre());
                medium.addProperty("presentation", mediums.get(i).getPresentation());
                medium.addProperty("nbConsultation", mediums.get(i).getNombreConsultations());                
                mediumArray.add(medium);
            }
            
            container.add("medium", mediumArray);
        }
        
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(gson.toJson(container));
        out.close();
    }
   
}
