/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modele;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import modele.Consultation;
import service.Service;

/**
 *
 * @author lsanchez
 */
public class FinConsultationAction extends Action {

    public FinConsultationAction(Service service) {
        super(service);
    }
    @Override
    public void executer(HttpServletRequest request){
        System.out.println("Fin Consultation Action");
        
        HttpSession session = request.getSession(false);
        
        if(session != null){
            if(session.getAttribute("type").equals("Employe")){
                
                Consultation consultation = (Consultation) service.rechercherConsultationEnCoursEmploye((Long) session.getAttribute("id"));
                request.setAttribute("finie", service.finConsultation(consultation));
                
            }
            
            
        }
        else{
            System.out.println("Probleme de connexion");
        }
    
    }
    
}
