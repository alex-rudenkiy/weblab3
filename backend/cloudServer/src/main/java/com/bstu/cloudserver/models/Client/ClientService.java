package com.bstu.cloudserver.models.Client;

import com.bstu.cloudserver.models.Client.dto.ReqLoginDto;
import com.bstu.cloudserver.models.Client.dto.ReqRegisterDto;
import com.bstu.cloudserver.models.FileStorage.FileStorageService;
import com.bstu.cloudserver.models.Session.Session;
import com.bstu.cloudserver.models.Session.SessionJPA;
import com.google.gson.Gson;
import io.minio.MakeBucketArgs;
import io.minio.errors.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.List;

import static com.bstu.cloudserver.models.FileStorage.Minio.minioClient;

@Service
public class ClientService {
    @Autowired
    ApplicationContext context;

    Client register(ReqRegisterDto data) throws IOException, InvalidKeyException, InvalidResponseException, InsufficientDataException, NoSuchAlgorithmException, ServerException, InternalException, XmlParserException, ErrorResponseException {
        Client result = null;
        Client client = new Client(data.login, data.email, data.password);

        if(!context.getBean(ClientJPA.class).existsByName(data.login) && !context.getBean(ClientJPA.class).existsByEmail(data.email)) {
            result = context.getBean(ClientJPA.class).save(client);
        }

        if(result!=null) {
            minioClient.makeBucket(
                    MakeBucketArgs.builder()
                            .bucket(context.getBean(FileStorageService.class).getBucketName(result))
                            .build());
        }

        return result;
    }

    Session login(ReqLoginDto data){
        Client u = null;

        if(context.getBean(ClientJPA.class).existsByName(data.login) && context.getBean(ClientJPA.class).existsByPasshash(data.password)) {

                u = context.getBean(ClientJPA.class).findClientByNameEquals(data.login).get(0);

            LocalDateTime actualDateTime = LocalDateTime.now();

            if (data.remember) {
                actualDateTime = actualDateTime.plusHours(1);
            } else {
                actualDateTime = actualDateTime.plusYears(1);
            }

            context.getBean(SessionJPA.class).deleteAllByClientEquals(u);
            return context.getBean(SessionJPA.class).save(new Session(u, actualDateTime));
        }else {

            return null;


        }

    }


}
