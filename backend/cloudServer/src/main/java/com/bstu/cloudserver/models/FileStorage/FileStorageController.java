package com.bstu.cloudserver.models.FileStorage;

import com.bstu.cloudserver.Response;
import com.bstu.cloudserver.models.Client.Client;
import com.bstu.cloudserver.models.FileStorage.Dto.ReqGetFileDto;
import com.bstu.cloudserver.models.FileStorage.Dto.ReqHandleFileDeleteDto;
import com.bstu.cloudserver.models.FileStorage.Dto.ReqHandleFileUploadDto;
import com.bstu.cloudserver.models.FileStorage.Dto.ReqProvideListInfoDto;
import com.bstu.cloudserver.models.Session.Session;
import com.bstu.cloudserver.models.Session.SessionJPA;
import com.google.gson.Gson;
import com.mpatric.mp3agic.ID3v2;
import com.mpatric.mp3agic.Mp3File;
import io.minio.*;
import io.minio.errors.*;
import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.net.URLCodec;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import static com.bstu.cloudserver.models.FileStorage.Minio.minioClient;

@Controller
public class FileStorageController {
    @Autowired
    ApplicationContext context;

    @RequestMapping(value="/api/v1/mycloud/**", method=RequestMethod.POST)
    public @ResponseBody String provideListInfo(@RequestBody ReqProvideListInfoDto data, HttpServletRequest request) {
        String dirpath = "";
        if(request.getRequestURL().toString().split("/mycloud/").length>1) dirpath = request.getRequestURL().toString().split("/mycloud/")[1];

        return new Gson().toJson(new Response("ok",context.getBean(FileStorageService.class).provideListInfo(data.getToken(), dirpath)));
    }

    @RequestMapping(value="/api/v1/upload/mycloud/**", method=RequestMethod.POST)
    public @ResponseBody String handleFileUpload(@RequestParam("token") String token,
                                                 @RequestParam("file") MultipartFile file,
                                                 HttpServletRequest request){
        String dirpath = "";
        if(request.getRequestURL().toString().split("/mycloud/").length>1) dirpath = request.getRequestURL().toString().split("/mycloud/")[1];

        return new Gson().toJson(new Response("ok",context.getBean(FileStorageService.class).handleFileUpload(token, file, dirpath)));
    }

    @RequestMapping(value = "/api/v1/download/mycloud/**", method = RequestMethod.POST)
    public void getFile(
            @RequestBody ReqGetFileDto data,
            HttpServletRequest request,
            HttpServletResponse response) {
        String filePath = "";
        if(request.getRequestURL().toString().split("/mycloud/").length>1) filePath = request.getRequestURL().toString().split("/mycloud/")[1];


        Client owner = null;
        List<Session> t = context.getBean(SessionJPA.class).findSessionByTokenEquals(data.getToken());
        if(!t.isEmpty()){
            owner = t.get(0).getClient();
        }

        context.getBean(FileStorageService.class).getFile(owner, filePath, response);

    }

    @RequestMapping(value = "/api/v1/mkdir/mycloud/**", method = RequestMethod.POST)
    public @ResponseBody String mkDirectory(
            @RequestBody ReqGetFileDto data,
            HttpServletRequest request,
            HttpServletResponse response) {

        String dirpath = "";
        if(request.getRequestURL().toString().split("/mycloud/").length>1) dirpath = request.getRequestURL().toString().split("/mycloud/")[1];

        Client c = null;

        List<Session> t = context.getBean(SessionJPA.class).findSessionByTokenEquals(data.getToken());
        if(!t.isEmpty()){
            c = t.get(0).getClient();
        }

        if (c!=null &&!dirpath.isEmpty()) {
            try {

                minioClient.putObject(
                        PutObjectArgs.builder()
                                .bucket(context.getBean(FileStorageService.class).getBucketName(c))
                                .object(dirpath)
                                .stream(
                                new ByteArrayInputStream(new byte[] {}), 0, -1)
                                //.contentType("video/mp4")
                                .build());
                new Gson().toJson(new Response("ok",""));
            } catch (Exception e) {
                return null;
            }
        } else {
            return null;
        }
        return null;
    }


    @RequestMapping(value="/api/v1/delete/mycloud/**")
    public @ResponseBody String handleFileDelete(@RequestBody ReqHandleFileDeleteDto data,
                                                 HttpServletRequest request) throws IOException, InvalidKeyException, InvalidResponseException, InsufficientDataException, NoSuchAlgorithmException, ServerException, InternalException, XmlParserException, ErrorResponseException, DecoderException {
        String filepath = "";
        if(request.getRequestURL().toString().split("/mycloud/").length>1) filepath = new URLCodec().decode(request.getRequestURL().toString().split("/mycloud/")[1]);

        return new Gson().toJson(new Response("ok",context.getBean(FileStorageService.class).handleFileDelete(data.getToken(), filepath)));
    }

}
