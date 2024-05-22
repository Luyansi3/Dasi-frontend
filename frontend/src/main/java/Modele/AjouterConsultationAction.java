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
import modele.Client;
import modele.Medium;

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
        Medium medium = (Medium) service.rechercherMediumParNom(request.getParameter("medium"));
        
        request.setAttribute("consultation", service.ajouterConsultation(client, medium));
    }
    
}
