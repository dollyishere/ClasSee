package com.ssafy.config;

import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.JwtAuthenticationFilter;
import com.ssafy.common.auth.SsafyUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * 인증(authentication) 와 인가(authorization) 처리를 위한 스프링 시큐리티 설정 정의.
 */
@Configuration
@EnableWebSecurity
@EnableSwagger2
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private static String[] OPEN_API_PATH = new String[] {
            "/v2/api-docs/**",
            "/swagger-ui/**",
            "/swagger-resources/**",
            "/api/v1/article",
            "/api/v1/lessons/**",
            "/api/v1/mails/confirm/**",
            "/api/v1/photocard/list",
            "/api/v1/review/list/**",
            "/api/v1/users",
            "/api/v1/users/duplicate/**"
    };
    @Autowired
    private SsafyUserDetailService ssafyUserDetailService;

    @Autowired
    private UserService userService;

    @Autowired
    private RedisTemplate redisTemplate;

    // Password 인코딩 방식에 BCrypt 암호화 방식 사용
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // DAO 기반으로 Authentication Provider를 생성
    // BCrypt Password Encoder와 UserDetailService 구현체를 설정
    @Bean
    DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        daoAuthenticationProvider.setUserDetailsService(this.ssafyUserDetailService);
        return daoAuthenticationProvider;
    }

    // DAO 기반의 Authentication Provider가 적용되도록 설정
    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authenticationProvider());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                    .csrf().disable()
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 사용 하지않음
                .and()
                    .addFilter(new JwtAuthenticationFilter(authenticationManager(), userService, redisTemplate)) //HTTP 요청에 JWT 토큰 인증 필터를 거치도록 필터를 추가
                    .authorizeRequests()
                    .antMatchers("/api/v1/auth/login").permitAll()       //인증이 필요한 URL과 필요하지 않은 URL에 대하여 설정
                    .antMatchers("/api/v1/auth/kakao").permitAll()       //인증이 필요한 URL과 필요하지 않은 URL에 대하여 설정
                    .antMatchers("/api/v1/auth/salt").permitAll()       //인증이 필요한 URL과 필요하지 않은 URL에 대하여 설정
                    .antMatchers(HttpMethod.GET, OPEN_API_PATH).permitAll()       //인증이 필요한 URL과 필요하지 않은 URL에 대하여 설정
//                    .antMatchers("/api/v1/users/me", "/api/v1/auth/test").authenticated()       //인증이 필요한 URL과 필요하지 않은 URL에 대하여 설정
                    .anyRequest().authenticated()
                .and().cors();

    }
}