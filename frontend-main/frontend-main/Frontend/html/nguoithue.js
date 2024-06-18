document.addEventListener('DOMContentLoaded', function() {
    // Mảng người thuê giả định ban đầu
    const tenants = [
        { id: 1, cmnd: '123456789', name: 'Nguyễn Văn A', dob: '1990-01-01', phone: '0901234567', room: '102', contractStartDate: '2023-01-01', contractEndDate: '2023-12-31' },
        { id: 2, cmnd: '987654321', name: 'Trần Thị B', dob: '1992-02-02', phone: '0909876543', room: '102', contractStartDate: '2023-02-01', contractEndDate: '2023-11-30' },
        { id: 3, cmnd: '456789123', name: 'Lê Văn C', dob: '1985-03-15', phone: '0906543210', room: '103', contractStartDate: '2023-03-01', contractEndDate: '2024-02-29' },
        { id: 4, cmnd: '321654987', name: 'Phạm Thị D', dob: '1995-04-10', phone: '0908765432', room: '104', contractStartDate: '2023-04-01', contractEndDate: '2024-03-31' },
        { id: 5, cmnd: '789123456', name: 'Hoàng Văn E', dob: '1988-05-20', phone: '0903456789', room: '105', contractStartDate: '2023-05-01', contractEndDate: '2024-04-30' },
        { id: 6, cmnd: '654987321', name: 'Đinh Thị F', dob: '1991-06-25', phone: '0902345678', room: '106', contractStartDate: '2023-06-01', contractEndDate: '2024-05-31' },
        { id: 7, cmnd: '147258369', name: 'Ngô Văn G', dob: '1990-07-30', phone: '0901230987', room: '103', contractStartDate: '2023-07-01', contractEndDate: '2024-06-30' },
        { id: 8, cmnd: '258369147', name: 'Bùi Thị H', dob: '1992-08-15', phone: '0909870123', room: '102', contractStartDate: '2023-08-01', contractEndDate: '2024-07-31' }
    ];

    // Hiển thị danh sách người thuê khi trang được tải
    loadTenantList();

    // Bắt sự kiện click vào nút "Thêm người thuê"
    document.getElementById('addTenantButton').addEventListener('click', function() {
        $('#addTenantModal').modal('show'); // Hiển thị modal
        document.getElementById('addTenantForm').setAttribute('data-mode', 'add'); // Đặt chế độ thêm mới
        document.getElementById('addTenantForm').setAttribute('data-index', ''); // Đặt chỉ số chỉ mục rỗng
    });

    // Xử lý sự kiện submit form "Thêm người thuê" hoặc "Sửa người thuê"
    document.getElementById('addTenantForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn chặn submit form mặc định

        // Lấy giá trị từ form
        var tenantID = document.getElementById('tenantID').value;
        var tenantName = document.getElementById('tenantName').value;
        var tenantDOB = document.getElementById('tenantDOB').value;
        var tenantPhone = document.getElementById('tenantPhone').value;
        var tenantRoom = document.getElementById('tenantRoom').value;
        var contractStartDate = document.getElementById('contractStartDate').value;
        var contractEndDate = document.getElementById('contractEndDate').value;

        // Lấy chế độ của form (thêm mới hoặc sửa)
        var mode = this.getAttribute('data-mode');
        var index = parseInt(this.getAttribute('data-index'));

        if (mode === 'add') {
            // Tạo đối tượng người thuê mới với các thuộc tính giống như các người thuê hiện có
            var newTenant = {
                id: tenants.length + 1, // Tạo id mới dựa trên số lượng người thuê hiện có
                cmnd: tenantID,
                name: tenantName,
                dob: tenantDOB,
                phone: tenantPhone,
                room: tenantRoom,
                contractStartDate: contractStartDate,
                contractEndDate: contractEndDate
            };

            // Thêm người thuê mới vào mảng tenants
            tenants.push(newTenant);
        } else if (mode === 'edit' && index >= 0) {
            // Cập nhật thông tin người thuê đã có
            tenants[index].cmnd = tenantID;
            tenants[index].name = tenantName;
            tenants[index].dob = tenantDOB;
            tenants[index].phone = tenantPhone;
            tenants[index].room = tenantRoom;
            tenants[index].contractStartDate = contractStartDate;
            tenants[index].contractEndDate = contractEndDate;
        }

        // Đóng modal sau khi thêm hoặc sửa thành công
        $('#addTenantModal').modal('hide');

        // Đặt lại form về trạng thái ban đầu
        document.getElementById('addTenantForm').reset();
        document.getElementById('addTenantForm').removeAttribute('data-mode');
        document.getElementById('addTenantForm').removeAttribute('data-index');

        // Cập nhật danh sách người thuê
        loadTenantList();
    });

    // Hàm hiển thị danh sách người thuê
    function loadTenantList() {
        var searchName = document.getElementById('searchInputName').value.toLowerCase();
        var searchRoom = document.getElementById('searchInputRoom').value.trim();

        var filteredTenants = tenants.filter(function(tenant) {
            var matchesName = tenant.name.toLowerCase().includes(searchName);
            var matchesRoom = tenant.room.toLowerCase().includes(searchRoom.toLowerCase());
            return matchesName && matchesRoom;
        });

        var tenantListDiv = document.getElementById('tenantList');
        tenantListDiv.innerHTML = '';

        filteredTenants.forEach(function(tenant, index) {
            var tenantDiv = document.createElement('div');
            tenantDiv.className = 'col-md-3 tenant-grid';
            tenantDiv.innerHTML = `
                <div class="room-product-main">
                    <div class="room-product-bottom">
                        <h4><a href="#">Họ tên: ${tenant.name}</a></h4>
                        <p>Số CMND: ${tenant.cmnd}</p>
                        <p>Ngày sinh: ${formatDate(tenant.dob)}</p>
                        <p>Số điện thoại: ${tenant.phone}</p>
                        <p>Số phòng: ${tenant.room}</p>
                        <p>Ngày bắt đầu hợp đồng: ${formatDate(tenant.contractStartDate)}</p>
                        <p>Ngày kết thúc hợp đồng: ${formatDate(tenant.contractEndDate)}</p>
                        <button class="btn btn-primary btn-sm edit-btn" data-index="${index}">Sửa</button>
                        <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Xóa</button>
                    </div>
                </div>
            `;
            tenantListDiv.appendChild(tenantDiv);
        });
        
        // Bắt sự kiện click vào nút "Sửa"
        document.querySelectorAll('.edit-btn').forEach(function(button) {
            button.addEventListener('click', function() {
                var index = this.getAttribute('data-index');
                var tenant = tenants[index];

                document.getElementById('tenantID').value = tenant.cmnd;
                document.getElementById('tenantName').value = tenant.name;
                document.getElementById('tenantDOB').value = tenant.dob;
                document.getElementById('tenantPhone').value = tenant.phone;
                document.getElementById('tenantRoom').value = tenant.room;
                document.getElementById('contractStartDate').value = tenant.contractStartDate;
                document.getElementById('contractEndDate').value = tenant.contractEndDate;

                $('#addTenantModal').modal('show');
                document.getElementById('addTenantForm').setAttribute('data-mode', 'edit');
                document.getElementById('addTenantForm').setAttribute('data-index', index);
            });
        });

        // Bắt sự kiện click vào nút "Xóa"
        document.querySelectorAll('.delete-btn').forEach(function(button) {
            button.addEventListener('click', function() {
                var index = this.getAttribute('data-index');

                if (confirm('Bạn có chắc chắn muốn xóa người thuê này?')) {
                    tenants.splice(index, 1);
                    loadTenantList();
                }
            });
        });
    }

    // Bắt sự kiện submit của form tìm kiếm
    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault();
        loadTenantList();
    });
    document.getElementById('searchFormRoom').addEventListener('submit', function(event) {
        event.preventDefault();
        loadTenantList();
    });

    // Hàm định dạng ngày tháng theo định dạng ngày-tháng-năm
    function formatDate(dateString) {
        var date = new Date(dateString);
        var day = ('0' + date.getDate()).slice(-2); // Định dạng ngày
        var month = ('0' + (date.getMonth() + 1)).slice(-2); // Định dạng tháng
        var year = date.getFullYear(); // Lấy năm
        return `${day}-${month}-${year}`; // Trả về định dạng ngày-tháng-năm
    }
});
