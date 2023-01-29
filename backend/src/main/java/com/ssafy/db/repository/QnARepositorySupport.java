package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class QnARepositorySupport {

    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;



}
