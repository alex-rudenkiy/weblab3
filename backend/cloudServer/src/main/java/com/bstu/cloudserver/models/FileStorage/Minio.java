package com.bstu.cloudserver.models.FileStorage;

import io.minio.MinioClient;
import org.springframework.stereotype.Component;


public class Minio {

static public MinioClient minioClient =
        MinioClient.builder()
                .endpoint("http://localhost:9000")
                .credentials("AKIAIOSFODNN7EXAMPLE", "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY")
                .build();

}
