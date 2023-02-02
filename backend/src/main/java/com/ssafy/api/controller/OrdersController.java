package com.ssafy.api.controller;

import com.ssafy.api.response.NoticeInfoRes;
import com.ssafy.api.response.OrdersInfoGetRes;
import com.ssafy.api.service.OrdersService;
import com.ssafy.db.entity.board.Notice;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "주문 API", tags = {"Orders"})
@RestController
@RequestMapping("/api/v1/orders")
public class OrdersController {

    @Autowired
    OrdersService ordersService;

    @GetMapping()
    @ApiOperation(value = "주문페이지 정보", notes = "주문 페이지에 들어왔을 때, 필요한 정보들을 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "success")
    })
    public ResponseEntity<?> getNoticeInfo(@RequestParam String user_email, @RequestParam Long openLesson_id){

        OrdersInfoGetRes ordersInfoGetRes = ordersService.readOrders(user_email, openLesson_id);

        return ResponseEntity.status(200).body(ordersInfoGetRes);
    }


}
