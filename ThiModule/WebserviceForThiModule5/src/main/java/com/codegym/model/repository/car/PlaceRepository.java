package com.codegym.model.repository.car;

import com.codegym.model.entity.car.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Transactional
@Repository
public interface PlaceRepository extends JpaRepository<Place, Integer> {
}
