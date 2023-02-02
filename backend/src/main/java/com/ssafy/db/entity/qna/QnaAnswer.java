package com.ssafy.db.entity.qna;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;

/*
* qna : answer = 1 : 1
*/
@Entity
@Getter
@Table(name = "QNA_ANSWER")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QnaAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
