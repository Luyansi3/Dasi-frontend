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
import com.google.maps.model.LatLng;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import modele.Astrologue;
import modele.Medium;
import modele.Spirit;
import service.Service;

/**
 *
 * @author lsanchez
 */
public class VoirStatistiqueSerialisation extends Serialisation {

    public VoirStatistiqueSerialisation(Service service) {
        super(service);
    }
    @Override
    public void appliquer(HttpServletRequest request, HttpServletResponse response)  throws IOException {
        System.out.println("Voir Statistique Serialisation");
        
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        JsonObject container = new JsonObject();
        JsonArray mediumArray = new JsonArray();
        JsonArray coordonneesArray = new JsonArray();
        
        List<Medium> mediums = (List<Medium>) request.getAttribute("top5");
        List<LatLng> map = (List<LatLng>) request.getAttribute("mapClient");
        
        
        if(map != null){
            
            container.addProperty("nbCoordonnees", map.size());
            for (int i=0; i <map.size(); i++){
                 JsonObject coordonnees = new JsonObject();
                 coordonnees.addProperty("latitude", map.get(i).lat);
                 coordonnees.addProperty("longitude", map.get(i).lng);
                coordonneesArray.add(coordonnees);
            }
            container.add("coordonnees",coordonneesArray );
            
            
        }
        else{
            container.addProperty("nbCoordonnees", 0);
        }
        
        
        if(mediums != null){
            container.addProperty("nbTop5",mediums.size());
            for(int i = 0; i < mediums.size(); i++){
                JsonObject medium = new JsonObject();
                medium.addProperty("denomination", mediums.get(i).getDenomination());
                medium.addProperty("genre", mediums.get(i).getGenre());
                medium.addProperty("presentation", mediums.get(i).getPresentation());
                medium.addProperty("nbConsultation", mediums.get(i).getNombreConsultations());
                medium.addProperty("typeMedium", mediums.get(i).getClass().getName().split("\\.")[1]);
                
                
                if(mediums.get(i) instanceof Spirit){
                    Spirit spirit = (Spirit) mediums.get(i);
                    medium.addProperty("nbSupport", spirit.getSupport().size());
                    JsonArray supports = new JsonArray();

                    for(int j=0; j<spirit.getSupport().size(); j++){
                        JsonObject support = new JsonObject();
                        
                        support.addProperty("Support " + (j+1), spirit.getSupport().get(j));
                        
                        supports.add(support);
                        
                    }
                    
                    
                    medium.add("supports",  supports);
                }
                
                else if (mediums.get(i) instanceof Astrologue){
                    Astrologue astrologue = (Astrologue) mediums.get(i);
                    
                    medium.addProperty("formation", astrologue.getFormation());
                    medium.addProperty("promotion", astrologue.getPromotion());
                }

                mediumArray.add(medium);
                
                
            }
            container.add("mediums", mediumArray);
            
        }
        else{
            container.addProperty("nbTop5", 0);
        }
        
       
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(gson.toJson(container));
        out.close();
        
        
    }
    
}
