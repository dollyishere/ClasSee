package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.user.QAuth;
import com.ssafy.db.entity.user.QUser;
import com.ssafy.db.entity.user.User;

import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
@RequiredArgsConstructor
@Transactional
public class UserRepositorySupport {

    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;
    QUser qUser = QUser.user;
    QAuth qAuth = QAuth.auth;

    // 유저를 넣으면 유저를 DB에 저장
    public void save(User user){
        em.persist(user);
    }

    // 유저를 넣으면 유저를 DB에서 삭제
    public void delete(User user) { em.remove(user); }

    //ID로 유저를 찾아 한 개를 반환
    public User findOne(Long id){
        return em.find(User.class, id);
    }

    //모든 유저 정보를 리스트로 반환
    public List<User> findAll() {
        return em.createQuery("select u from User u", User.class).getResultList();
    }

    //이메일로 id를 반환
    public Long findId(String email) {

        Long id = jpaQueryFactory.select(qUser.auth.id).from(qUser).join(qUser.auth, qAuth)
                .where(qAuth.email.eq(email)).fetchOne();

        return id;
    }
    //닉네임으로 조회
    public Optional<User> findByNickname(String nickname) {

        User user = jpaQueryFactory
                .select(qUser)
                .from(qUser)
                .where(qUser.nickname.eq(nickname)).fetchOne();
        if(user == null) {return Optional.empty();}
        return Optional.ofNullable(user);
    }


    //이메일로 조회
    public Optional<User> findUserByAuth(String email) {
//        User user = jpaQueryFactory.select(qUser).from(qUser)
//                .where(qAuth.email.eq(userEmail)).fetchOne();
        User user = jpaQueryFactory
                .selectFrom(qUser)
                .join(qUser.auth, qAuth)
                .fetchJoin()
                .where(qAuth.email.eq(email)).fetchOne();
        if(user == null) return Optional.empty();
        return Optional.ofNullable(user);
    }

    //닉네임, 비밀번호, 전화번호, 주소, 소개 업데이트
    public void updateNickname(String email, String nickname) {
        Long id = findId(email);

        jpaQueryFactory.update(qUser).where(qUser.id.eq(id))
                .set(qUser.nickname, nickname).execute();

        em.clear();
        em.flush();
    }

//    public void updatePassword(String email, String password) {
//        jpaQueryFactory.update(qAuth).where(qAuth.email.eq(email))
//                .set(qAuth.password, password).execute();
//    }

    public void updatePhone(String email, String phone) {
        Long id = findId(email);

        jpaQueryFactory.update(qUser).where(qUser.id.eq(id))
                .set(qUser.phone, phone).execute();

        em.clear();
        em.flush();
    }

    public void updateAddress(String email, String address) {
        Long id = findId(email);

        jpaQueryFactory.update(qUser).where(qUser.id.eq(id))
                .set(qUser.address, address).execute();

        em.clear();
        em.flush();
    }

    public void updateDescription(String email, String description) {
        Long id = findId(email);

        jpaQueryFactory.update(qUser).where(qUser.id.eq(id))
                .set(qUser.description, description).execute();

        em.clear();
        em.flush();
    }

    public void updateImg(String email, String img){
        Long id = findId(email);

        jpaQueryFactory.update(qUser).where(qUser.id.eq(id))
                .set(qUser.img, img).execute();

        em.clear();
        em.flush();
    }

    // 업데이트 끝
}