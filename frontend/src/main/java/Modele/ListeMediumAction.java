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
public class ListeMediumAction extends Action {

    public ListeMediumAction(Service service) {
        super(service);
    }

    
    @Override
    public void executer(HttpServletRequest request) {
        System.out.println("Action : Affichage mediums");
        request.setAttribute("mediums", service.voirMedium());
    }
    
    
}
