

const BASE_URL = 'http://localhost:8000';

let mode = "CREATE"; // default mode
let selectedId = "";

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (id) {
        mode === "EDIT";
        selectedId = id;
        await loadProductData(id);
    }
  }
  const loadProductData = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/users/${id}`);
            const project = response.data;

            let projectnameDOM = document.querySelector("input[name=projectname]");
            let detailDOM =  document.querySelector("input[name=detail]");
            let responsibleDOM = document.querySelector("input[name=responsible]");
            let activityDOM = document.querySelector("input[name=activity]");
            let startDOM= document.querySelector("input[name=start]");
            let endDOM  =  document.querySelector("input[name=end]");
            let progressDOM= document.querySelector("input[name=progress]");
            let Cost_budgetDOM= document.querySelector("input[name=Cost_budget]");
            let financial_budgetDOM= document.querySelector("input[name=financial_budget]");
            let spendingDOM = document.querySelector("input[name=spending]");

            projectnameDOM.value = project.projectname;
            detailDOM.value = project.detail;
            responsibleDOM.value = project.responsible;
            activityDOM.value = project.activity;
            startDOM.value = project.start;
            endDOM.value = project.end;
            progressDOM.value = project.progress;
            Cost_budgetDOM.value = project.Cost_budget;
            financial_budgetDOM.value = project.financial_budget;
            spendingDOM.value = project.spending;
        


        } catch (error) {
            console.log("Error", error);
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
};

const submitData = async () => {
  let messageDOM = document.getElementById('message');
  try {
    let projectnameDOM = document.querySelector("input[name=projectname]");
    let detailDOM =  document.querySelector("input[name=detail]");
    let responsibleDOM = document.querySelector("input[name=responsible]");
    let activityDOM = document.querySelector("input[name=activity]");
    let startDOM= document.querySelector("input[name=start]");
    let endDOM  =  document.querySelector("input[name=end]");
    let progressDOM= document.querySelector("input[name=progress]");
    let Cost_budgetDOM= document.querySelector("input[name=Cost_budget]");
    let financial_budgetDOM= document.querySelector("input[name=financial_budget]");
    let spendingDOM = document.querySelector("input[name=spending]");
    

    
    let userData = {
      projectname: projectnameDOM.value,
      detail: detailDOM.value,
      responsible: responsibleDOM.value,
      activity: activityDOM.value,
      start: startDOM.value,
      end: endDOM.value,
      progress: progressDOM.value,
      Cost_budget: Cost_budgetDOM.value,
      financial_budget: financial_budgetDOM.value,
      spending: spendingDOM.value
    };

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
    if (mode === "CREATE") {
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
};