package com.codegym.model.service.car.impl;

import com.codegym.model.entity.car.Place;
import com.codegym.model.repository.car.PlaceRepository;
import com.codegym.model.service.car.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceServiceImpl implements PlaceService {

    @Autowired
    private PlaceRepository repository;

    @Override
    public List<Place> findAll() {
        return repository.findAll();
    }
}
