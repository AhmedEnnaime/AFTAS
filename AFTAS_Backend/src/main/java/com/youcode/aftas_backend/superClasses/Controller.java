package com.youcode.aftas_backend.superClasses;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.validation.Valid;

@Component
public abstract class Controller<Dto, Identifier> {

    private ServiceInterface<Dto, Identifier> service;

    @Autowired
    public void setService(final ServiceInterface<Dto, Identifier> service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Dto> save(@Valid @RequestBody final Dto dto) {
        var savedDto = service.save(dto);
        return new ResponseEntity<>(savedDto, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Dto> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dto> find(@PathVariable("id") final Identifier id) {
        var foundedDto = service.find(id);
        return new ResponseEntity<>(foundedDto, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Dto> update(@PathVariable("id") final Identifier id, @Valid @RequestBody final Dto dto) {
        var updatedDto = service.update(id, dto);
        return new ResponseEntity<>(updatedDto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") final Identifier id) {
        service.delete(id);
        return new ResponseEntity<>("Resource deleted successfully.",HttpStatus.NO_CONTENT);
    }


}