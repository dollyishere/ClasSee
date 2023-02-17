package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.lesson.*;
import com.ssafy.db.entity.orders.Orders;
import com.ssafy.db.entity.orders.QOrders;
import com.ssafy.db.entity.user.QUser;
import com.ssafy.db.entity.user.User;
import io.lettuce.core.api.push.PushListener;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class OrdersRepositorySupport {

    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    QOrders qOrders  = QOrders.orders;

    QUser qUser = QUser.user;

    public void save(Orders orders) { em.persist(orders); }

    public void delete(Orders orders){ em.remove(orders); }

    public Orders findOne(Long id){ return em.find(Orders.class, id); }

    public Long findUserId(String email){
        return jpaQueryFactory
                .select(qUser.id)
                .from(qUser)
                .where(qUser.auth.email.eq(email))
                .fetchOne();
    }

    public Orders findOne(Long user_id, Long openLesson_id){
        Orders orders = jpaQueryFactory
                .selectFrom(qOrders)
                .where(qOrders.user.id.eq(user_id), qOrders.openLesson.id.eq(openLesson_id))
                .fetchOne();

        return orders;
    }

    public OpenLesson findOneOpenLesson(Long id){ return em.find(OpenLesson.class, id); }

    public Lesson findOneLesson(Long id){ return em.find(Lesson.class, id); }

    public void updatePoint(Long user_id, Long point){
        jpaQueryFactory
                .update(qUser)
                .where(qUser.id.eq(user_id))
                .set(qUser.point, qUser.point.add(point))
                .execute();

        em.clear();
        em.flush();
    }

    public void deleteOrders(Long ordersId){
        Orders orders = jpaQueryFactory
                .selectFrom(qOrders)
                .where(qOrders.id.eq(ordersId))
                .fetchOne();

        em.remove(orders);
    }

    public Long ordersCount(Long openLessonId){
        return jpaQueryFactory
                .select(qOrders.count())
                .from(qOrders)
                .where(qOrders.openLesson.id.eq(openLessonId))
                .fetchOne();
    }

    public boolean AttendedCheck(Long lessonId, User user) {
        if (user == null) return false;
        return jpaQueryFactory
                .select(qOrders.id)
                .from(qOrders)
                .where(
                        qOrders.openLesson.lessonId.eq(lessonId),
                        qOrders.user.eq(user)
                ).fetchFirst() != null;
    }
}
