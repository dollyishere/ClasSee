package com.ssafy.api.controller;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "QnA API", tags = {"QnA"})
@RestController
@RequestMapping("/api/v1/qna")
public class QnAController {
}
