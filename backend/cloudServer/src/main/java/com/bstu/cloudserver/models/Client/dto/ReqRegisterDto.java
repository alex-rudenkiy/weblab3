package com.bstu.cloudserver.models.Client.dto;


import lombok.Getter;
import lombok.Setter;

public class ReqRegisterDto {
    @Getter
    @Setter
    public String login;
    @Getter
    @Setter
    public String email;
    @Getter
    @Setter
    public String password;
    @Getter
    @Setter
    public String promo;
}
