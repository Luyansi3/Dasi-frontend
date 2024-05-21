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
import service.Service;

/**
 *
 * @author rgouineaud
 */
public class InscriptionUtilisateurSerialisation extends Serialisation{

    public InscriptionUtilisateurSerialisation(Service service) {
        super(service);
    }

    @Override
    public void appliquer(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("Inscirption Utilisateur Serialisation");
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        JsonObject container = new JsonObject();
        if( (boolean) request.getAttribute("inscription")){
            container.addProperty("inscription", Boolean.TRUE);
        }else{
            container.addProperty("inscription", Boolean.FALSE);
        }
        
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(gson.toJson(container));
        out.close();
        
    }
    
}
