package com.ssafy.api.service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
public interface EmailService {
    MimeMessage createMessage(String to, String code) throws MessagingException, UnsupportedEncodingException;
    String sendSimpleMessage(String to) throws Exception;
}
