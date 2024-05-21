package Controleur;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Modele.AuthentifierUtilisateurAction;
import Modele.InscriptionUtilisateurAction;
import Modele.ListeMediumAction;
import View.InscriptionUtilisateurSerialisation;
import View.ListeMediumSerialisation;
import View.ProfilUtilisateurSerialisation;
import dao.JpaUtil;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import service.Service;

/**
 *
 * @author rgouineaud
 */
@WebServlet(name="ActionServlet",urlPatterns = {"/ActionServlet"})
public class ActionServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        Service service = new Service();
        response.setContentType("text/html;charset=UTF-8");
        Date date = new Date(); 
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss"); 
        dateFormat.format(date); 
        System.out.println(" [TEST] Appel de l’ActionServlet");
        String parameter = request.getParameter("todo");
        System.out.println("[TEST] paramètre récupéré :   " + parameter);
        
        switch (parameter) {
            
            case "connecter" : {
                new AuthentifierUtilisateurAction(service).executer(request); 
                new ProfilUtilisateurSerialisation(service).appliquer(request, response);
                break; 
            }
            case "voirMedium" : {
                new ListeMediumAction(service).executer(request);
                new ListeMediumSerialisation(service).appliquer(request, response);
                break; 
            }
            
            case "inscription":{
                new InscriptionUtilisateurAction(service).executer(request);
                new InscriptionUtilisateurSerialisation(service).appliquer(request, response);
                break;
                
            }
        }
         
        
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet ActionServlet</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ActionServlet at " + request.getContextPath() + "</h1>");
            out.println("<p> date formatée :" + date + "</p>");
            out.println("</body>");
            out.println("</html>");
        }
    }
    @Override
    public void init() throws ServletException {
        super.init();
        JpaUtil.creerFabriquePersistance();
    }

    @Override
    public void destroy() {
        JpaUtil.fermerFabriquePersistance();
        super.destroy();
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
