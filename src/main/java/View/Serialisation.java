/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package View;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import service.Service;

/**
 *
 * @author rgouineaud
 */
public abstract class Serialisation {
        public abstract void appliquer(HttpServletRequest request,  HttpServletResponse response)  throws IOException ;
        Service service;
        public Serialisation(Service service){
            this.service = service;
        }
}
