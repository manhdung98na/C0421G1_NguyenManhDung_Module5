package com.codegym.rest_controller;

import com.codegym.dto.CarDTO;
import com.codegym.model.entity.car.Car;
import com.codegym.model.service.car.CarService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/cars")
public class CarController {
    @Autowired
    private CarService carService;

    @GetMapping("")
    public ResponseEntity<List<Car>> findAll() {
        return new ResponseEntity<>(carService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<Car> getById(@PathVariable Integer id) {
        Car carOptional = carService.getById(id);
        if (carOptional == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(carOptional, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Car>> search(@RequestParam Optional<String> type, @RequestParam Optional<String> content) {
        String typeSearch = type.orElse(null);
        String contentSearch = content.orElse(null);
        if (typeSearch != null && contentSearch != null) {
            return new ResponseEntity<>(carService.search(typeSearch, contentSearch), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("")
    public String createNewCar(@RequestBody CarDTO data, BindingResult bindingResult) {
        new CarDTO().validate(data, bindingResult);
        if (bindingResult.hasErrors()) {
            return bindingResult.getAllErrors().get(0).getDefaultMessage();
        } else {
            Car carCreate = new Car();
            BeanUtils.copyProperties(data, carCreate);
            carCreate.setDeleted(false);
            if (carService.checkId(carCreate.getId()) != null) return carService.checkId(carCreate.getId());
            if (carService.checkEmail(carCreate.getEmail()) != null) return carService.checkEmail(carCreate.getEmail());
            if (carService.checkPhone(carCreate.getPhone()) != null) return carService.checkPhone(carCreate.getPhone());
            carService.save(carCreate);
            return null;
        }
    }

    @PutMapping("/{id}")
    public String updateCar(@RequestBody CarDTO data, BindingResult bindingResult, @PathVariable Integer id) {
        new CarDTO().validate(data, bindingResult);
        if (bindingResult.hasErrors()) {
            return bindingResult.getAllErrors().get(0).getDefaultMessage();
        } else {
            Car carUpdate = new Car();
            BeanUtils.copyProperties(data, carUpdate);
            carUpdate.setDeleted(false);
            boolean checkEmail = carService.checkEmail(carUpdate.getEmail(), carUpdate.getId()) != null;
            boolean checkPhone = carService.checkPhone(carUpdate.getPhone(), carUpdate.getId()) != null;
            if (!id.equals(carUpdate.getId())) {
                return "Must not change ID!";
            }
            if (checkEmail) {
                return "Duplicated email!";
            }
            if (checkPhone) {
                return "Duplicated phone!";
            }
            carService.save(carUpdate);
            return null;
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        Car carDelete = carService.getById(id);
        if (carDelete != null) {
            carDelete.setDeleted(true);
            carService.save(carDelete);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
