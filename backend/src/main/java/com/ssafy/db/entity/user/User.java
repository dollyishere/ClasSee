package com.ssafy.db.entity.user;

import com.ssafy.db.entity.qna.Qna;
import com.ssafy.db.entity.board.Article;
import com.ssafy.db.entity.board.Photocard;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.lesson.Review;
import com.ssafy.db.entity.lesson.Schedule;
import com.ssafy.db.entity.orders.Orders;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
@Builder
@Entity
@Table(name = "USER")
@AllArgsConstructor
@RequiredArgsConstructor
@Getter @Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
//    private Long authId;

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

    @OneToMany(mappedBy = "user")
    private List<Schedule> scheduleList = new ArrayList<>();

}
