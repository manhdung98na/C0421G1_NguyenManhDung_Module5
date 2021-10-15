package com.codegym.model.service.customer;

import com.codegym.model.entity.Customer;
import com.codegym.model.service.GeneralService;

import java.util.List;

public interface CustomerService extends GeneralService {
    List<Customer> findAll();

    List<Customer> findCustomerUsingService();

    String checkId(String id);

    String checkName(String name);

    String checkBirthday(String birthday);

    String checkIdCard(String idCard);

    String checkIdCard(String idCard, String id);

    String checkPhone(String phone);

    String checkPhone(String phone, String id);

    String checkEmail(String email);

    String checkEmail(String email, String id);
}
