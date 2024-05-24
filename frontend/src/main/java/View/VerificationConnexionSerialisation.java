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
import modele.Employe;
import service.Service;

/**
 *
 * @author lsanchez
 */
public class VerificationConnexionSerialisation extends Serialisation {

    public VerificationConnexionSerialisation(Service service) {
        super(service);
    }
    @Override
    public void appliquer(HttpServletRequest request, HttpServletResponse response)  throws IOException {
        System.out.println("Verification Connexion Serialisation");
        
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        JsonObject container = new JsonObject();
        JsonObject user = new JsonObject();
        
        
       
        if((boolean) request.getAttribute("connecte")){
            container.addProperty("connecte", true);
            if(request.getAttribute("type").equals("client")){
                Client client = (Client) request.getAttribute("user");
                
                user.addProperty("type", (String) "Client");
                user.addProperty("id", (Long) client.getId());
                user.addProperty("nom", (String) client.getNom());
                user.addProperty("prenom", (String) client.getPrenom());
                user.addProperty("mail", (String) client.getMail());
                user.addProperty("tel", (String) client.getTel());
                user.addProperty("adresse", (String) client.getAdressePostale());
                user.addProperty("consultation", (Boolean) client.getEnConsultation());
                user.addProperty("genre", (String) client.getGenre());
                
                container.add("utilisateur", user);
                
            }
            else{
                Employe employe = (Employe) request.getAttribute("user");
                
                user.addProperty("type", "Employe");
                user.addProperty("id", (Long) employe.getId());
                user.addProperty("nom", (String) employe.getNom());
                user.addProperty("prenom", (String) employe.getPrenom());
                user.addProperty("mail", (String) employe.getMail());
                user.addProperty("tel", (String) employe.getTel());
                user.addProperty("adresse", (String) employe.getAdressePostale());
                user.addProperty("disponibilite", (Boolean) employe.getDisponibilite());
                user.addProperty("nbConsultation", (int) employe.getNombreConsultations());
                
                container.add("utilisateur", user);
            }
        }
        else{
            container.addProperty("connecte", false);
        }
        
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(gson.toJson(container));
        out.close();
        
    }
    
}
