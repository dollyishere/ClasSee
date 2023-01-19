package com.ssafy.db.entity.board;

import com.april2nd.entity.lesson.Lesson;
import com.april2nd.entity.member.Member;
import lombok.Getter;

import javax.persistence.*;

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
    private Long like;

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
}
