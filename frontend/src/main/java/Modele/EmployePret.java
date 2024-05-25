/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modele;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import modele.Client;
import modele.Consultation;
import service.Service;

/**
 *
 * @author lsanchez
 */
public class EmployePret extends Action {

    public EmployePret(Service service) {
        super(service);
    }

    
    @Override
    public void executer(HttpServletRequest request) {
        System.out.println("Verif connexion Action");
        
        HttpSession session = request.getSession(false);
        
        
        
    if(session != null){
        if(session.getAttribute("type").equals("Employe")){
                
                Consultation consultation = service.rechercherConsultationEnCoursEmploye((Long) session.getAttribute("id"));
                if(service.etrePret(consultation)){
                    System.out.println("Message envoyé");
                }
                else{
                    System.out.println("Problème Message non envoyé");
                }
                
                
            }
    
    }
    else{
        System.out.println("Problème de connexion");
    }
    
    
    
    }
    
}
