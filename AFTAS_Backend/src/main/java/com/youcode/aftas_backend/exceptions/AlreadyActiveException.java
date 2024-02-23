package com.youcode.aftas_backend.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class AlreadyActiveException extends RuntimeException{
    public AlreadyActiveException(String message) {
        super(message);
    }
}
