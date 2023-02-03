package com.ssafy.api.service;

import com.ssafy.api.request.OrdersRegistPostReq;
import com.ssafy.api.response.OrdersInfoGetRes;

public interface OrdersService {

    OrdersInfoGetRes readOrders(String email, Long id);

    void createOrders(OrdersRegistPostReq ordersRegistPostReq) throws Exception;

    void chargePoint(String email, Long point);

    void deleteOrders(String email, Long openLesson_id);
}
