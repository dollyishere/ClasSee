package com.ssafy.db.entity.lesson;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;

import javax.persistence.*;

/*
*  lesson : checklist = 1 : N
*/
@Entity
@Getter
@Table(name = "CHECKLIST")
public class Checklist {

    @JsonIgnore
    @Id
    @GeneratedValue
    private Long id;

    private String img;

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
}
