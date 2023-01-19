package com.ssafy.db.entity.lesson;

import lombok.Getter;

import javax.persistence.*;
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

    @Column(name = "regdate")
    private String regDate;

    @Column(name = "regtime")
    private String regTime;


    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    @OneToMany(mappedBy = "openLesson")
    private List<OpenLesson> openLessonList = new ArrayList<>();
}
