package com.ssafy.db.entity.board;

import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/*
* member : photocard = 1 : N
* lesson : photocard = 1 : N
*/
@Entity@Getter
@Table(name = "PHOTOCARD")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Photocard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private String img;
    private String sign;
    private String lesson_name;
    private Long openLesson_id;

    @Column(name = "regdate")
    private String regDate;

    // 연결
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "photocard", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Likes> likesList = new ArrayList<>();
}
