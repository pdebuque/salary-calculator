console.log('js');

const employees = [
    {
        firstName: 'Dwight',
        lastName: 'Shrute',
        id: '1234',
        title: 'Assistant (to the) Regional Manager',
        salary: 50000
    }
];

let totalSalaries=50000;

function addEmployee() {
console.log('in addEmployee')
    //take inputs and feed into new object
    const newEmployee = {
        firstName: $('#first_name').val(),
        lastName: $('#last_name').val(),
        id: $('#ID').val(),
        title: $('#title').val(),
        salary: $('#salary').val(),
    }

    //push employee into array
    employees.push(newEmployee)

    //empty input values
    $('#first_name').val('');
    $('#last_name').val('');
    $('#ID').val('');
    $('#title').val('');
    $('#salary').val('');

    totalSalaries+=Number(newEmployee.salary);
    $('#totalMonthlySalaries').empty().append(totalSalaries);

//add employee to the page
    addRow(newEmployee);
}

function addRow(employee) {
    console.log('in addRow')
    $('#employeeTable').append(`<tr>
    <th>${employee.firstName}</th>
    <th>${employee.lastName}</th>
    <th>${employee.id}</th>
    <th>${employee.title}</th>
    <th>$${employee.salary}</th>
    <th><button>Delete</button></th>
    </tr>`)
}


function totalMonthlySalaries() {
    //sum up all salary values in employees array
    for (let employee of employees) {
        totalMonthlySalaries += Number(employee.salary);
    }

    //empty and then fill field with correct number
    $('#totalMonthlySalaries').empty().append(totalMonthlySalaries)
}

$(document).ready(readyNow);

function readyNow() {
    console.log('jQuery');
    $('#submitEmployee').on('click', addEmployee);
}

