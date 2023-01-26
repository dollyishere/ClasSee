package com.ssafy.db.repository;

import com.querydsl.core.QueryFactory;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.api.request.NoticeUpdatePutReq;
import com.ssafy.db.entity.board.Notice;
import com.ssafy.db.entity.board.QNotice;
import com.ssafy.db.entity.user.Notification;
import com.ssafy.db.entity.user.QNotification;
import com.ssafy.db.entity.user.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class NoticeRepositorySupport {

    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    QNotice qNotice = QNotice.notice;
    QUser qUser = QUser.user;

    public void save(Notice notice) {em.persist(notice);}
    public void delete(Notice notice) {em.remove(notice);}

    // 아이디로 공지사항 한 개를 반환
    public Notice findOne(Long id) { return em.find(Notice.class, id); }

    // 모든 공지사항 리스트를 반환
    public List<Notice> findAll() { return em.createQuery("select n from Notice n", Notice.class).getResultList(); }

    // 공지사항을 limit개 씩 offset부터 페이징 처리해서 반환
    public List<Notice> findList(int offset, int limit) {
        return jpaQueryFactory
                .selectFrom(qNotice)
                .offset(offset)
                .limit(limit)
                .fetch();
    }

    public Long noticeCount(){
        return jpaQueryFactory
                .select(qNotice.count())
                .from(qNotice)
                .fetchOne();
    }

    public void updateHit(Long id) {

        jpaQueryFactory.update(qNotice)
                .where(qNotice.id.eq(id))
                .set(qNotice.hit, qNotice.hit.add(1))
                .execute();

        em.clear();
        em.flush();
    }

    public void updateNotice(NoticeUpdatePutReq noticeUpdatePutReq) {
        jpaQueryFactory.update(qNotice)
                .where(qNotice.id.eq(noticeUpdatePutReq.getId()))
                .set(qNotice.title, noticeUpdatePutReq.getTitle())
                .set(qNotice.content, noticeUpdatePutReq.getContent())
                .set(qNotice.img, noticeUpdatePutReq.getImg())
                .set(qNotice.regtime, LocalDateTime.now().toString())
                .execute();

        em.clear();
        em.flush();
    }



}
