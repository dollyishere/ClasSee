package com.ssafy.api.controller;

import com.ssafy.api.request.ArticleRegisterPostReq;
import com.ssafy.api.request.ArticleUpdatePutReq;
import com.ssafy.api.response.ArticleInfoGetRes;
import com.ssafy.api.response.ArticleListGetRes;
import com.ssafy.api.response.PageGetRes;
import com.ssafy.api.service.ArticleService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.board.Article;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Api(value = "게시글 API", tags = {"Article"})
@RestController
@RequestMapping("/api/v1/article")
public class ArticleController {

    @Autowired
    ArticleService articleService;

    @PostMapping()
    @ApiOperation(value = "게시글 등록", notes = "작성자 이메일, 제목, 내용, 이미지 주소 입력 후 게시글 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success")
    })
    public ResponseEntity<? extends BaseResponseBody> registArticle(@RequestBody ArticleRegisterPostReq articleRegisterPostReq) {

        articleService.createArticle(articleRegisterPostReq);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"성공"));

    }

    @DeleteMapping()
    @ApiOperation(value = "게시글 삭제", notes = "삭제하려는 사람과 게시글 아이디를 받아, 권한이 있는지 확인 후 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteArticle(@RequestParam String email, @RequestParam Long id) {

            articleService.deleteArticle(email, id);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"success"));

    }

    @GetMapping()
    @ApiOperation(value = "게시글 상세 조회", notes = "게시글id를 넘겨받아 게시글에 대한 상세 정보를 넘겨줌")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success")
    })
    public ResponseEntity<?> getArticleInfo(@RequestParam Long id){

        Article article = articleService.readArticle(id);
        ArticleInfoGetRes articleInfoGetRes = new ArticleInfoGetRes(article);

        return ResponseEntity.status(200).body(articleInfoGetRes);

    }

    @GetMapping("/check")
    @ApiOperation(value = "사용자 동일 체크", notes = "게시글id의 작성자와 로그인된 사용자가 같은 지 확인")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success")
    })
    public ResponseEntity<Boolean> checkUser(@RequestParam String email, @RequestParam Long id){

        Article article = articleService.readArticle(id);
        ArticleInfoGetRes articleInfoGetRes = new ArticleInfoGetRes(article);

        if(articleInfoGetRes.getUser_email().equals(email)){
            return ResponseEntity.status(200).body(true);
        } else{
            return ResponseEntity.status(401).body(false);
        }

    }

    @GetMapping("/list")
    @ApiOperation(value = "게시글 목록 조회", notes = "limit는 가져올 갯수, offset은 시작 위치(0부터 시작), count는 총 개수")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success")
    })
    public ResponseEntity<?> getArticleList(@RequestParam int offset, @RequestParam int limit){

        Long articleCount = articleService.articleCount();

        List<Article> articleList = articleService.readArticleList(offset, limit);
        List<ArticleListGetRes> articleListGetResList = articleList
                        .stream()
                        .map(a -> new ArticleListGetRes(a)).collect(Collectors.toList());

        PageGetRes articlePage = new PageGetRes();
        articlePage.setCount(articleCount);
        articlePage.setPage(articleListGetResList);

        return ResponseEntity.status(200).body(articlePage);
    }

    @PutMapping()
    @ApiOperation(value = "게시글 수정", notes = "유저 email을 받아, 정보가 같으면 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success")
    })
    public ResponseEntity<?> updateArticle(@RequestBody ArticleUpdatePutReq articleUpdatePutReq){

        articleService.updateArticle(articleUpdatePutReq);

        return ResponseEntity.status(200).body("success");

    }



}
