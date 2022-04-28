function Validation() {
    this.kiemTraRong = function (value, errorId, mess) {
        if (value === "") {
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }
        getEle(errorId).innerHTML = "";
        getEle(errorId).style.display = "none";
        return true;
    };
    this.kiemTraDoDaiKyTu = function(value,errorId,mess,min,max){
        if(value.trim().length >= min && value.trim().length <= max){
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }
        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    }
    this.kiemTraChuoiKyTu = function (value,errorId,mess){
        var letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if(value.match(letter)){
            //hop le
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }

        //ko hop le
        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    }
    this.kiemTraEmail = function (value,errorId,mess){
        var letter = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";
        if(value.match(letter)){
            //hop le
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }

        //ko hop le
        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    }
    this.kiemTraPass = function (value,errorId,mess){
        var letter ="(?=.*[AZ])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.{6,8})";
        if(value.match(letter)){
            //hop le
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }

        //ko hop le
        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    }
}