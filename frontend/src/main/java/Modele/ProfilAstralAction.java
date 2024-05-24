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

/**
 *
 * @author lsanchez
 */
public class ProfilAstralAction extends Action {

    public ProfilAstralAction(Service service) {
        super(service);
    }

    
    @Override
    public void executer(HttpServletRequest request) {
        System.out.println("Profil Astral Action");
        
        HttpSession session = request.getSession(false);
        
        if(session != null){
            if(session.getAttribute("type").equals("Client")){
                Client client = (Client) service.rechercherClientParId((Long) session.getAttribute("id"));
                request.setAttribute("profilAstral", client.getProfilAstral());
                
            }
        }
        else{
            System.out.println("Probleme session");
        }
        
    }
    
}
