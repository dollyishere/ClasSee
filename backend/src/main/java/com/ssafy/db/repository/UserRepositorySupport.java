package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.User.QAuth;
import com.ssafy.db.entity.User.QUser;
import com.ssafy.db.entity.User.User;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class UserRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QUser qUser = QUser.user;
    QAuth qAuth = QAuth.auth;

    public Optional<User> findUserByAuth(String email) {
//        User user = jpaQueryFactory.select(qUser).from(qUser)
//                .where(qAuth.email.eq(userEmail)).fetchOne();
        User user = jpaQueryFactory
                .selectFrom(qUser)
                .join(qUser.auth, qAuth)
                .where(qAuth.email.eq(email)).fetchOne();
        if(user == null) return Optional.empty();
        return Optional.ofNullable(user);
    }
}
