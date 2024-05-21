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
 * @author rgouineaud
 */
public class AjouterConsultationAction extends Action {

    public AjouterConsultationAction(Service service) {
        super(service);
    }
    @Override
    public void executer(HttpServletRequest request){
        System.out.println("Ajouter Consultation Action");
        HttpSession session = request.getSession(true);
        Client client = (Client) service.rechercherClientParId((Long) session.getAttribute("id"));
        
        request.setAttribute("consultation", service.ajouterConsultation(client, request.getParameter("medium")));
    }
    
}
