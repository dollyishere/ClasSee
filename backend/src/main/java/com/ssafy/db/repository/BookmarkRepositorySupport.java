package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.user.Bookmark;
import com.ssafy.db.entity.user.QBookmark;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
@Transactional
public class BookmarkRepositorySupport{
    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    QBookmark qBookmark = QBookmark.bookmark;


    // 북마크 등록
    public void save(Bookmark requestInfo){
        em.persist(requestInfo);
    }

    public void delete(Bookmark requestInfo){
        em.remove(requestInfo);
    }
}
