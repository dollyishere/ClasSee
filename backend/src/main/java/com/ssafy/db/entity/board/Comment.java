package com.ssafy.db.entity.board;

import com.april2nd.entity.member.Member;
import lombok.Getter;

import javax.persistence.*;

/*
* member : comment = 1 : N
* article : comment = 1 : N
* comment : comment = 1 : N
*/
@Entity
@Getter
@Table(name = "COMMENT")
public class Comment {
    @Id
    @GeneratedValue
    private Long id;

    private Long step;
    private Long level;

    private String content;
    private String regtime;

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id")
    private Article article;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;
}
