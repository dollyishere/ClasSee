package com.ssafy.db.entity.orders;

import com.ssafy.db.entity.product.Product;
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
    @GeneratedValue
    private Long id;

    private Long price;
    private Long qty;
    @Enumerated(EnumType.STRING)
    private OrdersStatus ordersStatus;

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orders_id")
    private Orders orders;

    @OneToMany(mappedBy = "ordersDetail")
    private List<Product> productList = new ArrayList<>();
}
