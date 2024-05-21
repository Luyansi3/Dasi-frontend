/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modele;

import javax.servlet.http.HttpServletRequest;
import service.Service;
import modele.Client;

/**
 *
 * @author rgouineaud
 */
public class AuthentifierUtilisateurAction extends Action {

    public AuthentifierUtilisateurAction(Service service) {
        super(service);
    }
    @Override
    public void executer(HttpServletRequest request){
        System.out.println("Authentifier Utilisateur Action");
        System.out.println("------------------------------------- " + service.authentifierClient(request.getParameter("login"), request.getParameter("password")));
          
        Client client = service.authentifierClient(request.getParameter("login"), request.getParameter("password"));
        
        if(client != null){
            request.setAttribute("user", client);
            request.setAttribute("type", "Client");
            System.out.println("ezaaez");
        }
        else{
            request.setAttribute("user", service.authentifierEmploye(request.getParameter("login"), request.getParameter("password")));
            request.setAttribute("type", "Employe");
        }
        
    }
    
}