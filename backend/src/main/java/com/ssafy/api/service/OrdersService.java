package com.ssafy.api.service;

import com.ssafy.api.response.OrdersInfoGetRes;

public interface OrdersService {

    OrdersInfoGetRes readOrders(String email, Long id);
}
