package com.ssafy.db.entity.board;

import com.ssafy.db.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;

/*
* member : article = 1 : N
*/
@Entity
@Getter
@Table(name = "ARTICLE")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long hit;

    @CreatedDate
    @Column(name = "regtime")
    private Timestamp regtime;
    private String title;
    private String content;
    private String img;

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
