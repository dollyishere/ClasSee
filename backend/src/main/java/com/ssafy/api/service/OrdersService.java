package com.ssafy.api.service;

import com.ssafy.api.request.OrdersRegistPostReq;
import com.ssafy.api.response.OrdersInfoGetRes;
import com.ssafy.common.exception.handler.OrdersException;
import com.ssafy.common.exception.handler.UserException;

public interface OrdersService {

    OrdersInfoGetRes readOrders(String email, Long id) throws Exception;

    void createOrders(OrdersRegistPostReq ordersRegistPostReq) throws Exception;

    void chargePoint(String email, Long point) throws UserException;

    void deleteOrders(String email, Long openLessonId) throws Exception;
}
