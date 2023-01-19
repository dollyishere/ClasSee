package com.ssafy.db.entity.Qna;

import com.ssafy.db.entity.User.User;
import lombok.Getter;

import javax.persistence.*;

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
    private String regtime;

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(mappedBy = "auth", fetch = FetchType.LAZY)
    private QnaAnswer qnaAnswer;
}
