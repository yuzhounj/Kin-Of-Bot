package com.kob.backend.controller.user.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.kob.backend.service.user.account.LoginService;

import java.util.Map;

@RestController
public class LoginController {
    @Autowired
    private LoginService loginService;

    @PostMapping("/user/account/login/")
    public Map<String, String> getToken(@RequestBody Map<String,String>map) {
        return loginService.getToken(map.get("username"), map.get("password"));
    }


}
