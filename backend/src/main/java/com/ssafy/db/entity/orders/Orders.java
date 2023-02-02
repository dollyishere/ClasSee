package com.ssafy.db.entity.orders;

import com.ssafy.db.entity.lesson.OpenLesson;
import com.ssafy.db.entity.user.User;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/*
*  orders : member = 1 : N
*  orders : open_lesson = 1 : N
*  orders : payment = 1 : N
*/
@Entity
@Getter
@Table(name = "ORDERS")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    @Column(name = "regtime")
    private LocalDateTime regTime;

    private String phone;
    private String email;
    private String address;

    private Long price;

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "open_lesson_id")
    private OpenLesson openLesson;

}
