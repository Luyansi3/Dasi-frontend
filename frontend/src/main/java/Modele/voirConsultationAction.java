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
public class VoirConsultationAction extends Action {

    public VoirConsultationAction(Service service) {
        super(service);
    }

    
    @Override
    public void executer(HttpServletRequest request) {
        System.out.println("Voir Consultation Action");
        
        HttpSession session = request.getSession(false);
        
        if(session != null){
            if(session.getAttribute("type").equals("Client")){
                
                Client client = (Client) service.rechercherClientParId((Long) session.getAttribute("id"));
                
                request.setAttribute("consultations", client.getConsultations());
                
            }
            else if(session.getAttribute("type").equals("Employe")){
                
                Consultation consultation = service.rechercherConsultationEnCoursEmploye((Long) session.getAttribute("id"));
                Client client = (Client) service.rechercherClientParId((Long) consultation.getClient().getId());
                
                request.setAttribute("consultations", client.getConsultations());
            }
        }
        else{
            System.out.println("Probleme session");
        }
    
}}
