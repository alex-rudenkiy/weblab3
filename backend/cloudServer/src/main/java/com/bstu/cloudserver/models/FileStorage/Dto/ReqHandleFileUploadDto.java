package com.bstu.cloudserver.models.FileStorage.Dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

public class ReqHandleFileUploadDto {
    @Getter
    @Setter
    String token;
    @Getter
    @Setter
    MultipartFile file;
}
