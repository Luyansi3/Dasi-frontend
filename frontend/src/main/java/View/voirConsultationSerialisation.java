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
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import modele.Consultation;
import service.Service;
import modele.Cartomancien;

/**
 *
 * @author lsanchez
 */
public class VoirConsultationSerialisation extends Serialisation {

    public VoirConsultationSerialisation(Service service) {
        super(service);
    }
    @Override
    public void appliquer(HttpServletRequest request, HttpServletResponse response)  throws IOException {
        System.out.println("Voir Consultation Serialisation");
        
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        JsonObject container = new JsonObject();
        
        JsonArray consultationsJson = new JsonArray();

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        
        List<Consultation> consultations = (List<Consultation>) request.getAttribute("consultations");
        
        if(consultations != null){
            int compteur=0; 

            for(int i = 0; i<consultations.size(); i++){
                if(consultations.get(i).getValidation()){
                    compteur +=1; 
                    JsonObject consultationJson = new JsonObject();

                    consultationJson.addProperty("commentaire", consultations.get(i).getCommentaire());
                    consultationJson.addProperty("date", dateFormat.format(consultations.get(i).getDate()));
                    consultationJson.addProperty("nomMedium", consultations.get(i).getMedium().getDenomination());
                    consultationJson.addProperty("genreMedium", consultations.get(i).getMedium().getGenre());
                    consultationJson.addProperty("typeMedium", consultations.get(i).getMedium().getClass().getName().split("\\.")[1]);


                    consultationsJson.add(consultationJson);    
                }
            }
            container.addProperty("nbConsultation", compteur);
            container.add("consultations", consultationsJson);
        }
        else{
            container.addProperty("nbConsultation", 0);
        }
        
        
        
        
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(gson.toJson(container));
        out.close();
        
    }
    
}
