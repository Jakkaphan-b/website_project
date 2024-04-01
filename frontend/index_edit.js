const BASE_URL = 'http://localhost:8000';

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (projectId) {
        // If projectId exists, it means we're editing an existing project
        document.getElementById('submit-button').style.display = 'none';
        document.getElementById('save-changes-button').style.display = 'block';

        await loadProjectData(projectId);
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
  
const loadProjectData = async (projectId) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${projectId}`);
        const project = response.data;

        document.getElementById('projectname').value = project.projectname;
        document.getElementById('detail').value = project.detail;
        document.getElementById('responsible').value = project.responsible;
        document.getElementById('activity').value = project.activity;
        document.getElementById('start').value = project.start;
        document.getElementById('end').value = project.end;
        document.getElementById('progress').value = project.progress;
        document.getElementById('Cost_budget').value = project.Cost_budget;
        document.getElementById('financial_budget').value = project.financial_budget;
        document.getElementById('spending').value = project.spending;
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('project-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const projectData = Object.fromEntries(formData.entries());

    try {
        await axios.post(`${BASE_URL}/users`, projectData);
        alert('Project added successfully!');
        window.location.href = 'index_edit.html'; // Redirect to index.html after adding project
    } catch (error) {
        alert('Failed to add project!');
    }
});

document.getElementById('save-changes-button').addEventListener('click', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    const formData = new FormData(document.getElementById('project-form'));
    const updatedProject = Object.fromEntries(formData.entries());

    try {
        await axios.put(`${BASE_URL}/users/${projectId}`, updatedProject);
        alert('Project updated successfully!');
        window.location.href = 'project.html'; // Redirect to project.html after updating project
    } catch (error) {
        console.log(error);
    }
});
