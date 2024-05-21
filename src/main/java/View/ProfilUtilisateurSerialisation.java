/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package View;

import Modele.TestUtilisateur;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import modele.Client;
import service.Service;

/**
 *
 * @author rgouineaud
 */
public class ProfilUtilisateurSerialisation extends Serialisation {

    public ProfilUtilisateurSerialisation(Service service) {
        super(service);
    }
    @Override
    public void appliquer(HttpServletRequest request, HttpServletResponse response)  throws IOException {
        System.out.println("Profil Utilisateur appliqué");

        
        //format.format(date);
        
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        JsonObject container = new JsonObject();
        
        JsonObject user = new JsonObject();
        
        Client userObject = (Client) request.getAttribute("user");
        
        if(userObject == null){
            container.addProperty("connexion", Boolean.FALSE);
            System.out.println("REFUSED");
        }
        else{
            
            user.addProperty("id", (Long) userObject.getId());
            user.addProperty("nom", (String) userObject.getNom());
            user.addProperty("prenom", (String) userObject.getPrenom());
            user.addProperty("mail", (String) userObject.getMail());
            //user.addProperty("motDePasse", (String) userObject.getMotDePasse());



            container.addProperty("connexion", Boolean.TRUE);
            container.add("utilisateur", user);
        }

        
        
        
        
        
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(gson.toJson(container));
        out.close();
        
    }
    
    
}
