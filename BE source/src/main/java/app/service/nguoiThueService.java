package app.service;

import app.common.RestResponse;
import app.dto.request.createNguoiThueRequest;
import app.dto.request.updateNguoiThueRequest;
import app.dto.response.createNguoiThueResponse;
import app.dto.response.getListNguoiThueResponse;
import app.dto.response.getOneNguoiThueResponse;
import app.dto.response.updateNguoiThueResponse;
import app.entity.nguoiThue;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import app.repository.nguoiThueRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class nguoiThueService {
    @Autowired
    private final nguoiThueRepository NguoiThueRepository;
    private final ModelMapper mapper;

    public RestResponse<List<getListNguoiThueResponse>> GetListNguoiThue() {
        List<nguoiThue> dsNguoiThue = NguoiThueRepository.findAll();

        return RestResponse.<List<getListNguoiThueResponse>>builder()
                .status(HttpStatus.OK.value())
                .data(dsNguoiThue.stream()
                        .map(user -> mapper.map(user, getListNguoiThueResponse.class))
                        .collect(Collectors.toList()))
                .build();
    }

    public RestResponse<getOneNguoiThueResponse> GetOneNguoiThue(Long id) {
        Optional<nguoiThue> NguoiThue = NguoiThueRepository.findById(id);
        if (NguoiThue.isPresent()) {
            getOneNguoiThueResponse res = mapper.map(NguoiThue, getOneNguoiThueResponse.class);
            return RestResponse.<getOneNguoiThueResponse>builder()
                    .status(HttpStatus.OK.value())
                    .data(res)
                    .build();
        }
        else {
            return null;
        }
    }

    public RestResponse<createNguoiThueResponse> CreateNguoiThue(createNguoiThueRequest NguoiThue) {
        nguoiThue res = NguoiThueRepository.save(mapper.map(NguoiThue, nguoiThue.class));
        return RestResponse.<createNguoiThueResponse>builder()
                .status(HttpStatus.CREATED.value())
                .data(mapper.map(res, createNguoiThueResponse.class))
                .build();
    }

    public RestResponse<updateNguoiThueResponse> UpdateNguoiThue(updateNguoiThueRequest NguoiThue, Long id) {
        Optional<nguoiThue> nguoiThueCu = NguoiThueRepository.findById(id);
        if (nguoiThueCu.isPresent()) {
            if(NguoiThue.getHoTen() != null){
                nguoiThueCu.get().setHoTen(NguoiThue.getHoTen());
            }
            if(NguoiThue.getCccd() != null && NguoiThue.getCccd().length()==12){
                nguoiThueCu.get().setCccd(NguoiThue.getCccd());
            }
            if(NguoiThue.getSdt() != null){
                nguoiThueCu.get().setSdt(NguoiThue.getSdt());
            }
            if(NguoiThue.getNgaySinh() != null){
                nguoiThueCu.get().setNgaySinh(NguoiThue.getNgaySinh());
            }
            NguoiThueRepository.save(nguoiThueCu.get());
            return RestResponse.<updateNguoiThueResponse>builder()
                    .status(HttpStatus.OK.value())
                    .data(mapper.map(nguoiThueCu,updateNguoiThueResponse.class))
                    .build();
        }
        else {
            return null;
        }
    }

    public void DeleteNguoiThue(Long id) {
        NguoiThueRepository.deleteById(id);
    }
}
