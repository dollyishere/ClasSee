package com.ssafy.api.controller;

import com.ssafy.api.request.OrdersRegistPostReq;
import com.ssafy.api.request.PhotocardRegistPostReq;
import com.ssafy.api.response.NoticeInfoRes;
import com.ssafy.api.response.OrdersInfoGetRes;
import com.ssafy.api.service.OrdersService;
import com.ssafy.common.exception.handler.*;
import com.ssafy.common.model.response.*;
import com.ssafy.db.entity.board.Notice;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import retrofit2.http.Path;

import java.util.Random;

@Api(value = "주문 API", tags = {"Orders"})
@RestController
@RequestMapping("/api/v1/orders")
public class OrdersController {

    @Autowired
    OrdersService ordersService;

    @PostMapping()
    @ApiOperation(value = "주문 정보 등록, 로그인 O", notes = "주문 정보 입력 후 주문 생성, 잔액 부족 시 403")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 403, message = "거절", response = ForbiddenErrorResponseBody.class),
            @ApiResponse(code = 404, message = "해당 자료 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 409, message = "중복", response = DuplicateErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> registOrders(@RequestBody OrdersRegistPostReq ordersRegistPostReq) throws Exception {

        try{
            ordersService.createOrders(ordersRegistPostReq);
        } catch (UserException u){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"user not found"));
        } catch (OpenLessonException o){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"openLesson not found"));
        } catch (LessonException l){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"lesson not found"));
        } catch (OrdersException o){
            return ResponseEntity.status(409).body(BaseResponseBody.of(409,"duplicated orders"));
        } catch(Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403,"payment forbidden"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"success"));
    }

    @PutMapping("/{email}/point")
    @ApiOperation(value = "포인트 충전, 로그인 O", notes = "유저 이메일과 금액 입력 후 포인트 충전")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "해당 자료 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> chargePoint(@PathVariable String email, @RequestParam Long point){

        try {
            ordersService.chargePoint(email, point);
        } catch (UserException u){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"user not found"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"success"));
    }


    @GetMapping()
    @ApiOperation(value = "주문페이지 정보, 로그인 O", notes = "주문 페이지에 들어왔을 때, 필요한 정보들을 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = OrdersInfoGetRes.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 406, message = "인원 수로 인한 거절", response = ForbiddenErrorResponseBody.class),
            @ApiResponse(code = 404, message = "해당 자료 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<?> getNoticeInfo(@RequestParam String email, @RequestParam Long openLessonId){

        OrdersInfoGetRes ordersInfoGetRes = new OrdersInfoGetRes();

        try {
            ordersInfoGetRes = ordersService.readOrders(email, openLessonId);
        } catch (OpenLessonException o){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"openLesson not found"));
        } catch (LessonException l){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"lesson not found"));
        } catch (UserException u){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"user not found"));
        } catch (MaximumException m){
            return ResponseEntity.status(406).body(BaseResponseBody.of(406,"exceed the maximum"));
        } catch (Exception e){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404,"unexpected exception"));
        }

        ordersInfoGetRes.setStatusCode(200);
        ordersInfoGetRes.setMessage("SUCCESS");

        return ResponseEntity.status(200).body(ordersInfoGetRes);
    }

    @DeleteMapping("/{email}")
    @ApiOperation(value = "주문 취소, 로그인 O", notes = "주문 ID ")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
            @ApiResponse(code = 401, message = "인증 실패", response = InvalidErrorResponseBody.class),
            @ApiResponse(code = 404, message = "해당 자료 없음", response = NotFoundErrorResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = ServerErrorResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> deleteOrders(@PathVariable String email, @RequestParam Long openLessonId){

        try {
            ordersService.deleteOrders(email, openLessonId);
        } catch (OrdersException o){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "orders not found"));
        } catch (UserException u) {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "user not found"));
        } catch (Exception e){
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "unexpected error"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"success"));
    }

}
