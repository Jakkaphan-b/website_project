const BASE_URL = 'http://localhost:8000';

window.onload = async () => {
    await loadData();
}

const loadData = async () => {
    console.log('loaded');
    try {
        const response = await axios.get(`${BASE_URL}/users`);
        console.log(response.data);

        const projectDOM = document.getElementById('user');

        if (projectDOM) {
            let htmlData = '<table>';
            htmlData += '<tr><th>ID</th><th>ProjectName</th><th>Detail</th><th>Responsible</th><th>Activity</th><th>Start</th><th>End</th><th>Progress(%)</th><th>Spending</th><th>Edit</th><th>Delete</th></tr>';

            let rowId = 1; // ตัวแปรนับแถว

            for (let i = 0; i < response.data.length; i++) {
                let project = response.data[i];
                htmlData += `<tr>
                    <td>${rowId}</td> <!-- เปลี่ยน student.id เป็น rowId -->
                    <td>${project.projectname}</td>
                    <td>${project.detail}</td>
                    <td>${project.responsible}</td>
                    <td>${project.activity}</td>
                    <td>${project.start}</td>
                    <td>${project.end}</td>
                    <td>${project.progress}</td>
                    <td>${project.spending}</td>
                    <td><a href='index.html?id=${project.id}' class='edit-button'>Edit</a></td>
                    <td><button class='delete-button' data-id='${project.id}'>Delete</button></td>
                    </tr>`;
                rowId++; // เพิ่มค่านับแถว
            }

            htmlData += '</table>';
            projectDOM.innerHTML = htmlData;

            const deleteDOMs = document.getElementsByClassName('delete-button');
            for (let i = 0; i < deleteDOMs.length; i++) {
                deleteDOMs[i].addEventListener('click', async (event) => {
                    const id = event.target.dataset.id;
                    try {
                        await axios.delete(`${BASE_URL}/users/${id}`);
                        loadData();
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
        } else {
            console.log('projectDOM is null or not found');
        }
    } catch (error) {
        console.log(error);
    }
}