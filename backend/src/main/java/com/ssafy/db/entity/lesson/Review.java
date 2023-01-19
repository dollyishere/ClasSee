package com.ssafy.db.entity.lesson;

import com.april2nd.entity.member.Member;
import lombok.Getter;

import javax.persistence.*;

/*
* member : review = 1 : N
* lesson : review = 1 : N
*/
@Entity
@Getter
@Table(name = "REVIEW")
public class Review {

    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private String content;
    private String regtime;
    private String img;
    private Long score;

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id")
    private Lesson leson;
}
