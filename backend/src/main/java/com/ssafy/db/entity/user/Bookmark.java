package com.ssafy.db.entity.user;

import com.ssafy.db.entity.lesson.Lesson;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

/*
* member : bookmark = 1 : N
* lesson : bookmark = 1 : N
*/

@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Getter
@Table(name = "BOOKMARK")
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "lesson_id")
    private Long lessonId;

    @Column(name = "user_id")
    private Long userId;

//    // 연결
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "lesson_id")
//    private Lesson lesson;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_email")
//    private User user;
}
