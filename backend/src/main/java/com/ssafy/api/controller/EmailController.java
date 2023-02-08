package com.ssafy.api.controller;

import com.ssafy.api.service.EmailService;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<? extends BaseResponseBody> mailConfirm(@PathVariable String email) throws Exception {
        String code = emailService.sendSimpleMessage(email);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, code));
    }
}
