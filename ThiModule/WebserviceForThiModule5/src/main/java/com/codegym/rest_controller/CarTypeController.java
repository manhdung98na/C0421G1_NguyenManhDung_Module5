package com.codegym.rest_controller;

import com.codegym.model.entity.car.CarType;
import com.codegym.model.service.car.CarTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/carTypes")
public class CarTypeController {
    @Autowired
    private CarTypeService carTypeService;

    @GetMapping("")
    public ResponseEntity<List<CarType>> findAll() {
        return new ResponseEntity<>(carTypeService.findAll(), HttpStatus.OK);
    }
}
