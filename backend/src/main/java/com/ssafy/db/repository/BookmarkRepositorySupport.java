package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.user.Bookmark;
import com.ssafy.db.entity.user.QBookmark;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
@Transactional
public class BookmarkRepositorySupport{
    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    QBookmark qBookmark = QBookmark.bookmark;


    // 북마크 등록
    @Transactional public void save(Bookmark requestInfo){
        em.persist(requestInfo);
    }

    public List<Long> findBookmarkList(Long userId) {
        List<Long> bookmarkList =
                jpaQueryFactory.select(qBookmark.lessonId)
                        .from(qBookmark)
                        .where(qBookmark.userId.eq(userId)).fetch();

        return bookmarkList;
    }
}
