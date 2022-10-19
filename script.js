console.log('js');

$(document).ready(readyNow);
// once document is ready, load functionalities
function readyNow() {
    console.log('jQuery');

    //function to take inputs and add them to the table
    $('#submitEmployeeButton').on('click', addEmployee);
}


// master database of employees
const employees = [];
const totalSalaryStyle = {}; //object to store style adjustments to total salary figure

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
    totalSalaries += Number(newEmployee.salary) / 12;
    $('#totalMonthlySalaries').empty().append(totalSalaries);

    //update color of figure

    totalSalaryStyle.bgColor = totalSalaries > 20000 ? 'red' : 'white';
    totalSalaryStyle.textColor = totalSalaries > 20000 ? 'white' : 'black';

    $('.total').css('background-color', totalSalaryStyle.bgColor);
    $('.total').css('color', totalSalaryStyle.textColor);

    //add employee to the page
    addRow(newEmployee);
}

function addRow(employee) {
    console.log('in addRow')
    $('#employeeTable').append(`<tr id='employee${employee.id}' data-monthlySalary='${employee.salary / 12}'>
    <th>${employee.firstName}</th>
    <th>${employee.lastName}</th>
    <th>${employee.id}</th>
    <th>${employee.title}</th>
    <th>$${employee.salary}</th>
    <th><button class="deleteButton">Delete</button></th>
    </tr>`)

    //arm the button
    $('.deleteButton').on('click', deleteRow)

}

//function to delete given row when button is clicked. Doesn't work when in the readyNow

function deleteRow() {
    console.log('in deleteRow');
    $(this).parent().parent().hide();

    //update total salary figure
    totalSalaries -= $(this).parent().parent().data('monthlySalary');
    $('#totalMonthlySalaries').empty().append(totalSalaries);

    //update color of figure
    totalSalaryStyle.bgColor = totalSalaries > 20000 ? 'red' : 'white';
    totalSalaryStyle.textColor = totalSalaries > 20000 ? 'white' : 'black';

    $('.total').css('background-color', totalSalaryStyle.bgColor);
    $('.total').css('color', totalSalaryStyle.textColor);
}

function totalMonthlySalaries() {
    //sum up all salary values in employees array
    for (let employee of employees) {
        totalMonthlySalaries += Number(employee.salary);
    }

    //empty and then fill field with correct number
    $('#totalMonthlySalaries').empty().append(totalMonthlySalaries)



}



