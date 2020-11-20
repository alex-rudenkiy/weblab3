package com.bstu.cloudserver.models.FileStorage.Dto;

import lombok.AllArgsConstructor;
import lombok.NonNull;

@AllArgsConstructor
public class RespProvideListInfoDto {
    @NonNull
    String filename;
    @NonNull
    String filepath;
    @NonNull
    Boolean isDir;
}
