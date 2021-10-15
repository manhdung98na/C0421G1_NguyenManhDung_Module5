package com.codegym.model.repository.car;

import com.codegym.model.entity.customer.Car;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface CarRepository extends JpaRepository<Car, Integer> {
    @Query("select c from Car c where c.isDeleted=false")
    Page<Car> findAllByDeletedIsFalse(Pageable pageable);

    @Query("select c from Car c where c.isDeleted=false")
    List<Car> findAllByDeletedIsFalse();

    boolean existsByPhone(String customerPhone);

    boolean existsByEmail(String customerEmail);

    @Query("select c from Car c where (c.name like CONCAT('%',:search,'%') or " +
            "c.email like CONCAT('%',:search,'%') or c.phone like CONCAT('%',:search,'%')) " +
            "and c.isDeleted = false")
    Page<Car> search(@Param("search") String search, Pageable pageable);
}