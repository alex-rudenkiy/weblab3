package com.bstu.cloudserver.models.Client.dto;


import lombok.Getter;
import lombok.Setter;

public class ReqLoginDto {
    @Getter
    @Setter
    public String login;
    @Getter
    @Setter
    public String password;
    @Getter
    @Setter
    public Boolean remember;
}
