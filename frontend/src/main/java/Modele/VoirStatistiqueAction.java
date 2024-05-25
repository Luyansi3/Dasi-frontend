/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modele;

import com.google.maps.model.LatLng;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import service.Service;
import modele.Medium;

/**
 *
 * @author lsanchez
 */
public class VoirStatistiqueAction extends Action {

    public VoirStatistiqueAction(Service service) {
        super(service);
    }
    @Override
    public void executer(HttpServletRequest request){
        System.out.println("Voir Statistique Action");
        
        request.setAttribute("top5",(List<Medium>) service.top5Medium());
        request.setAttribute("mapClient", (List<LatLng>) service.voirClientsMap());
    
    
    
    }
    
}
