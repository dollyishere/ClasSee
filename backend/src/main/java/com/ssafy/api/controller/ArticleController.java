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

//@Api(value = "게시글 API", tags = {"Article"})
//@RestController
//@RequestMapping("/api/v1/article")
public class ArticleController {

//    @Autowired
//    ArticleService articleService;
//
//    @PostMapping()
//    @ApiOperation(value = "게시글 등록", notes = "작성자 이메일, 제목, 내용, 이미지 주소 입력 후 게시글 생성")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "success")
//    })
//    public ResponseEntity<? extends BaseResponseBody> registArticle(@RequestBody ArticleRegisterPostReq articleRegisterPostReq) {
//
//        articleService.createArticle(articleRegisterPostReq);
//
//        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"성공"));
//
//    }
//
//    @DeleteMapping("/{articleId}")
//    @ApiOperation(value = "게시글 삭제", notes = "게시글 ID로 삭제")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "success")
//    })
//    public ResponseEntity<? extends BaseResponseBody> deleteArticle(@PathVariable Long articleId) {
//
//            articleService.deleteArticle(articleId);
//
//        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"success"));
//
//    }
//
//    @GetMapping("/{articleId}")
//    @ApiOperation(value = "게시글 상세 조회", notes = "게시글id를 넘겨받아 게시글에 대한 상세 정보를 넘겨줌")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "success")
//    })
//    public ResponseEntity<?> getArticleInfo(@PathVariable Long articleId){
//
//        Article article = articleService.readArticle(articleId);
//        ArticleInfoGetRes articleInfoGetRes = new ArticleInfoGetRes(article);
//
//        return ResponseEntity.status(200).body(articleInfoGetRes);
//
//    }
//
//
//    @GetMapping()
//    @ApiOperation(value = "게시글 목록 조회", notes = "limit는 가져올 갯수, offset은 시작 위치(0부터 시작), count는 총 개수")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "success")
//    })
//    public ResponseEntity<?> getArticleList(@RequestParam int offset, @RequestParam int limit){
//
//        Long articleCount = articleService.articleCount();
//
//        List<Article> articleList = articleService.readArticleList(offset, limit);
//        List<ArticleListGetRes> articleListGetResList = articleList
//                        .stream()
//                        .map(a -> new ArticleListGetRes(a)).collect(Collectors.toList());
//
//        PageGetRes articlePage = new PageGetRes();
//        articlePage.setCount(articleCount);
//        articlePage.setPage(articleListGetResList);
//
//        return ResponseEntity.status(200).body(articlePage);
//    }
//
//    @PutMapping("/{articleId}")
//    @ApiOperation(value = "게시글 수정", notes = "게시글 수정 내용을 받아 수정")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "success")
//    })
//    public ResponseEntity<?> updateArticle(@PathVariable Long articleId, @RequestBody ArticleUpdatePutReq articleUpdatePutReq){
//
//        articleService.updateArticle(articleId, articleUpdatePutReq);
//
//        return ResponseEntity.status(200).body("success");
//
//    }



}
