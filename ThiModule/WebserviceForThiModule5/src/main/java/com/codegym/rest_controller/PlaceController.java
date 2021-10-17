package com.codegym.rest_controller;

import com.codegym.model.entity.car.Place;
import com.codegym.model.service.car.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/places")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @GetMapping("")
    public ResponseEntity<List<Place>> findAll() {
        return new ResponseEntity<>(placeService.findAll(), HttpStatus.OK);
    }
}
