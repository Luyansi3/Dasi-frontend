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
public class ValiderCommentaireAction extends Action {

    public ValiderCommentaireAction(Service service) {
        super(service);
    }
    @Override
    public void executer(HttpServletRequest request){
        System.out.println("Valider Commentaire Action");
        
        HttpSession session = request.getSession(false);
        
        if(session != null){
            if(session.getAttribute("type").equals("Employe")){
                
                Consultation consultation = (Consultation) service.rechercherConsultationEnCoursEmploye((Long) session.getAttribute("id"));
                request.setAttribute("enregistre", service.validerCommentaire(consultation, request.getParameter("commentaire")));
                
            }
            
            
        }
        else{
            System.out.println("Probleme de connexion");
        }
    
    }
    
}
