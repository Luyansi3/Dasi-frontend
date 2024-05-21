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
public abstract class Action {
    public abstract void executer(HttpServletRequest request) ;
    Service service;
    public Action(Service service){
        this.service = service;
    }
    
}
