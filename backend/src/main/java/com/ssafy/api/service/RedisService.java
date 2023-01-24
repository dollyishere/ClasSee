package com.ssafy.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
@PropertySource("classpath:application.properties")
public class RedisService {

    private final RedisTemplate redisTemplate;


    @Value("${jwt.expiration.atk}")
    private Long EXPIRED_MINUTES; // 로그인 유효 시간

    public void setValues(String token, String email){
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        values.set(email, token, Duration.ofMinutes(EXPIRED_MINUTES));
    }

    public void setValues(String token, String email, Long expiration){
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        values.set(email, token, Duration.ofMillis(expiration));
    }

    public void setBlackList(String token, String email){
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        values.set(email, token, Duration.ofMinutes(EXPIRED_MINUTES));
    }

    public String getValues(String token){
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        return values.get(token);
    }

    public void deleteValues(String token){
        redisTemplate.delete(token);
    }
}
