let personnels = [];

let isSubmitted = false;

// Hàm thêm nhân viên
function addPersonnel() {
  isSubmitted = true;
  let personnel = validate();
  if (!personnel) {
    return;
  }

  personnels.push(personnel);

  display(personnels);

  resetForm();
}

//Hàm tìm kiếm
function findPersonnel() {
  let search = document.getElementById("searchName").value;
  search = search.trim().toLowerCase();

  let newPersonnels = personnels.filter((value) => {
    let rank = value.ranking().trim().toLowerCase();
    return rank.includes(search);
  });

  display(newPersonnels);
}

// Hàm xóa
function removePersonnel(personnelAccount) {
  let index = personnels.findIndex((value) => {
    return value.account === personnelAccount;
  });

  if (index !== -1) {
    personnels.splice(index, 1);
  }

  display(personnels);
}

// Hàm edit
function selectPersonnel(personnelAccount) {
  let personnel = personnels.find((value) => {
    return value.account === personnelAccount;
  });

  document.getElementById("tknv").value = personnel.account;
  document.getElementById("name").value = personnel.name;
  document.getElementById("email").value = personnel.email;
  document.getElementById("password").value = personnel.password;
  document.getElementById("datepicker").value = personnel.date;
  document.getElementById("luongCB").value = personnel.salary;
  document.getElementById("chucvu").value = personnel.position;
  document.getElementById("gioLam").value = personnel.hours;

  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").disabled = true;
}

// Hàm update
function updatePersonnel() {
  isSubmitted = true;

  let personnel = validate();
  if (!personnel) {
    return;
  }

  let index = personnels.findIndex((value) => {
    return value.account == personnel.account;
  });

  personnels[index] = personnel;

  display(personnels);

  resetForm();
}

// Hàm hiển thị
function display(personnels) {
  let html = personnels.reduce((result, value) => {
    return (
      result +
      `
        <tr>
          <td>${value.account}</td>
          <td>${value.name}</td>
          <td>${value.email}</td>
          <td>${value.date}</td>
          <td>${value.position}</td>
          <td>${value.sumSalary()}</td>
          <td>${value.ranking()}</td>
          <td>
            <button
              class="btn btn-warning"
              onclick="selectPersonnel('${value.account}')"
              data-toggle="modal"
              data-target="#myModal"
            >
              Chỉnh sửa
            </button>
            <button
              class="btn btn-danger"
              onclick="removePersonnel('${value.account}')"
            >
              Xoá
            </button>
          </td>
        </tr>
      `
    );
  }, "");

  document.getElementById("tableDanhSach").innerHTML = html;
}

// Hàm reset
function resetForm() {
  isSubmitted = false;

  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";

  document.getElementById("tbTKNV").innerHTML = "";
  document.getElementById("tbTen").innerHTML = "";
  document.getElementById("tbEmail").innerHTML = "";
  document.getElementById("tbMatKhau").innerHTML = "";
  document.getElementById("tbNgay").innerHTML = "";
  document.getElementById("tbLuongCB").innerHTML = "";
  document.getElementById("tbChucVu").innerHTML = "";
  document.getElementById("tbGiolam").innerHTML = "";

  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").disabled = false;
}

// Hàm kiểm tra giá trị có rỗng hay không
function isRequired(value) {
  if (!value.trim()) {
    // Chuỗi rỗng
    return false;
  }
  return true;
}

// Hàm kiểm tra lương có hợp lệ hay không
function isSalary(value) {
  if (isNaN(value)) {
    return false;
  }
  if (value < 1000000 || value > 20000000) {
    return false;
  }
  return true;
}

// Hàm kiểm số giờ làm có hợp lệ hay không
function isHours(value) {
  if (isNaN(value)) {
    return false;
  }
  if (value < 80 || value > 200) {
    return false;
  }
  return true;
}

// Hàm kiểm tra tài khoản
function isAccount(value) {
  let regex = /^[0-9]{4,6}$/;

  return regex.test(value);
}

// Hàm kiểm tra tên
function isName(value) {
  let regex = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;

  return regex.test(value);
}

