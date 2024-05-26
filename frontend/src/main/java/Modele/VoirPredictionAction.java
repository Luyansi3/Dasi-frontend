/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modele;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import service.Service;
import modele.Client;
import modele.Consultation;

/**
 *
 * @author lsanchez
 */
public class VoirPredictionAction extends Action {

    public VoirPredictionAction(Service service) {
        super(service);
    }
    @Override
    public void executer(HttpServletRequest request){
        System.out.println("Voir Prediction Action");
        
        HttpSession session = request.getSession(false);
        
        if(session != null){
            if(session.getAttribute("type").equals("Employe")){
                Consultation consultation = (Consultation) service.rechercherConsultationEnCoursEmploye((Long) session.getAttribute("id"));
                Client client = consultation.getClient();
                
                request.setAttribute("predictions", (List<String>) service.obtenirPredictions(client, Integer.parseInt(request.getParameter("noteAmour")),Integer.parseInt(request.getParameter("noteSante")), Integer.parseInt( request.getParameter("noteCarriere"))));
                
            }
            else{
                System.out.println("Probleme de session employe");
            }
            
            
        }
        else{
            System.out.println("Probleme de connexion");
        }
    }
}
