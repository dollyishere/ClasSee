package com.ssafy.db.entity.lesson;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/*
 *  lesson : checklist = 1 : N
 */
@Entity
@Getter@Setter
@Table(name = "PAMPHLET")
public class Pamphlet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String img;

    // 연결
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "lesson_id")
//    private Lesson lesson;
    @Column(name = "lesson_id")
    private Long lessonId;

}