// Hàm kiểm tra mật khẩu: ít nhất 8 kí tự, có ít nhất 1 chử hoa, 1 chử thường, 1 số, 1 kí tự đặc biệt
function isPassword(value) {
  let regex =
    /^(?=.*[A-Z])(?=.*[!&%\/()=\?\^\*\+\]\[#><;:,\._-|@])(?=.*[0-9])(?=.*[a-z]).{8,40}$/;

  return regex.test(value);
}

// Hàm kiểm tra email
function isEmail(value) {
  let regex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  return regex.test(value);
}

// Hàm kiểm tra thông tin của student có hợp lệ hay không
function validate() {
  let account = document.getElementById("tknv").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let date = document.getElementById("datepicker").value;
  let salary = document.getElementById("luongCB").value;
  let position = document.getElementById("chucvu").value;
  let hours = document.getElementById("gioLam").value;

  let isValid = true;

  let accountSpan = document.getElementById("tbTKNV");
  if (!isRequired(account)) {
    isValid = false;
    accountSpan.innerHTML = "Tài khoản không được để trống";
    accountSpan.style.display = "block";
  } else if (!isAccount(account)) {
    isValid = false;
    accountSpan.innerHTML =
      "Tài khoản không hợp lệ (Tài khoản là số và ít nhất 4 chữ số)";
    accountSpan.style.display = "block";
  }

  let nameSpan = document.getElementById("tbTen");
  if (!isRequired(name)) {
    isValid = false;
    nameSpan.innerHTML = "Tên không được để trống";
    nameSpan.style.display = "block";
  } else if (!isName(name)) {
    isValid = false;
    nameSpan.innerHTML = "Tên không hợp lệ (Tên không dấu)";
    nameSpan.style.display = "block";
  }

  let emailSpan = document.getElementById("tbEmail");
  if (!isRequired(email)) {
    isValid = false;
    emailSpan.innerHTML = "Email không được để trống";
    document.getElementById("tbEmail").style.display = "block";
  } else if (!isEmail(email)) {
    isValid = false;
    emailSpan.innerHTML = "Email không hợp lệ";
    document.getElementById("tbEmail").style.display = "block";
  }

  let pwSpan = document.getElementById("tbMatKhau");
  if (!isRequired(password)) {
    isValid = false;
    pwSpan.innerHTML = "Mật khẩu không được để trống";
    document.getElementById("tbMatKhau").style.display = "block";
  } else if (!isPassword(password)) {
    isValid = false;
    pwSpan.innerHTML =
      "Mật khẩu không hợp lệ (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
    document.getElementById("tbMatKhau").style.display = "block";
  }

  if (!isRequired(date)) {
    isValid = false;
    document.getElementById("tbNgay").innerHTML =
      "Ngày làm việc không được để trống";
    document.getElementById("tbNgay").style.display = "block";
  }

  if (!isRequired(position)) {
    isValid = false;
    document.getElementById("tbChucVu").innerHTML =
      "Chức vụ không được để trống";
    document.getElementById("tbChucVu").style.display = "block";
  }

  let salarySpan = document.getElementById("tbLuongCB");
  if (!isRequired(salary)) {
    isValid = false;
    salarySpan.innerHTML = "Lương cơ bản không được để trống";
    document.getElementById("tbLuongCB").style.display = "block";
  } else if (!isSalary(+salary)) {
    isValid = false;
    salarySpan.innerHTML = "Lương cơ bản không hợp lệ";
    document.getElementById("tbLuongCB").style.display = "block";
  }

  let hoursSpan = document.getElementById("tbGiolam");
  if (!isRequired(hours)) {
    isValid = false;
    hoursSpan.innerHTML = "Tổng giờ làm không được để trống";
    document.getElementById("tbGiolam").style.display = "block";
  } else if (!isHours(+hours)) {
    isValid = false;
    hoursSpan.innerHTML = "Tổng giờ làm không hợp lệ";
    document.getElementById("tbGiolam").style.display = "block";
  }

  if (isValid) {
    let personnel = new Personnel(
      account,
      name,
      email,
      password,
      date,
      +salary,
      position,
      +hours
    );

    return personnel;
  }
  return undefined;
}

document.getElementById("tknv").oninput = (event) => {
  if (!isSubmitted) return;
  let accountSpan = document.getElementById("tbTKNV");
  if (isRequired(event.target.value)) {
    accountSpan.innerHTML = "";
  } else {
    accountSpan.innerHTML = "Tài khoản không được để trống";
  }
};

document.getElementById("name").oninput = (event) => {
  if (!isSubmitted) return;
  let accountSpan = document.getElementById("tbTen");
  if (isRequired(event.target.value)) {
    accountSpan.innerHTML = "";
  } else {
    accountSpan.innerHTML = "Tên không được để trống";
  }
};
document.getElementById("email").oninput = (event) => {
  if (!isSubmitted) return;
  let accountSpan = document.getElementById("tbEmail");
  if (isRequired(event.target.value)) {
    accountSpan.innerHTML = "";
  } else {
    accountSpan.innerHTML = "Email không được để trống";
  }
};
document.getElementById("password").oninput = (event) => {
  if (!isSubmitted) return;
  let accountSpan = document.getElementById("tbMatKhau");
  if (isRequired(event.target.value)) {
    accountSpan.innerHTML = "";
  } else {
    accountSpan.innerHTML = "Mật khẩu không được để trống";
  }
};
document.getElementById("datepicker").oninput = (event) => {
  if (!isSubmitted) return;
  let accountSpan = document.getElementById("tbNgay");
  if (isRequired(event.target.value)) {
    accountSpan.innerHTML = "";
  } else {
    accountSpan.innerHTML = "Ngày không được để trống";
  }
};
document.getElementById("luongCB").oninput = (event) => {
  if (!isSubmitted) return;
  let accountSpan = document.getElementById("tbLuongCB");
  if (isRequired(event.target.value)) {
    accountSpan.innerHTML = "";
  } else {
    accountSpan.innerHTML = "Lương không được để trống";
  }
};
document.getElementById("chucvu").oninput = (event) => {
  if (!isSubmitted) return;
  let accountSpan = document.getElementById("tbChucVu");
  if (isRequired(event.target.value)) {
    accountSpan.innerHTML = "";
  } else {
    accountSpan.innerHTML = "Chức vụ không được để trống";
  }
};
document.getElementById("gioLam").oninput = (event) => {
  if (!isSubmitted) return;
  let accountSpan = document.getElementById("tbGiolam");
  if (isRequired(event.target.value)) {
    accountSpan.innerHTML = "";
  } else {
    accountSpan.innerHTML = "Tổng giờ làm không được để trống";
  }
};
