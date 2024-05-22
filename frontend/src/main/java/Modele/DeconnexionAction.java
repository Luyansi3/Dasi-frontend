/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modele;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import service.Service;

/**
 *
 * @author lsanchez
 */
public class DeconnexionAction extends Action {

    public DeconnexionAction(Service service) {
        super(service);
    }
    @Override
    public void executer(HttpServletRequest request){
        System.out.println("Deconnexion Action");
        
        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }
        
    }
    
}
