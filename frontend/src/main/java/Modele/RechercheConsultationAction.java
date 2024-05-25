/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modele;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import service.Service;
import modele.Consultation;

/**
 *
 * @author lsanchez
 */
public class RechercheConsultationAction extends Action {

    public RechercheConsultationAction(Service service) {
        super(service);
    }
    @Override
    public void executer(HttpServletRequest request){
        System.out.println("Recherche Consultation Action");
        
        HttpSession session = request.getSession(false);
        
        if(session != null){
            if(session.getAttribute("type").equals("Employe")){
                
                Consultation consultation = service.rechercherConsultationEnCoursEmploye((Long) session.getAttribute("id"));
                
                request.setAttribute("consultation", consultation);
                
                
            }
        }
        else{
            System.out.println("Probleme connexion");
        }
    
    }
    
}
