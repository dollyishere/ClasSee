package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.user.Bookmark;
import com.ssafy.db.entity.user.QBookmark;
import com.ssafy.db.entity.user.User;
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

    public List<Long> findBookmarkList(Long userId, int limit, int offset) {
        List<Long> bookmarkList =
                jpaQueryFactory.select(qBookmark.lessonId)
                        .from(qBookmark)
                        .where(qBookmark.userId.eq(userId))
                        .limit(limit)
                        .offset(offset)
                        .fetch();

        return bookmarkList;
    }

    public boolean bookmarkedCheck(Long lessonId, User user) {
        if (user == null) return false;

        return jpaQueryFactory.
                select(qBookmark.id)
                .from(qBookmark)
                .where(
                        qBookmark.userId.eq(user.getAuth().getId()),
                        qBookmark.lessonId.eq(lessonId)
                ).fetchFirst() != null;
    }

    public boolean isExist(Long userId, Long lessonId){
        Long isExist = 0l;

        isExist = jpaQueryFactory
                .select(qBookmark.id.count())
                .from(qBookmark)
                .where(
                        qBookmark.userId.eq(userId),
                        qBookmark.lessonId.eq(lessonId)
                ).fetchOne();

        return (isExist == 0l)? true: false;
    }

    public Long findBookmarkCount(Long userId) {
        return jpaQueryFactory
                .select(qBookmark.count())
                .from(qBookmark)
                .where(qBookmark.userId.eq(userId))
                .fetchOne();
    }
}
