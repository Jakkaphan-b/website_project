// index.js

const BASE_URL = 'http://localhost:8000';

document.getElementById('add-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newProject = Object.fromEntries(formData.entries());

    try {
        await axios.post(`${BASE_URL}/users`, newProject);
        alert('Project added successfully!');
        await loadData(); // Reload data after adding project
    } catch (error) {
        alert('Failed to add project!');
    }
});

window.onload = async () => {
    await loadData();
}

const loadData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/users`);
        displayProjects(response.data);
    } catch (error) {
        console.log(error);
    }
}

const displayProjects = (projects) => {
    const projectTable = document.getElementById('project-table');
    projectTable.innerHTML = ''; // Clear existing table data

    projects.forEach((project, index) => {
        const row = projectTable.insertRow();
        const idCell = row.insertCell(0);
        const projectNameCell = row.insertCell(1);
        const detailCell = row.insertCell(2);
        const responsibleCell = row.insertCell(3);
        const activityCell = row.insertCell(4);
        const startCell = row.insertCell(5);
        const endCell = row.insertCell(6);
        const progressCell = row.insertCell(7);
        const spendingCell = row.insertCell(8);

        idCell.textContent = index + 1;
        projectNameCell.textContent = project.projectname;
        detailCell.textContent = project.detail;
        responsibleCell.textContent = project.responsible;
        activityCell.textContent = project.activity;
        startCell.textContent = project.start;
        endCell.textContent = project.end;
        progressCell.textContent = project.progress;
        spendingCell.textContent = project.spending;
    });
}
