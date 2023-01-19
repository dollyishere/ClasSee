package com.ssafy.db.entity.Qna;

import com.ssafy.db.entity.User.User;
import lombok.Getter;
import org.checkerframework.checker.units.qual.C;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;

/*
*  member : Qna = 1 : N
*/
@Entity
@Getter
@Table(name = "QNA")
public class Qna {
    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private String content;
    @CreatedDate
    @Column(name = "regtime")
    private Timestamp regTime;

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(mappedBy = "qna", fetch = FetchType.LAZY)
    private QnaAnswer qnaAnswer;
}
