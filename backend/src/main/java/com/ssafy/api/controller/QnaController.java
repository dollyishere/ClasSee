package com.ssafy.api.controller;

import com.ssafy.api.request.QnaRegisterPostReq;
import com.ssafy.api.service.QnaService;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "QnA API", tags = {"QnA"})
@RestController
@RequestMapping("/api/v1/qna")
public class QnaController {

    @Autowired
    QnaService qnaService;

    @PostMapping()
    @ApiOperation(value = "Qna 등록", notes = "제목, 내용, 시간과 작성자 이메일 입력 후 Qna등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공")
    })
    public ResponseEntity<? extends BaseResponseBody> registQna(@RequestBody QnaRegisterPostReq qnaRegisterPostReq){

        qnaService.createQna(qnaRegisterPostReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"success"));
    }

    @DeleteMapping()
    @ApiOperation(value = "Qna 삭제", notes = "Qna 아이디와 로그인한 사람의 이메일을 받아, 비교한 뒤 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "실패")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteQna(@RequestParam String email, @RequestParam Long id) throws Exception {

        try{
            qnaService.deleteQna(email, id);
        } catch (Exception e){
            return ResponseEntity.status(401).body(BaseResponseBody.of(401,"fail"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }


}
