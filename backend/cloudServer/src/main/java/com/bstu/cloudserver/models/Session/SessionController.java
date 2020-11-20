package com.bstu.cloudserver.models.Session;

import com.bstu.cloudserver.Response;
import com.bstu.cloudserver.models.Client.ClientService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class SessionController {
    @Autowired
    ApplicationContext context;

    @RequestMapping(value = "/api/v1/session/checkToken")
    //@ResponseBody
    public ResponseEntity<String> userReg(@RequestParam("token") String token) {
        return new ResponseEntity<>(new Gson().toJson(new Response("ok", context.getBean(SessionService.class).checkToken(token))), HttpStatus.OK);
    }
}
