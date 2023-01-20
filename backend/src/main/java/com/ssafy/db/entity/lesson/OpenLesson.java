package com.ssafy.db.entity.lesson;

import com.ssafy.db.entity.orders.Orders;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/*
* lesson : open_lesson = 1 : N
*/
@Entity
@Getter
@Table(name = "OPEN_LESSON")
public class OpenLesson {
    @Id
    @GeneratedValue
    private Long id;

    @CreatedDate
    @Column(name = "regdate")
    private Timestamp regDate;

    @CreatedDate
    @Column(name = "regtime")
    private Timestamp regTime;


    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    @OneToMany(mappedBy = "openLesson")
    private List<Orders> ordersList = new ArrayList<>();

    @OneToMany(mappedBy = "openLesson")
    private List<Schedule> scheduleList = new ArrayList<>();

}
