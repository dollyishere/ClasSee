package com.ssafy.db.entity.product;

import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.orders.OrdersDetail;
import lombok.Getter;

import javax.persistence.*;

/*
* product : lesson = 1 : N
*/
@Entity
@Getter
@Table(name = "PRODUCT")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long price;

    private String name;
    @Enumerated(EnumType.STRING)
    private Category category;

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orders_detail_id")
    private OrdersDetail ordersDetail;


}
