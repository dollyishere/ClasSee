package com.ssafy.db.entity.product;

import com.ssafy.db.entity.lesson.Checklist;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.orders.OrdersDetail;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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
    @OneToMany(mappedBy = "product")
    private List<OrdersDetail> ordersDetailList = new ArrayList<>();

    @OneToMany(mappedBy = "product")
    private List<Checklist> checkLists = new ArrayList<>();
}
