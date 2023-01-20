package com.ssafy.db.entity.board;

import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.User.User;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;

/*
* member : photocard = 1 : N
* lesson : photocard = 1 : N
*/
@Entity@Getter
@Table(name = "PHOTOCARD")
public class Photocard {
    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private String content;
    private String img;
    private String sign;
    private Long likes;

    @CreatedDate
    @Column(name = "regdate")
    private Timestamp regDate;

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
}
