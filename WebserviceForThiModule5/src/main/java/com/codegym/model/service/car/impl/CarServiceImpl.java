package com.codegym.model.service.car.impl;

import com.codegym.model.entity.customer.Car;
import com.codegym.model.repository.car.CarRepository;
import com.codegym.model.service.car.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
    public Optional<Car> findById(Integer id) {
        return carRepository.findById(id);
    }

    @Override
    public List<Car> findAll() {
        return carRepository.findAllByDeletedIsFalse();
    }

//    @Override
//    public String checkId(String id) {
//        String regexId = "^KH-[0-9]{4}$";
//        if (!Pattern.matches(regexId, id)) {
//            return "Invalid ID! Format: KH-xxxx";
//        }
//        if (carRepository.existsById(id)) {
//            return "Duplicated Id!";
//        }
//        return null;
//    }
//
//    @Override
//    public String checkName(String name) {
//        String regexName = "^\\p{Lu}\\p{Ll}*(\\s\\p{Lu}\\p{Ll}*)*$";
//        if (!Pattern.matches(regexName, name)) {
//            return "Invalid name! Need to upper case EACH FIRST CHARACTER";
//        }
//        return null;
//    }
//
//    @Override
//    public String checkPhone(String phone) {
//        String regexPhone = "^(090|091|\\(84\\)\\+90|\\(84\\)\\+91)[0-9]{7}$";
//        if (!Pattern.matches(regexPhone, phone)) {
//            return "Invalid phone number! Format: 090xxxxxxx | 091xxxxxxx | (84)+90xxxxxxx | (84)+91xxxxxxx";
//        }
//        if (carRepository.existsByPhone(phone)) {
//            return "Duplicated Phone number!";
//        }
//        return null;
//    }
//
//    @Override
//    public String checkPhone(String phone, String id) {
//        String regexPhone = "^(090|091|\\(84\\)\\+90|\\(84\\)\\+91)[0-9]{7}$";
//        if (!Pattern.matches(regexPhone, phone)) {
//            return "Invalid phone number! Format: 090xxxxxxx | 091xxxxxxx | (84)+90xxxxxxx | (84)+91xxxxxxx";
//        }
//        List<Car> list = carRepository.findAll();
//        for (Car obj : list) {
//            if (!obj.getId().equals(id)) {
//                if (phone.equals(obj.getPhone())) {
//                    return "Duplicated Phone number!";
//                }
//            }
//        }
//        return null;
//    }
//
//    @Override
//    public String checkEmail(String email) {
//        String regexEmail = "^[A-Za-z0-9]+[A-Za-z0-9]*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)";
//        if (!Pattern.matches(regexEmail, email)) {
//            return "Invalid email! Format: abc@xyz.zyt";
//        }
//        if (carRepository.existsByEmail(email)) {
//            return "Duplicated Email!";
//        }
//        return null;
//    }
//
//    @Override
//    public String checkEmail(String email, String id) {
//        String regexEmail = "^[A-Za-z0-9]+[A-Za-z0-9]*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)";
//        if (!Pattern.matches(regexEmail, email)) {
//            return "Invalid email! Format: abc@xyz.zyt";
//        }
//        List<Car> list = carRepository.findAll();
//        for (Car obj : list) {
//            if (!obj.getId().equals(id)) {
//                if (email.equals(obj.getEmail())) {
//                    return "Duplicated Email!";
//                }
//            }
//        }
//        return null;
//    }

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