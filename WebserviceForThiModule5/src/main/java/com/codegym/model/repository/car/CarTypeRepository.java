package com.codegym.model.repository.car;
import com.codegym.model.entity.customer.CarType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface CarTypeRepository extends JpaRepository<CarType, Integer> {
}