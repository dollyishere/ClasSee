package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.lesson.Lesson;
import com.ssafy.db.entity.lesson.OpenLesson;
import com.ssafy.db.entity.lesson.QLesson;
import com.ssafy.db.entity.lesson.QOpenLesson;
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

    public void save(Orders orders) { em.persist(orders); }

    public void delete(Orders orders){ em.remove(orders); }

    public Orders findOne(Long id){ return em.find(Orders.class, id); }

    public OpenLesson findOneOpenLesson(Long id){ return em.find(OpenLesson.class, id); }

    public Lesson findOneLesson(Long id){ return em.find(Lesson.class, id); }

}
