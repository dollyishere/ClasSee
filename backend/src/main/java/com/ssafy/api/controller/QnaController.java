package com.ssafy.api.controller;

import com.ssafy.api.request.QnaRegisterPostReq;
import com.ssafy.api.response.ArticleInfoGetRes;
import com.ssafy.api.service.QnaService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.board.Article;
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

    @GetMapping("/check")
    @ApiOperation(value = "사용자 동일 체크", notes = "삭제, 수정 시 QnA의 작성자와 로그인된 사용자가 같은 지 확인")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공")
    })
    public ResponseEntity<Boolean> checkUser(@RequestParam String email, @RequestParam Long id){

        if(qnaService.checkUser(email, id)){
            return ResponseEntity.status(200).body(true);
        } else {
            return ResponseEntity.status(200).body(false);
        }

    }

    @DeleteMapping()
    @ApiOperation(value = "Qna 삭제", notes = "Qna id로 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteQna(@RequestParam Long id) {
        qnaService.deleteQna(id);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }


}
