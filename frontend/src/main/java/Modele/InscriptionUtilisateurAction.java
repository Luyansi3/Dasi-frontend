/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Modele;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import service.Service;
import modele.Client;

/**
 *
 * @author rgouineaud
 */
public class InscriptionUtilisateurAction extends Action{

    public InscriptionUtilisateurAction(Service service) {
        super(service);
    }

    @Override
    public void executer(HttpServletRequest request) {
         System.out.println("Inscription Utilisateur Action");
         
        
        Date date = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        
        try {
            date = dateFormat.parse(request.getParameter("dateNaissance"));
        } catch (ParseException ex) {
            Logger.getLogger(InscriptionUtilisateurAction.class.getName()).log(Level.SEVERE, null, ex);
        }
        Client user = new Client(request.getParameter("nom"), request.getParameter("prenom"),request.getParameter("genre"), request.getParameter("email"),request.getParameter("password"),request.getParameter("telephone"), request.getParameter("adresse"), date  );

        
        
        if (service.inscrireClient(user)){
            request.setAttribute("inscription", Boolean.TRUE);
            HttpSession session = request.getSession(true);
            session.setAttribute("id", user.getId());
            session.setAttribute("type", "Client");
        }
        else{
            request.setAttribute("inscription", Boolean.FALSE);
        }
        
        
         
        
         
    }
    
}
