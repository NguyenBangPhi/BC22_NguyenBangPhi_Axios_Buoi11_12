let services = new Services();

let validation = new Validation();
let dataTemp = [];
function getListND(){
    services.fetchData()
    .then(function(result){
        dataTemp = result.data;
        renderHTML(result.data);
        
    })
    .catch(function(error){
        console.log(error);
    })
}
getListND();
function renderHTML(data) {
    var content = "";
    for (var i = 0; i < data.length; i++) {
        var nguoidung = data[i];
        if (nguoidung.loaiND === "HV") {
            continue;
        }
        content += `
            <tr>
                <td>${i+1}</td>
                <td>${nguoidung.taiKhoan}</td>
                <td>${nguoidung.matKhau}</td>
                <td>${nguoidung.hoTen}</td>
                <td>${nguoidung.email}</td>
                <td>${nguoidung.ngonNgu})</td>
                <td>${nguoidung.loaiND}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="sua(${nguoidung.id})">Sửa</button>
                    <button class="btn btn-danger" onclick="xoa(${nguoidung.id})">Xóa</button>
                </td>
            </tr>
        
        `;
    }
    document.getElementById("tblDanhSachNguoiDung").innerHTML = content;
}

getEle("btnThemNguoiDung").addEventListener("click",function(){
    getEle("TaiKhoan").value = "";
    getEle("HoTen").value = "";
    getEle("MatKhau").value = "";
    getEle("Email").value = "";
    getEle("HinhAnh").value = "";
    getEle("loaiNguoiDung").value = "Chọn loại người dùng";
    getEle("loaiNgonNgu").value = "Chọn ngôn ngữ";
    getEle("MoTa").value = "";
    document.getElementsByClassName("modal-title")[0].innerHTML =
      "Thêm sản phẩm";
    var footer = `<button class="btn btn-success" onclick="addND()">Add</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

function addND() {
    let taiKhoan = getEle("TaiKhoan").value;
    let hoTen = getEle("HoTen").value;
    let matKhau = getEle("MatKhau").value;
    let email = getEle("Email").value;
    let hinhAnh = getEle("HinhAnh").value;
    let loaiND = getEle("loaiNguoiDung").value;
    let ngonNgu = getEle("loaiNgonNgu").value;
    let moTa = getEle("MoTa").value;

    let flag = true;
    flag &= validation.kiemTraRong(taiKhoan,"divErrorTaiKhoan","Tài khoản không để rỗng !");
    for (let i = 0; i < dataTemp.length; i++) {
        if(dataTemp[i].taiKhoan === taiKhoan){
            flag &= false;
            getEle("divErrorTaiKhoan").innerHTML = "Tài khoản đã tồn tại !";
            getEle("divErrorTaiKhoan").style.display = "block";
            break;
        };
    }

    flag &= validation.kiemTraRong(hoTen,"divErrorHoTen","Họ tên không để trống !") && 
            validation.kiemTraChuoiKyTu(hoTen,"divErrorHoTen","Họ tên không chứa số và kí tự đặc biệt !");

    flag &= validation.kiemTraRong(matKhau,"divErrorMatKhau","Mật khẩu không để trống !") &&
            validation.kiemTraPass(matKhau,"divErrorMatKhau","Mật khẩu sai định dạng !");
    
    flag &= validation.kiemTraRong(email,"divErrorEmail","Email không để trống !") &&
            validation.kiemTraEmail(email,"divErrorEmail","Email sai định dạng !");
        
    flag &= validation.kiemTraRong(hinhAnh,"divErrorHinh","Hình ảnh không để trống !");

    if(loaiND === "Chọn loại người dùng"){
        getEle("divErrorLoaiND").innerHTML = "Phải chọn loại người dùng !";
        getEle("divErrorLoaiND").style.display = "block";
    }else{
        getEle("divErrorLoaiND").style.display = "none";
    }

    if(ngonNgu === "Chọn ngôn ngữ"){
        getEle("divErrorLoaiNN").innerHTML = "Phải chọn ngôn ngữ !";
        getEle("divErrorLoaiNN").style.display = "block";
    }else{
        getEle("divErrorLoaiNN").style.display = "none";
    }

    flag &= validation.kiemTraRong(moTa,"divErrorMoTa","Mô tả không để trống !") &&
            validation.kiemTraDoDaiKyTu(moTa,"divErrorMoTa","Độ dài từ 60 kí tự trở xuống !",1,60);
    
    if(!flag){
        return null;
    }

    let nguoiDung = new NguoiDung("",taiKhoan,hoTen,matKhau,email,loaiND,ngonNgu,moTa,hinhAnh);
    services.addNDApi(nguoiDung)
    .then(function(){
        getListND();
        document.getElementsByClassName("close")[0].click();
    })
    .catch(function(error){
        console.log(error);
    })
}

function sua(id) {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa sản phẩm";
    let footer = `<button class="btn btn-warning" onclick="capNhat(${id})">UPDATE</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

    services.getNDById(id)
    .then(function(result){
        let nguoiDung = result.data;
        document.getElementsByClassName("close")[0].click();
        getEle("TaiKhoan").value = nguoiDung.taiKhoan;
        getEle("HoTen").value = nguoiDung.hoTen;
        getEle("MatKhau").value = nguoiDung.matKhau;
        getEle("Email").value = nguoiDung.email;
        getEle("HinhAnh").value = nguoiDung.hinhAnh;
        getEle("loaiNguoiDung").value = nguoiDung.loaiND;
        getEle("loaiNgonNgu").value = nguoiDung.ngonNgu;
        getEle("MoTa").value = nguoiDung.moTa;
    })
    .catch(function(error){
        console.log(error);
    })
}


function capNhat(id) {
    let taiKhoan = getEle("TaiKhoan").value;
    let hoTen = getEle("HoTen").value;
    let matKhau = getEle("MatKhau").value;
    let email = getEle("Email").value;
    let hinhAnh = getEle("HinhAnh").value;
    let loaiND = getEle("loaiNguoiDung").value;
    let ngonNgu = getEle("loaiNgonNgu").value;
    let moTa = getEle("MoTa").value;

    let flag = true;
    flag &= validation.kiemTraRong(taiKhoan,"divErrorTaiKhoan","Tài khoản không để rỗng !");
    for (let i = 0; i < dataTemp.length; i++) {
        if(dataTemp[i].taiKhoan === taiKhoan){
            flag &= false;
            getEle("divErrorTaiKhoan").innerHTML = "Tài khoản đã tồn tại !";
            getEle("divErrorTaiKhoan").style.display = "block";
            break;
        };
    }

    flag &= validation.kiemTraRong(hoTen,"divErrorHoTen","Họ tên không để trống !") && 
            validation.kiemTraChuoiKyTu(hoTen,"divErrorHoTen","Họ tên không chứa số và kí tự đặc biệt !");

    flag &= validation.kiemTraRong(matKhau,"divErrorMatKhau","Mật khẩu không để trống !") &&
            validation.kiemTraPass(matKhau,"divErrorMatKhau","Mật khẩu sai định dạng !");
    
    flag &= validation.kiemTraRong(email,"divErrorEmail","Email không để trống !") &&
            validation.kiemTraEmail(email,"divErrorEmail","Email sai định dạng !");
        
    flag &= validation.kiemTraRong(hinhAnh,"divErrorHinh","Hình ảnh không để trống !");

    if(loaiND === "Chọn loại người dùng"){
        getEle("divErrorLoaiND").innerHTML = "Phải chọn loại người dùng !";
        getEle("divErrorLoaiND").style.display = "block";
    }else{
        getEle("divErrorLoaiND").style.display = "none";
    }

    if(ngonNgu === "Chọn ngôn ngữ"){
        getEle("divErrorLoaiNN").innerHTML = "Phải chọn ngôn ngữ !";
        getEle("divErrorLoaiNN").style.display = "block";
    }else{
        getEle("divErrorLoaiNN").style.display = "none";
    }

    flag &= validation.kiemTraRong(moTa,"divErrorMoTa","Mô tả không để trống !") &&
            validation.kiemTraDoDaiKyTu(moTa,"divErrorMoTa","Độ dài từ 60 kí tự trở xuống !",1,60);
    
    if(!flag){
        return null;
    }

    let nguoiDung = new NguoiDung(id,taiKhoan,hoTen,matKhau,email,loaiND,ngonNgu,moTa,hinhAnh);
    
    services.updateND(nguoiDung)
    .then(function(){
        getListND();
        document.getElementsByClassName("close")[0].click();
    })
    .catch(function(error){
        console.log(error);
    })

}

function xoa(id) {
    services.deleteND(id)
    .then(function(result){
        console.log(result);
        //xóa thành công => fetch lại data mới
        getListND();
    })
    .catch(function(error){
        console.log(error);
    })
}









function getEle(id) {
    return document.getElementById(id);
}