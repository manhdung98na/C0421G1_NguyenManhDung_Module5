package com.codegym.model.service.car.impl;

import com.codegym.model.entity.car.Car;
import com.codegym.model.repository.car.CarRepository;
import com.codegym.model.service.car.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class CarServiceImpl implements CarService {
    @Autowired
    private CarRepository carRepository;

    @Override
    public Page<Car> findAll(Pageable pageable) {
        return carRepository.findAllByDeletedIsFalse(pageable);
    }

    @Override
    public Car getById(Integer id) {
        return carRepository.findById(id).orElse(null);
    }

    @Override
    public List<Car> findAll() {
        return carRepository.findAllByDeletedIsFalse();
    }

    @Override
    public String checkId(Integer id) {
        if (carRepository.existsById(id)) {
            return "Duplicated ID!";
        }
        return null;
    }

    @Override
    public String checkPhone(String phone) {
        if (carRepository.existsByPhone(phone)) {
            return "Duplicated Phone number!";
        }
        return null;
    }

    @Override
    public String checkPhone(String phone, Integer id) {
        List<Car> list = carRepository.findAll();
        for (Car obj : list) {
            if (!obj.getId().equals(id)) {
                if (phone.equals(obj.getPhone())) {
                    return "Duplicated Phone number!";
                }
            }
        }
        return null;
    }

    @Override
    public String checkEmail(String email) {
        if (carRepository.existsByEmail(email)) {
            return "Duplicated Email!";
        }
        return null;
    }

    @Override
    public String checkEmail(String email, Integer id) {
        List<Car> list = carRepository.findAll();
        for (Car obj : list) {
            if (!obj.getId().equals(id)) {
                if (email.equals(obj.getEmail())) {
                    return "Duplicated Email!";
                }
            }
        }
        return null;
    }

    @Override
    public List<Car> search(String type, String content) {
        if (type.equals("id")){
            try {
                int idSearch = Integer.parseInt(content);
                return carRepository.searchByID(idSearch);
            }catch (Exception e){
                return null;
            }
        }
        if (type.equals("name")){
            return carRepository.searchByName(content);
        }
        return null;
    }

    @Override
    public Car save(Car car) {
        return carRepository.save(car);
    }

    @Override
    public void delete(Integer id) {
        Car car = carRepository.getById(id);
        car.setDeleted(true);
        carRepository.save(car);
    }

    @Override
    public Page<Car> search(String search, Pageable pageable) {
        return carRepository.search(search, pageable);
    }
}