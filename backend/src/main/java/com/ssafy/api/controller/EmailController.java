package com.ssafy.api.controller;

import com.ssafy.api.service.EmailService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Api(value = "메일", tags = {"Mail"})
@RequestMapping("/api/v1/mails")
@RestController
public class EmailController {

    @Autowired
    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/confirm/{email}")
    @ResponseBody
    public String mailConfirm(@PathVariable String email) throws Exception {
        String code = emailService.sendSimpleMessage(email);
        System.out.println("인증코드: " + code);
        return code;
    }
}
