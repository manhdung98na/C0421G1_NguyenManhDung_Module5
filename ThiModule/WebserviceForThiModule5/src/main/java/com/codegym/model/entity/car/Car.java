package com.codegym.model.entity.car;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Car {
    @Id
    private Integer id;

    @ManyToOne(targetEntity = CarType.class)
    @JoinColumn(name = "type_id", referencedColumnName = "id")
    private CarType type;
    private String name;
    private String startPlace;
    private String endPlace;
    private String phone;
    private String email;
    private String timeStart;
    private String timeEnd;
    private boolean isDeleted;
}