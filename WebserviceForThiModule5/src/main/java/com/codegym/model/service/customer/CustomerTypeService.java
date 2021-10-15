package com.codegym.model.service.customer;

import com.codegym.model.entity.CustomerType;

import java.util.List;
import java.util.Optional;

public interface CustomerTypeService {

    List<CustomerType> findAll();

    Optional<CustomerType> findById(int id);
}
