package com.codegym.model.service.car;

import com.codegym.model.entity.car.CarType;

import java.util.List;
import java.util.Optional;

public interface CarTypeService {

    List<CarType> findAll();

    Optional<CarType> findById(int id);
}
