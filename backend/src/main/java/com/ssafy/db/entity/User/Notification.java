package com.ssafy.db.entity.User;

import com.ssafy.db.entity.lesson.Lesson;
import jdk.jfr.Timespan;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;

/*
* member_target : notification = 1 : N
* lesson : notification = 1 : N
* member_send : notification = 1 : N
*/
@Entity
@Getter
@Table(name = "NOTIFICATION")
public class Notification {
    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private String content;
    @CreatedDate
    @Column(name = "regtime")
    private Timestamp regTime;

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id")
    private Lesson lessonId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_user_id")
    private User targetUserId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "send_user_id")
    private User sendUserId;
}
