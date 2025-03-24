export default async function decorate(block) {
  const itemsPerPage = 5; // Number of employees to display per page
  let currentPage = 1;

  const p = document.createElement('p');
  p.textContent = 'Employee block';
  block.append(p);

  async function fetchEmployeeData(offset, limit) {
    const response = await fetch(
      `/employee.json?offset=${offset}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch employee data');
    }

    return await response.json();
  }

  async function renderPage(page) {
    const offset = (page - 1) * itemsPerPage;
    const employeeJson = await fetchEmployeeData(offset, itemsPerPage);
    const employees = employeeJson.salary;

    let listHtml = '<ul>';
    employees.data.forEach((employee) => {
      listHtml += `<li> Employee ID : ${employee.ID} </br>
      Employee Name : ${employee.Name} </br>  
      Employee Salary : ${employee.Salary} </br>
      Employee Age : ${employee.Age} </br>
      Employee Email : ${employee.Email} </br>
      Employee Status : ${employee['Is Active']} </br>
      Employee Joining Date : ${employee['Joining Date']} </br>
      </li>`;
    });
    listHtml += '</ul>';

    block.innerHTML = ''; // Clear previous content
    block.append(p);
    block.insertAdjacentHTML('beforeend', listHtml);
    renderPaginationControls(page, employees.total);
  }

  function renderPaginationControls(page, totalEmployees) {
    const totalPages = Math.ceil(totalEmployees / itemsPerPage);
    let paginationHtml = '<div class="pagination">';

    if (page > 1) {
      paginationHtml += `<button class="prev">Previous</button>`;
    }

    paginationHtml += `<span> Page ${page} of ${totalPages} </span>`;

    if (page < totalPages) {
      paginationHtml += `<button class="next">Next</button>`;
    }

    paginationHtml += '</div>';
    block.insertAdjacentHTML('beforeend', paginationHtml);

    document.querySelector('.prev')?.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
      }
    });

    document.querySelector('.next')?.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
      }
    });
  }

  renderPage(currentPage);
}
