/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modele;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import service.Service;

/**
 *
 * @author rgouineaud
 */
public class VoirCommentairesAction extends Action{
    
    
    public VoirCommentairesAction(Service service) {
        super(service);
    }
    
    @Override
    public void executer(HttpServletRequest request){
        System.out.println("Voir Commentaires Action");
        
        HttpSession session = request.getSession(false);
        
        if(session != null){
            if(session.getAttribute("type").equals("Employe")){
                request.setAttribute("commentaires", (List<String>) service.voirCommentaires());
                
            }
            else{
                System.out.println("Probleme de session employe");
            }
            
            
        }
        else{
            System.out.println("Probleme de connexion");
        }
    }
}
