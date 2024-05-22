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
         
        Client user = new Client();
        Date date = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        
        try {
            date = dateFormat.parse(request.getParameter("dateNaissance"));
        } catch (ParseException ex) {
            Logger.getLogger(InscriptionUtilisateurAction.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        user.setAdressePostale(request.getParameter("adresse"));
        user.setMail(request.getParameter("email"));
        user.setDateNaissance(date);
        user.setGenre(request.getParameter("genre"));
        user.setMotDePasse(request.getParameter("password"));
        user.setNom(request.getParameter("nom"));
        user.setPrenom(request.getParameter("prenom"));
        user.setTel(request.getParameter("telephone"));
        
        
        if (service.inscrireClient(user)){
            request.setAttribute("inscription", Boolean.TRUE);
            HttpSession session = request.getSession(true);
            System.out.println(user.getId());
            session.setAttribute("id", user.getId());
        }
        else{
            request.setAttribute("inscription", Boolean.FALSE);
        }
        
        
         
        
         
    }
    
}
