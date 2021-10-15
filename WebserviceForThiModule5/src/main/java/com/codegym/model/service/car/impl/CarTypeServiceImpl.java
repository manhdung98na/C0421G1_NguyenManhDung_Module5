package com.codegym.model.service.car.impl;

import com.codegym.model.entity.customer.CarType;
import com.codegym.model.repository.car.CarTypeRepository;
import com.codegym.model.service.car.CarTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarTypeServiceImpl implements CarTypeService {
    @Autowired
    private CarTypeRepository carTypeRepository;

    @Override
    public List<CarType> findAll() {
        return carTypeRepository.findAll();
    }

    @Override
    public Optional<CarType> findById(int id) {
        return carTypeRepository.findById(id);
    }
}
