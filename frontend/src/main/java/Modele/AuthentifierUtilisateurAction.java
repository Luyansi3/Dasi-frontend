/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modele;

import javax.servlet.http.HttpServletRequest;
import service.Service;

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
                 
        request.setAttribute("user", service.authentifierClient(request.getParameter("login"), request.getParameter("password")));
    }
    
}