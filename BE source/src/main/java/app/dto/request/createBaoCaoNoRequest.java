package app.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDate;

@NoArgsConstructor
@Data

public class createBaoCaoNoRequest {
    long phong_id;
    long noDau;
    long phatSinh;
    long noCuoi;
    Instant thang;
}
