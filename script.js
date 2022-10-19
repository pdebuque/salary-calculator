console.log('js');

$(document).ready(readyNow);
// once document is ready, load functionalities
function readyNow() {
    console.log('jQuery');

    //function to take inputs and add them to the table
    $('#submitEmployeeButton').on('click', addEmployee);

    $('table button').on('click', deleteRow);
}


// master database of employees
const employees = [
    {
        firstName: 'Dwight',
        lastName: 'Shrute',
        id: '1234',
        title: 'Assistant (to the) Regional Manager',
        salary: 50000
    }
];

let totalSalaries = 0;

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

    //update total salary figure
    totalSalaries += Number(newEmployee.salary)/12;
    $('#totalMonthlySalaries').empty().append(totalSalaries);

    //update color of figure
    if (totalSalaries > 20000) {
        $('.total').css('background-color', 'red');
        $('.total').css('color', 'white');
    } else {
        $('.total').css('background-color', 'white');
        $('.total').css('color', 'black');
    }

    //add employee to the page
    addRow(newEmployee);
}

function addRow(employee) {
    console.log('in addRow')
    $('#employeeTable').append(`<tr id='employee${employee.id}'>
    <th>${employee.firstName}</th>
    <th>${employee.lastName}</th>
    <th>${employee.id}</th>
    <th>${employee.title}</th>
    <th>$${employee.salary}</th>
    <th><button class="deleteButton">Delete</button></th>
    </tr>`)
}

//function to delete given row when button is clicked. Doesn't work when in the readyNow

function deleteRow() {
    console.log('in deleteRow');
    $(this).parent().parent().hide();

    //update total salary figure


    //update color of figure
    if (totalSalaries > 20000) {
        $('.total').css('background-color', 'red');
        $('.total').css('color', 'white');
    } else {
        $('.total').css('background-color', 'white');
        $('.total').css('color', 'black');
    }
}

function totalMonthlySalaries() {
    //sum up all salary values in employees array
    for (let employee of employees) {
        totalMonthlySalaries += Number(employee.salary);
    }

    //empty and then fill field with correct number
    $('#totalMonthlySalaries').empty().append(totalMonthlySalaries)

    

}



