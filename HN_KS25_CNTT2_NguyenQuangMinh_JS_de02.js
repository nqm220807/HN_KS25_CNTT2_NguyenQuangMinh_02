
let members = [
    { memberCode: "GYM-001", fullName: "Hoàng Văn Nam", packageName: "Gói Cơ Bản", age: 22, monthCount: 3 },
    { memberCode: "GYM-002", fullName: "Lý Thị Mai", packageName: "Gói Yoga", age: 30, monthCount: 6 },
    { memberCode: "GYM-003", fullName: "Bùi Đức Anh", packageName: "Gói Thể Hình Nâng Cao", age: 27, monthCount: 12 }
];

function validateMemberCode(code) {
    if (code === "") return "Chưa nhập mã hội viên";
    if (code.length < 6) return "Độ dài nhỏ hơn 6 ký tự";
    if (!code.startsWith("GYM-")) return 'Sai tiền tố "GYM-"';
    if (code.includes(" ")) return "Mã chứa khoảng trắng";
    if (findMemberIndex(code) !== -1) return "Mã hội viên đã tồn tại";
    return "";
}

function findMemberIndex(code) {
    for (let i = 0; i < members.length; i++) {
        if (members[i].memberCode === code) {
            return i;
        }
    }
    return -1;
}


function displayMembers(list) {
    if (list.length === 0) {
        console.log("Danh sách hội viên trống");
        return;
    }
    for (let i = 0; i < list.length; i++) {
        console.log((i + 1) + ". " + list[i].memberCode + " - " + list[i].fullName + " - " + list[i].packageName);
        console.log("Tuổi: " + list[i].age + " | Số tháng đăng ký: " + list[i].monthCount);
    }
    console.log("Tổng: " + list.length + " hội viên");
}

function showMembers() {
    if (members.length === 0) {
        console.log("Danh sách hội viên trống");
        return;
    }
    let choice = prompt("1. Theo thứ tự hiện tại\n2. Sắp xếp theo tuổi tăng dần");
    if (choice === null || choice.trim() === "1") {
        displayMembers(members);
    } else if (choice.trim() === "2") {
        let list = [];
        for (let i = 0; i < members.length; i++) {
            list.push(members[i]);
        }
        for (let i = 0; i < list.length - 1; i++) {
            for (let j = i + 1; j < list.length; j++) {
                if (list[i].age > list[j].age) {
                    let temp = list[i];
                    list[i] = list[j];
                    list[j] = temp;
                }
            }
        }
        displayMembers(list);
    } else {
        console.log("Lựa chọn không hợp lệ");
    }
}

function addMember() {
    let rawCode = prompt("Nhập mã hội viên:");
    if (rawCode === null) return;
    let code = rawCode.trim().toUpperCase();
    let error = validateMemberCode(code);
    if (error !== "") {
        console.log("Lỗi: " + error);
        return;
    }
    let name = prompt("Nhập họ tên:");
    if (name === null) return;
    while (name.trim() === "") {
        name = prompt("Họ tên không được để trống. Nhập lại:");
        if (name === null) return;
    }
    let fullName = normalizeText(name);
    let packageName = prompt("Nhập gói tập:");
    if (packageName === null) return;
    while (packageName.trim() === "") {
        packageName = prompt("Gói tập không được để trống. Nhập lại:");
        if (packageName === null) return;
    }
    packageName = normalizeText(packageName);
    let age = inputIntegerInRange("Nhập tuổi (16 - 70):", 16, 70);
    if (age === null) return;
    let monthCount = inputIntegerInRange("Nhập số tháng đăng ký (1 - 24):", 1, 24);
    if (monthCount === null) return;
    let newMember = {
        memberCode: code,
        fullName: fullName,
        packageName: packageName,
        age: age,
        monthCount: monthCount
    };
    members.push(newMember);
    console.log("Thêm hội viên thành công");
    displayMembers([newMember]);
}

function updateMember() {
    let rawCode = prompt("Nhập mã hội viên cần cập nhật:");
    if (rawCode === null) return;
    let code = rawCode.trim().toUpperCase();
    let index = findMemberIndex(code);
    if (index === -1) {
        console.log("Không tìm thấy hội viên có mã " + code);
        return;
    }
    let oldAge = members[index].age;
    let oldMonth = members[index].monthCount;
    let age = inputIntegerInRange("Nhập tuổi mới (16 - 70):", 16, 70);
    if (age === null) return;
    let month = inputIntegerInRange("Nhập số tháng đăng ký mới (1 - 24):", 1, 24);
    if (month === null) return;
    members[index].age = age;
    members[index].monthCount = month;
    console.log("Cập nhật thành công");
    console.log("Trước: " + oldAge + " / " + oldMonth);
    console.log("Sau: " + age + " / " + month);
}

function deleteMember() {
    let rawCode = prompt("Nhập mã hội viên cần xóa:");
    if (rawCode === null) return;
    let code = rawCode.trim().toUpperCase();
    let index = findMemberIndex(code);
    if (index === -1) {
        console.log("Không tìm thấy hội viên có mã " + code);
        return;
    }
    let confirm = prompt("Bạn có chắc chắn muốn xóa? (Y/N)");
    if (confirm !== null && confirm.trim().toUpperCase() === "Y") {
        members.splice(index, 1);
        console.log("Xóa thành công, còn " + members.length + " hội viên");
    } else {
        console.log("Đã hủy thao tác xóa, còn " + members.length + " hội viên");
    }
}

function searchMember() {
    let keyword = prompt("Nhập từ khóa tìm kiếm theo gói tập:");
    if (keyword === null || keyword.trim() === "") {
        console.log("Chưa nhập từ khóa tìm kiếm");
        return;
    }
    keyword = keyword.trim().toLowerCase();
    let result = [];
    for (let i = 0; i < members.length; i++) {
        if (members[i].packageName.toLowerCase().includes(keyword)) {
            result.push(members[i]);
        }
    }
    if (result.length === 0) {
        console.log("Không tìm thấy hội viên phù hợp");
    } else {
        displayMembers(result);
    }
}

while (true) {
    let choice = prompt("HỆ THỐNG QUẢN LÝ HỘI VIÊN FITZONE\n" +
        "1. Hiển thị danh sách hội viên\n" +
        "2. Thêm hội viên mới\n" +
        "3. Cập nhật thông tin hội viên\n" +
        "4. Xóa hội viên\n" +
        "5. Tìm kiếm hội viên theo gói tập\n" +
        "0. Thoát chương trình\n" +
        "Nhập lựa chọn (0 - 5):");
    if (choice === null || !["0", "1", "2", "3", "4", "5"].includes(choice.trim())) {
        console.log("Lựa chọn không hợp lệ");
        continue;
    }
    choice = choice.trim();
    switch (choice) {
        case "1":
            showMembers();
            break;
        case "2":
            addMember();
            break;
        case "3":
            updateMember();
            break;
        case "4":
            deleteMember();
            break;
        case "5":
            searchMember();
            break;

    }
    if (choice === "0") {
        break;
    }
}
