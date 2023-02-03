package com.ssafy.api.controller;

import com.ssafy.api.request.OrdersRegistPostReq;
import com.ssafy.api.request.PhotocardRegistPostReq;
import com.ssafy.api.response.NoticeInfoRes;
import com.ssafy.api.response.OrdersInfoGetRes;
import com.ssafy.api.service.OrdersService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.board.Notice;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "주문 API", tags = {"Orders"})
@RestController
@RequestMapping("/api/v1/orders")
public class OrdersController {

    @Autowired
    OrdersService ordersService;

    @PostMapping()
    @ApiOperation(value = "주문 정보 등록", notes = "주문 정보 입력 후 주문 생성, 잔액 부족 시 403")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success"),
            @ApiResponse(code = 403, message = "fail")
    })
    public ResponseEntity<? extends BaseResponseBody> registOrders(@RequestBody OrdersRegistPostReq ordersRegistPostReq) throws Exception {

        try{
            ordersService.createOrders(ordersRegistPostReq);
        } catch(Exception e){
            return ResponseEntity.status(403).body(BaseResponseBody.of(403,"fail"));
        }

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"success"));
    }

    @PutMapping("/point")
    @ApiOperation(value = "포인트 충전", notes = "유저 이메일과 금액 입력 후 포인트 충전")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success")
    })
    public ResponseEntity<? extends BaseResponseBody> chargePoint(@RequestParam String email, @RequestParam Long point){

        ordersService.chargePoint(email, point);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"success"));
    }


    @GetMapping()
    @ApiOperation(value = "주문페이지 정보", notes = "주문 페이지에 들어왔을 때, 필요한 정보들을 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success")
    })
    public ResponseEntity<?> getNoticeInfo(@RequestParam String user_email, @RequestParam Long openLesson_id){

        OrdersInfoGetRes ordersInfoGetRes = ordersService.readOrders(user_email, openLesson_id);

        return ResponseEntity.status(200).body(ordersInfoGetRes);
    }

    @DeleteMapping()
    @ApiOperation(value = "주문 취소", notes = "주문 ID ")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteOrders(@RequestParam String user_email, @RequestParam Long openLesson_id){

        ordersService.deleteOrders(user_email, openLesson_id);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200,"success"));
    }

}
