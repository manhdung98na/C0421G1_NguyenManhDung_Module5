package com.codegym.model.entity.car;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CarType {
    @Id
    private Integer id;

    private String name;

    @JsonBackReference
    @OneToMany(mappedBy = "type")
    private Set<Car> cars;
}
