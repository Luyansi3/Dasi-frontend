/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modele;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import modele.Client;
import modele.Employe;
import service.Service;

/**
 *
 * @author lsanchez
 */
public class VerificationConnexionAction extends Action {

    public VerificationConnexionAction(Service service) {
        super(service);
    }

    
    @Override
    public void executer(HttpServletRequest request) {
        System.out.println("Verif connexion Action");
        
        HttpSession session = request.getSession(false);
        
        
        
      if(session != null){
          
          if(session.getAttribute("type").equals("Client")){
              Client client = service.rechercherClientParId((Long) session.getAttribute("id"));
              request.setAttribute("connecte", true);
              request.setAttribute("type", "client");
              request.setAttribute("user", client);
          }
          else{
              Employe employe = service.rechercherEmployeParId((Long) session.getAttribute("id"));
              request.setAttribute("connecte", true);
              request.setAttribute("type", "employe");
              request.setAttribute("user", employe);
          }
          
      }
      else{
          request.setAttribute("connecte", false);
      }
        
        
    }
    
}
