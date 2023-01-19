package com.ssafy.db.entity.board;

import com.april2nd.entity.member.Member;
import lombok.Getter;

import javax.persistence.*;

/*
* member : article = 1 : N
*/
@Entity
@Getter
@Table(name = "ARTICLE")
public class Article {
    @Id
    @GeneratedValue
    private Long id;

    private Long hit;

    private String regtime;
    private String title;
    private String content;
    private String img;

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
}
