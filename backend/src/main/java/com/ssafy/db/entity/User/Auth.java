package com.ssafy.db.entity.User;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;

import javax.persistence.*;


/*
*  Auth : Member = 1 : 1 관계
* */
@Entity
@Table(name = "AUTH")
@Getter
public class Auth {

    @JsonIgnore
    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;
    private String token;
    private String refreshToken;
    private UserType type;



    // 연결 관계
    @OneToOne(mappedBy = "auth", fetch = FetchType.LAZY)
    private User user;
}
