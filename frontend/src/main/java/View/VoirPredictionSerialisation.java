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
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import service.Service;

/**
 *
 * @author lsanchez
 */
public class VoirPredictionSerialisation extends Serialisation {

    public VoirPredictionSerialisation(Service service) {
        super(service);
    }
    @Override
    public void appliquer(HttpServletRequest request, HttpServletResponse response)  throws IOException {
        System.out.println("Voir Prediction Serialisation");
        
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();
        JsonObject container = new JsonObject();
        
        List<String> predictions = (List<String>) request.getAttribute("predictions");
        
        
        container.addProperty(("predictionAmour"), predictions.get(0));
         container.addProperty(("predictionSante"), predictions.get(1));
          container.addProperty(("predictionCarriere"), predictions.get(2));
       
        
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println(gson.toJson(container));
        out.close();
    }
}
