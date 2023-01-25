package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.board.Notice;
import com.ssafy.db.entity.board.QNotice;
import com.ssafy.db.entity.user.Notification;
import com.ssafy.db.entity.user.QNotification;
import com.ssafy.db.entity.user.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
@Transactional
public class NoticeRepositorySupport {

    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    QNotice qNotice = QNotice.notice;
    QUser qUser = QUser.user;

    public void save(Notice notice) {em.persist(notice);}
    public void delete(Notice notice) {em.remove(notice);}

    // 아이디로 공지사항 한 개를 반환
    public Notice findOne(Long id) { return em.find(Notice.class, id); };

    // 모든 공지사항 리스트를 반환
    public List<Notice> findAll() { return em.createQuery("select n from Notice n", Notice.class).getResultList(); };



}
