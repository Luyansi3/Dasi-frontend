/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package View;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import modele.Client;
import modele.Consultation;
import service.Service;

/**
 *
 * @author lsanchez
 */
public class RechercheConsultationSerialisation extends Serialisation {

    public RechercheConsultationSerialisation(Service service) {
        super(service);
    }
    @Override
    public void appliquer(HttpServletRequest request, HttpServletResponse response)  throws IOException {
        System.out.println("Profil Astral Serialisation");
        
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        JsonObject container = new JsonObject();
        
        Consultation consultation = (Consultation) request.getAttribute("consultation");
        
        if(consultation != null){
            
            container.addProperty("consultationEnAttente", true);
            Client client = (Client) consultation.getClient();
            JsonObject user = new JsonObject();
            user.addProperty("type", (String) "Client");
            user.addProperty("id", (Long) client.getId());
            user.addProperty("nom", (String) client.getNom());
            user.addProperty("prenom", (String) client.getPrenom());
            user.addProperty("mail", (String) client.getMail());
            user.addProperty("tel", (String) client.getTel());
            user.addProperty("adresse", (String) client.getAdressePostale());
            user.addProperty("consultation", (Boolean) client.getEnConsultation());
            user.addProperty("genre", (String) client.getGenre());
            container.add("client", user);
        }
        else{
            container.addProperty("consultationEnAttente", false);
        }
        
        
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(gson.toJson(container));
        out.close();
        
    }
    
}
