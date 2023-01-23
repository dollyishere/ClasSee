package com.ssafy.db.entity.qna;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;

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
    @CreatedDate
    @Column(name = "regtime")
    private Timestamp regTime;

    // 연결
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "qna_id")
    private Qna qna;
}
