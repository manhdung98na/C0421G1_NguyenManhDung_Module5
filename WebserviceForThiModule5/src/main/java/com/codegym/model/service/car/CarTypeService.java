package com.codegym.model.service.car;

import com.codegym.model.entity.customer.CarType;

import java.util.List;
import java.util.Optional;

public interface CarTypeService {

    List<CarType> findAll();

    Optional<CarType> findById(int id);
}
