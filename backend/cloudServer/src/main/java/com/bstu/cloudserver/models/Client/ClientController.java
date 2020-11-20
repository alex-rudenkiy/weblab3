package com.bstu.cloudserver.models.Client;

import com.bstu.cloudserver.Response;
import com.bstu.cloudserver.models.Client.dto.ReqLoginDto;
import com.bstu.cloudserver.models.Client.dto.ReqRegisterDto;
import com.bstu.cloudserver.models.Session.Session;
import com.google.gson.Gson;
import io.minio.errors.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@Controller
@Transactional
public class ClientController {
    @Autowired
    ApplicationContext context;

    @RequestMapping(value = "/api/v1/client/register")
    public @ResponseBody String userReg(@RequestBody ReqRegisterDto data) throws IOException, InvalidResponseException, InvalidKeyException, NoSuchAlgorithmException, ServerException, ErrorResponseException, XmlParserException, InsufficientDataException, InternalException {
        Client v = context.getBean(ClientService.class).register(data);
        return new Gson().toJson(new Response(v!=null?"ok":"failed",v));
    }

    @RequestMapping(value = "/api/v1/client/login")
    public @ResponseBody String userLogin(@RequestBody ReqLoginDto data) {//, @RequestParam("remember") String remember
        Session v = context.getBean(ClientService.class).login(data);
        return new Gson().toJson(new Response(v!=null?"ok":"failed",v));
    }
}
