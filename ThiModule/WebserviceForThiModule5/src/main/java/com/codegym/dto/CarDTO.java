package com.codegym.dto;

import com.codegym.model.entity.car.CarType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.regex.Pattern;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CarDTO implements Validator {
    private Integer id;
    private CarType type;
    private String name;
    private String startPlace;
    private String endPlace;
    private String phone;
    private String email;
    private String timeStart;
    private String timeEnd;

    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {
        CarDTO carDTO = (CarDTO) target;
        if (carDTO.id == null) {
            errors.rejectValue("id", "", "Required");
        }

        if (carDTO.name == null) {
            errors.rejectValue("name", "", "Required");
        }

        if (carDTO.startPlace == null) {
            errors.rejectValue("startPlace", "", "Required");
        }

        if (carDTO.endPlace == null) {
            errors.rejectValue("endPlace", "", "Required");
        }

        if (carDTO.timeStart == null) {
            errors.rejectValue("timeStart", "", "Required");
        } else {
            if (carDTO.timeStart.length() > 5 || carDTO.timeStart.length() < 4) {
                errors.rejectValue("timeStart", "", "Sai định dạng: hh:mm");
            } else {
                if (Integer.parseInt(carDTO.timeStart.substring(0, 2)) < 5 || Integer.parseInt(carDTO.timeStart.substring(0, 2)) >= 23) {
                    errors.rejectValue("timeStart", "", "Lớn hơn 5:00 và nhỏ hơn 23:00");
                }
            }
        }
        if (carDTO.timeEnd == null) {
            errors.rejectValue("timeEnd", "", "Required");
        } else {
            if (carDTO.timeEnd.length() > 5 || carDTO.timeEnd.length() < 4) {
                errors.rejectValue("timeEnd", "", "Sai định dạng: hh:mm");
            } else {
                if (Integer.parseInt(carDTO.timeEnd.substring(0, 2)) < 5 || Integer.parseInt(carDTO.timeEnd.substring(0, 2)) >= 23) {
                    errors.rejectValue("timeEnd", "", "Lớn hơn 5:00 và nhỏ hơn 23:00");
                }
            }
        }
        if (carDTO.phone == null) {
            errors.rejectValue("phone", "", "Required");
        } else {
            String regexPhone = "^(090|093|097)[0-9]{7}$";
            if (!Pattern.matches(regexPhone, carDTO.phone)) {
                errors.rejectValue("phone", "", "Format: (090|093|097 and 7 digital numbers)");
            }
        }
        if (carDTO.email == null) {
            errors.rejectValue("email", "", "Required");
        } else {
            String regexEmail = "^[A-Za-z0-9]+[A-Za-z0-9]*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)";
            if (!Pattern.matches(regexEmail, carDTO.email)) {
                errors.rejectValue("email", "", "Invalid email! Format: abc@xyz.zyt");
            }
        }
    }

    @Override
    public String toString() {
        return "CarDTO{" +
                "id=" + id +
                ", type=" + type +
                ", name='" + name + '\'' +
                ", startPlace='" + startPlace + '\'' +
                ", endPlace='" + endPlace + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", timeStart='" + timeStart + '\'' +
                ", timeEnd='" + timeEnd + '\'' +
                '}';
    }
}
