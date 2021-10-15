package com.codegym.model.service.car;

import com.codegym.model.entity.car.Car;
import com.codegym.model.service.GeneralService;

import java.util.List;

public interface CarService extends GeneralService<Car, Integer> {
    List<Car> findAll();

    String checkId(Integer id);

//    String checkName(String name);

    String checkPhone(String phone);

    String checkPhone(String phone, Integer id);

    String checkEmail(String email);

    String checkEmail(String email, Integer id);

    List<Car> search(String type, String content);

}
