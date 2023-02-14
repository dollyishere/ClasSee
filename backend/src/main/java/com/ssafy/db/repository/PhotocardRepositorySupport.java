package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.board.Likes;
import com.ssafy.db.entity.board.Photocard;
import com.ssafy.db.entity.board.QLikes;
import com.ssafy.db.entity.board.QPhotocard;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.lesson.OpenLesson;
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

    QLikes qLikes = QLikes.likes;

    public void save(Photocard photocard) { em.persist(photocard); }

    public void delete(Photocard photocard) { em.remove(photocard); }

    public void saveLikes(Likes likes) { em.persist(likes); }

    public void deleteLikes(Likes likes) { em.remove(likes); }

    public Photocard findOne(Long id) { return em.find(Photocard.class, id); }

    public Photocard findOne(Long user_id, Long openLesson_id){
        return jpaQueryFactory
                .select(qPhotocard)
                .from(qPhotocard)
                .where(qPhotocard.user.id.eq(user_id), qPhotocard.openLesson_id.eq(openLesson_id))
                .fetchOne();
    }

    public Likes findOneLikes(Long user_id, Long photocard_id){
        return jpaQueryFactory
                .select(qLikes)
                .from(qLikes)
                .where(qLikes.user.id.eq(user_id), qLikes.photocard.id.eq(photocard_id))
                .fetchOne();
    }

    public Lesson findOneLesson(Long id) { return em.find(Lesson.class, id); }

    public OpenLesson findOneOpenLesson(Long id) {return em.find(OpenLesson.class, id); }

    public List<Photocard> findAll() {
        return jpaQueryFactory
                .select(qPhotocard)
                .from(qPhotocard)
                .fetch();
    }

    public List<Photocard> findList(int offset, int limit) {
        return jpaQueryFactory
                .selectFrom(qPhotocard)
                .orderBy(qPhotocard.id.desc())
                .offset(offset)
                .limit(limit)
                .fetch();
    }

    public List<Photocard> findMyList(int offset, int limit, Long user_id) {
        return jpaQueryFactory
                .selectFrom(qPhotocard)
                .where(qPhotocard.user.id.eq(user_id))
                .orderBy(qPhotocard.id.desc())
                .offset(offset)
                .limit(limit)
                .fetch();
    }

    public Long photocardCount(){
        return jpaQueryFactory
                .select(qPhotocard.count())
                .from(qPhotocard)
                .fetchOne();
    }

    public Long myPhotocardCount(Long user_id){
        return jpaQueryFactory
                .select(qPhotocard.count())
                .from(qPhotocard)
                .where(qPhotocard.user.id.eq(user_id))
                .fetchOne();
    }

    public Long countLikes(Long id){
        return jpaQueryFactory
                .select(qLikes.count())
                .from(qLikes)
                .where(qLikes.photocard.id.eq(id))
                .fetchOne();
    };

    public Likes checkLikes(Long photocard_id, Long user_id){
        return jpaQueryFactory
                .select(qLikes)
                .from(qLikes)
                .where(qLikes.user.id.eq(user_id),
                        qLikes.photocard.id.eq(photocard_id))
                .fetchOne();
    }

}
