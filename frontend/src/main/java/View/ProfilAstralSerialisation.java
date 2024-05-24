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
import modele.ProfilAstral;
import service.Service;

/**
 *
 * @author lsanchez
 */
public class ProfilAstralSerialisation extends Serialisation {

    public ProfilAstralSerialisation(Service service) {
        super(service);
    }
    @Override
    public void appliquer(HttpServletRequest request, HttpServletResponse response)  throws IOException {
        System.out.println("Profil Astral Serialisation");
        
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        JsonObject container = new JsonObject();
        
        ProfilAstral profilAstral = (ProfilAstral) request.getAttribute("profilAstral");
        
        container.addProperty("signeZodiaque", profilAstral.getSigneZodiaque());
        container.addProperty("signeChinois", profilAstral.getSigneChinois());
        container.addProperty("couleur", profilAstral.getCouleur());
        container.addProperty("animal", profilAstral.getAnimal());

        
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(gson.toJson(container));
        out.close();
    
        
    }
    
    
}
