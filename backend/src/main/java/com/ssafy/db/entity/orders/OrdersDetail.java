package com.ssafy.db.entity.orders;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/*
* order_datail : product = 1 : N
* detail : order = N : 1
*/
@Entity
@Getter
@Table(name = "ORDER_DETAIL")
public class OrdersDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long price;
    private Long qty;
    @Enumerated(EnumType.STRING)
    private OrdersStatus ordersStatus;

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orders_id")
    private Orders orders;
}
