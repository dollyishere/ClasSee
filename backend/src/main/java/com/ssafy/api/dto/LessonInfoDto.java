package com.ssafy.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
/*
- 강의명
- 소요시간
- 카테고리
- 이미지
- 별점 평균
*/
@Builder
@Getter
@Setter
public class LessonInfoDto {
    Long id; // 레슨 아이디
    String name;
    Long runningtime;
    String category;
    String img;
    double score;

    boolean isBookmarked;

}
