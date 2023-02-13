package com.ssafy.db.entity.lesson;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.db.entity.orders.Orders;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/*
* lesson : open_lesson = 1 : N
*/
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Getter
@Table(name = "OPEN_LESSON")
public class OpenLesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    @Column
    private LocalDateTime startTime;

    @CreatedDate
    @Column
    private LocalDateTime endTime;

    // 연결
    @Column(name = "lesson_id")
    private Long lessonId;

    @OneToMany(mappedBy = "openLesson")
    private List<Orders> ordersList = new ArrayList<>();
}
