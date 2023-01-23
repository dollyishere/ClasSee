package com.ssafy.db.entity.user;

import com.ssafy.db.entity.lesson.Lesson;
import lombok.Getter;

import javax.persistence.*;

/*
* member : bookmark = 1 : N
* lesson : bookmark = 1 : N
*/
@Entity
@Getter
@Table(name = "BOOKMARK")
public class Bookmark {
    @Id
    @GeneratedValue
    private Long id;

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
