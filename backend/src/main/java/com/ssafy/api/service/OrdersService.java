package com.ssafy.api.service;

import com.ssafy.api.request.OrdersRegistPostReq;
import com.ssafy.api.response.OrdersInfoGetRes;

public interface OrdersService {

    OrdersInfoGetRes readOrders(String email, Long id);

    void createOrders(OrdersRegistPostReq ordersRegistPostReq) throws Exception;
}
