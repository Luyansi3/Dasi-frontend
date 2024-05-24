/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modele;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import service.Service;
import modele.Client;
import modele.Employe;
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
        Employe employe = service.authentifierEmploye(request.getParameter("login"), request.getParameter("password"));
        
        if(client != null){
            request.setAttribute("user", (Client) client);
            request.setAttribute("type", "Client");
            HttpSession session = request.getSession(true);
            session.setAttribute("id", client.getId());
            session.setAttribute("type", "Client");

            
        }
        else if (employe != null){
            request.setAttribute("user", (Employe) employe);
            request.setAttribute("type", "Employe");
            HttpSession session = request.getSession(true);
            session.setAttribute("id", employe.getId());
            session.setAttribute("type", "Employe");

        }
        else{
            request.setAttribute("user", client);
            request.setAttribute("type", "Client");
        }
        
    }
    
}