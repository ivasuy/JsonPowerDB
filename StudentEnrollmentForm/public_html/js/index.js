/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

$('#rollno').focus();

function getRoll() {
    var rollnoJsonObj = getRollNoAsJson();
    var getReq = createGET_BY_KEYRequest("90938202|-31949272821081575|90954800",
            "SCHOOL-DB", "STUDENT-TABLE", rollnoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resObj = executeCommandAtGivenBaseUrl(getReq,
            "http://api.login2explore.com:5577", "/api/irl");
    jQuery.ajaxSetup({async: true});
    if (resObj.status === 400) {

        $('#save').prop("disabled", false);
        $('#reset').prop("disabled", false);
        $('#rollno').focus();

    } else if (resObj.status === 200) {

        $('#rollno').prop("disabled", true);
        fillData(resObj);

        $('#update').prop("disabled", false);
        $('#reset').prop("disabled", false);
        $('#rollno').focus();
    }
}

function saveRec(jsonObj){
    var data = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", data.rec_no);
}

function getRollNoAsJson(){
    var rollno =  $('#rollno').val();
    var jsonStr = {
        id : rollno
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRec(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $('#name').val(record.name);
    $('#class').val(record.class);
    $('#dob').val(record.dob);
    $('#add').val(record.add);
    $('#ed').val(record.ed);
}

function validateForm() {
    var rollNo, stuName, stuClass, dob, add, ed;
    rollNo = $("#rollno").val();
    stuName = $("#name").val();
    stuClass = $("#class").val();
    dob = $("#dob").val();
    add = $("#add").val();
    ed = $("#ed").val();

    if (rollNo === "") {
        alert('Roll Number is Missing !');
        $('#rollno').focus();
        return "";
    }
    if (stuName === "") {
        alert('Name is Missing !');
        $('#name').focus();
        return "";
    }
    if (stuClass === "") {
        alert('Class is Missing !');
        $('#class').focus();
        return "";
    }
    if (dob === "") {
        alert('Date of Birth is Missing !');
        $('#dob').focus();
        return "";
    }
    if (add === "") {
        alert('Address is Missing !');
        $('#add').focus();
        return "";
    }
    if (ed === "") {
        alert('Enrollment Date is Missing !');
        $('#ed').focus();
        return "";
    }

    var jsonStrObj = {
        id: rollNo,
        name: stuName,
        class: stuClass,
        dob: dob,
        address: add,
        e_date: ed
    };
    return JSON.stringify(jsonStrObj);
}

function saveData() {
    var jsonStrObj = validateForm();
    if (jsonStrObj === '') {
        return "";
    }
    var putReq = createPUTRequest("90938202|-31949272821081575|90954800",
            jsonStrObj, "SCHOOL-DB", "STUDENT-TABLE");
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReq,
            "http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({async: true});
    resetData();
    $('#rollno').focus();
}

function updateData() {
    $('#update').prop("disabled", true);
    var jsonchg = validateForm();
    var updateReq = createUPDATERecordRequest("90938202|-31949272821081575|90954800",
            jsonchg, "SCHOOL-DB", "STUDENT-TABLE", localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(updateReq,
            "http://api.login2explore.com:5577", "/api/iml");
    jQuery.ajaxSetup({async: true});
    resetData();
    $('#rollno').focus();
}

function resetData() {
    $('#rollno').val("");
    $('#name').val("");
    $('#class').val("");
    $('#dob').val("");
    $('#add').val("");
    $('#ed').val("");
    $('#rollno').prop("disabled", false);
    $('#save').prop("disabled", true);
    $('#update').prop("disabled", true);
    $('#reset').prop("disabled", true);
    $('#rollno').focus();
}

