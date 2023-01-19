package com.ssafy.db.entity.orders;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "PAYMENT")
public class Payment {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "regtime")
    private String regTime;

    private Long amount;
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orders_id")
    private Orders orders;
}
