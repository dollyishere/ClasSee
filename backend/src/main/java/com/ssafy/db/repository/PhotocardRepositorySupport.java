package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.board.Photocard;
import com.ssafy.db.entity.board.QPhotocard;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.lesson.QLesson;
import com.ssafy.db.entity.user.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class PhotocardRepositorySupport {

    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    QPhotocard qPhotocard = QPhotocard.photocard;

    QLesson qLesson = QLesson.lesson;

    QUser qUser = QUser.user;

    public void save(Photocard photocard) { em.persist(photocard); }

    public void delete(Photocard photocard) { em.remove(photocard); }

    public Photocard findOne(Long id) { return em.find(Photocard.class, id); }

    public Lesson findOneLesson(Long id) { return em.find(Lesson.class, id); }

    public List<Photocard> findAll() {
        return jpaQueryFactory
                .select(qPhotocard)
                .from(qPhotocard)
                .fetch();
    }

    public List<Photocard> findList(int offset, int limit, Long user_id) {
        return jpaQueryFactory
                .selectFrom(qPhotocard)
                .where(qPhotocard.user.id.eq(user_id))
                .orderBy(qPhotocard.id.desc())
                .offset(offset)
                .limit(limit)
                .fetch();
    }

    public Long photocardCount(Long id){
        return jpaQueryFactory
                .select(qPhotocard.count())
                .from(qPhotocard)
                .where(qPhotocard.user.id.eq(id))
                .fetchOne();
    }

}
