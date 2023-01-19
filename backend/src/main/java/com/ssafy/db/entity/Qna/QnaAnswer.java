package com.ssafy.db.entity.Qna;

import lombok.Getter;

import javax.persistence.*;

/*
* qna : answer = 1 : 1
*/
@Entity
@Getter
@Table(name = "QNA_ANSWER")
public class QnaAnswer {

    @Id
    @GeneratedValue
    private Long id;

    private String content;
    private String regtime;

    // 연결
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "qna_id")
    private Qna qna;
}
