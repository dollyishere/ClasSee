package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.User.QAuth;
import com.ssafy.db.entity.User.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
@Repository
@RequiredArgsConstructor
public class AuthRepositorySupport {
    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;
    QUser qUser = QUser.user;
    QAuth qAuth = QAuth.auth;
}
