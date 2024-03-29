import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

let mode = "CREATE"; // default mode
let selectedId = "";

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (id) {
        mode = "EDIT";
        selectedId = id;

        try {
            const response = await axios.get(`${BASE_URL}/users/${id}`);
            const project = response.data;

            let projectname = document.querySelector("input[name=projectname]");
            let detail =  document.querySelector("input[name=detail]");
            let responsible = document.querySelector("input[name=responsible]");
            let activity = document.querySelector("input[name=activity]");
            let start= document.querySelector("input[name=start]");
            let end  =  document.querySelector("input[name=end]");
            let progress= document.querySelector("input[name=progress]");
            let Cost_budget= document.querySelector("input[name=Cost_budget]");
            let financial_budget= document.querySelector("input[name=financial_budget]");
            let spending = document.querySelector("input[name=spending]");

            projectname.value = project.projectname;
            detail.value = project.detail;
            responsible.value = project.responsible;
            activity.value = project.activity;
            start.value = project.start;
            end.value = project.end;
            progress.value = project.progress;
            Cost_budget.value = project.Cost_budget;
            financial_budget.value = project.financial_budget;
            spending.value = project.spending;


        } catch (error) {
            console.log("Error", error);
        }
    }
}

const validateData = (userData) => {
    let errors = []
    if (!userData.projectname) {
      errors.push("ชื่อโครงการ")
    }
    if (!userData.detail) {
      errors.push("รายละเอียด")
    }
    if (!userData.responsible) {
      errors.push("ผู้รับผิดชอบ")
    }
    if (!userData.activity) {
      errors.push("กิจกรรม")
    }
    if (!userData.start) {
      errors.push("เวลาเริ่ม")
    }
    if (!userData.end) {
      errors.push("เวลาจบ")
    }
    if (!userData.progress) {
      errors.push("ความคืบหน้า")
    }
    if (!userData.Cost_budget) {
      errors.push("งบประมาณต้นทุน")
    }
    if (!userData.financial_budget) {
      errors.push("งบประมาณการเงิน")
    }
    if (!userData.spending) {
      errors.push("รายงานการใช้จ่าย")
    }
    return errors
}

const submitData = async () => {
    let projectname = document.querySelector("input[name=projectname]");
    let detail =  document.querySelector("input[name=detail]");
    let responsible = document.querySelector("input[name=responsible]");
    let activity = document.querySelector("input[name=activity]");
    let start= document.querySelector("input[name=start]");
    let end  =  document.querySelector("input[name=end]");
    let progress= document.querySelector("input[name=progress]");
    let Cost_budget= document.querySelector("input[name=Cost_budget]");
    let financial_budget= document.querySelector("input[name=financial_budget]");
    let spending = document.querySelector("input[name=spending]");

    let messageDOM = document.getElementById('message');

    try {
        let userData = {
            projectname: projectname.value,
            detail: detail.value,
            responsible: responsible.value,
            activity: activity.value,
            start: start.value,
            end: end.value,
            progress: progress.value,
            Cost_budget: Cost_budget.value,
            financial_budget: financial_budget.value,
            spending: spending.value
        }
        console.log("submitData", userData)
        const errors = validateData(userData)
        if (errors.length > 0) {
            //มี error เกิดขึ้น
            throw {
                message: "กรอกข้อมูลไม่ครบถ้วน",
                errors: errors
            }
        }
       

        let message = "บันทึกข้อมูลเรียบร้อย";
        if (mode == "CREATE") {
            const response = await axios.post(`${BASE_URL}/users`, userData)
            console.log('response', response.data)
        } else {
            const response = await axios.put(`${BASE_URL}/users/${selectedId}`, userData)
            message = "แก้ไขข้อมูลเรียบร้อย";
            console.log('response', response.data)
        }
        messageDOM.innerText = message;
        messageDOM.className = "message success"
    } catch (error) {
        console.log('error message', error.message)
        console.log("error", error.errors)
        if (error.response) {
            console.log(error.response.data.message)
            error.message = error.response.data.message
            error.errors = error.response.data.errors
        }
        let htmlData = '<div>'
        htmlData += `<div>${error.message}</div>`
        htmlData += '<ul>'
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`
        }
        htmlData += '</ul>'
        htmlData += '</div>'
        messageDOM.innerHTML = htmlData
        messageDOM.className = "message danger"
    }
}
        
    
