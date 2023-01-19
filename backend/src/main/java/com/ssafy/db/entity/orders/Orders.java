package com.ssafy.db.entity.orders;

import com.ssafy.db.entity.lesson.OpenLesson;
import com.ssafy.db.entity.User.User;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/*
*  orders : member = 1 : N
*  orders : open_lesson = 1 : N
*  orders : payment = 1 : N
*/
@Entity
@Getter
@Table(name = "ORDER")
public class Orders {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "regtime")
    private String regTime;

    private String phone;
    private String email;
    private String address;

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "open_lesson_id")
    private OpenLesson openLesson;

    @OneToMany(mappedBy = "orders")
    private List<OrdersDetail> ordersDetailList = new ArrayList<>();

    @OneToMany(mappedBy = "orders")
    private List<Payment> paymentList = new ArrayList<>();
}
