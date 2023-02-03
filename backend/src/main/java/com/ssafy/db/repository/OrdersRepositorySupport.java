package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.lesson.*;
import com.ssafy.db.entity.orders.Orders;
import com.ssafy.db.entity.orders.QOrders;
import com.ssafy.db.entity.user.QUser;
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

    QOpenLesson qOpenLesson = QOpenLesson.openLesson;

    QLesson qLesson = QLesson.lesson;

    QSchedule qSchedule = QSchedule.schedule;

    public void save(Orders orders) { em.persist(orders); }

    public void saveSchedule(Schedule schedule) { em.persist(schedule); }

    public void delete(Orders orders){ em.remove(orders); }

    public Orders findOne(Long id){ return em.find(Orders.class, id); }

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

    public void deleteOrders(Long user_id, Long openLesson_id){

        Schedule schedule = jpaQueryFactory
                .selectFrom(qSchedule)
                .where(qSchedule.user.id.eq(user_id), qSchedule.openLesson.id.eq(openLesson_id))
                .fetchOne();

        em.remove(schedule);

        Orders orders = jpaQueryFactory
                .selectFrom(qOrders)
                .where(qOrders.user.id.eq(user_id), qOrders.openLesson.id.eq(openLesson_id))
                .fetchOne();

        em.remove(orders);
    }

}
