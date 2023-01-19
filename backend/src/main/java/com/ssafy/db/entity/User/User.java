package com.ssafy.db.entity.User;

import com.ssafy.db.entity.Qna.Qna;
import com.ssafy.db.entity.board.Article;
import com.ssafy.db.entity.board.Photocard;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.lesson.Review;
import com.ssafy.db.entity.orders.Orders;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "USER")
@Getter
public class User {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String nickname;
    private String address;
    private String birth;
    private String phone;
    private Long point;
    private String img;
    @Enumerated(EnumType.STRING)
    private UserRole role;

    private String createdAt;

    // 연결
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auth_id")
    private Auth auth;

    @OneToMany(mappedBy = "targetUserId")
    private List<Notification> targetUserList = new ArrayList<>();

    @OneToMany(mappedBy = "sendUserId")
    private List<Notification> sendMemberList = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Lesson> lessonList = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Review> reviewList = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<Bookmark> bookmarkList = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Photocard> photocardList = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Article> articleList = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Qna> qnaList = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Orders> ordersList = new ArrayList<>();
}
