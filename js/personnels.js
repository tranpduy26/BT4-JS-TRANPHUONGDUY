// Định nghĩa Personnel constructor
function Personnel(
  account,
  name,
  email,
  password,
  date,
  salary,
  position,
  hours
) {
  this.account = account;
  this.name = name;
  this.email = email;
  this.password = password;
  this.date = date;
  this.salary = salary;
  this.position = position;
  this.hours = hours;
}

Personnel.prototype.ranking = function () {
  if (this.hours >= 192) {
    return "Xuất sắc";
  } else if (this.hours >= 176) {
    return "Giỏi";
  } else if (this.hours >= 160) {
    return "Khá";
  } else {
    return "Trung bình";
  }
};

Personnel.prototype.sumSalary = function () {
  if (this.position === "Sếp") {
    return (this.salary * 3).toLocaleString();
  } else if (this.position === "Trưởng phòng") {
    return (this.salary * 2).toLocaleString();
  } else if (this.position === "Nhân viên") {
    return this.salary.toLocaleString();
  } else {
    ("Vui lòng chọn chức vụ");
  }
};
