package com.ssafy.db.entity.lesson;

import com.ssafy.db.entity.user.User;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "SCHEDULE")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ScheduleStatus status;

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "open_lesson_id")
    private OpenLesson openLesson;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
