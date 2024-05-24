/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modele;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import modele.Client;
import service.Service;


/**
 *
 * @author lsanchez
 */
public class voirConsultationAction extends Action {

    public voirConsultationAction(Service service) {
        super(service);
    }

    
    @Override
    public void executer(HttpServletRequest request) {
        System.out.println("Profil Astral Action");
        
        HttpSession session = request.getSession(false);
        
        if(session != null){
            if(session.getAttribute("type").equals("Client")){
                
                Client client = (Client) service.rechercherClientParId((Long) session.getAttribute("id"));
                
                request.setAttribute("consultations", client.getConsultations());
                
            }
        }
        else{
            System.out.println("Probleme session");
        }
    
}}
