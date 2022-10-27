console.log('js');

$(document).ready(readyNow);
// once document is ready, load functionalities
function readyNow() {
    console.log('jQuery');

    //function to take inputs and add them to the table
    $('#submitEmployeeButton').on('click', addEmployee);
}


// master list of employees
const employees = [];
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
    employees.push(newEmployee);
    console.log(`employees array:`, employees);

    //empty input values
    $('#first_name').val('');
    $('#last_name').val('');
    $('#ID').val('');
    $('#title').val('');
    $('#salary').val('');

    //update total salary figure
    totalSalaries += Number(newEmployee.salary) / 12;

    //render
    render();
}

// function addRow(employee) {
//     console.log('in addRow')
//     // $('#employeeTableBody').append(`< tr id = 'employee-${employee.id}' class= 'employee' data - id='${employee.id}' data - monthlySalary='${employee.salary / 12}' >
//     // <th>${employee.firstName}</th>
//     // <th>${employee.lastName}</th>
//     // <th>${employee.id}</th>
//     // <th>${employee.title}</th>
//     // <th>$${employee.salary}</th>
//     // <th><button class="deleteButton">Delete</button></th>
//     // </tr>`)
// }

//function to delete given row when button is clicked. Doesn't work when in the readyNow

function deleteRow() {
    console.log('in deleteRow');
    // loop over employees object, find the employee to be deleted
    let infoToDelete = $(this).parent().parent().data(); // this selects the exact id associated with the pressed button
    console.log('info to Delete:', infoToDelete);// array of ids

    for (let employee of employees) { // for each element in the array of ids,
        if (Number(employee.id) === Number(infoToDelete.id)) {
            employees.splice(employees.indexOf(employee), 1);
            totalSalaries -= Number(infoToDelete.monthlysalary)
        }
    }

    // console.log($(this).parent().parent());
    // const employeeData = $(this).parent().parent().data();

    // $(this).parent().parent().remove(); //use .hide() or .remove()? probably depends on the future functionality of this app?

    //render
    render();
}

// function totalMonthlySalaries() {
//     //sum up all salary values in employees array
//     for (let employee of employees) {
//         totalMonthlySalaries += Number(employee.salary);
//     }

//     //empty and then fill field with correct number
//     $('#totalMonthlySalaries').empty().append(totalMonthlySalaries)

// }

//to-do
//change monthly salary output to have fewer decimals
//total currently breaks after deleting rows - i suspect it has to do with the second 'this' in function deleteRow


function render() {

    //update salaries figure
    $('#totalMonthlySalaries').html(totalSalaries.toFixed(2));

    //update conditional styling
    if (totalSalaries > 20000) {
        $('.total').addClass('over-budget')
    } else {
        $('.total').removeClass('over-budget')
    };

    //clear current table values
    $('#employeeTableBody').html('');

    //add employees to dom
    for (let employee of employees) {
        console.log(employee);

        $('#employeeTableBody').append(`<tr id = 'employee-${employee.id}' class='employee' data-id='${employee.id}' data-monthlySalary='${employee.salary / 12}'>
    // <th>${employee.firstName}</th>
    // <th>${employee.lastName}</th>
    // <th>${employee.id}</th>
    // <th>${employee.title}</th>
    // <th>$${employee.salary}</th>
    // <th><button class="deleteButton">Delete</button></th>
    // </tr>`)
    };

    //arm the button - is there a way to do this in the onReady function?
    $('.deleteButton').on('click', deleteRow)
}