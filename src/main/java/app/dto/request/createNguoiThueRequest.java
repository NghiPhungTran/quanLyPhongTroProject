package app.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDate;

@NoArgsConstructor
@Data

public class createNguoiThueRequest {
    String hoTen;
    String diaChi;
    Instant ngaySinh;
    String cccd;
    String sdt;
}
