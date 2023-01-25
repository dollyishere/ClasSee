package com.ssafy.db.entity.lesson;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.db.entity.product.Product;
import lombok.Getter;

import javax.persistence.*;

/*
*  lesson : checklist = 1 : N
*/
@Entity
@Getter
@Table(name = "CHECKLIST")
public class Checklist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String img;

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;
}
