package com.ssafy.db.entity.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


/*
 *  Auth : Member = 1 : 1 관계
 * */
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "AUTH")
@Getter@Setter
public class Auth {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(unique = true)
    private String email;

    @Column(nullable = true) // 소셜가입 시 password 불필요
    private String password;
    private String token;
    private String refreshToken;
    @Enumerated(EnumType.STRING)
    private UserType type;



    // 연결 관계
    @OneToOne(mappedBy = "auth", fetch = FetchType.LAZY)
    private User user;
}
