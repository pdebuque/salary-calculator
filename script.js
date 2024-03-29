console.log('js');

$(document).ready(readyNow);
// once document is ready, load functionalities
function readyNow() {
    console.log('jQuery');

    //function to take inputs and add them to the table
    $('#submitEmployeeButton').on('click', addEmployee);
    $('#make-office-employee').on('click', addOffice); // makes testing easier
    $('.text-input').on('keyup', validateText); //trying out data validation
}


// master list of employees
const employees = [];
let totalSalaries = 0;

const sampleEmployees = [
    {
        firstName: 'Michael',
        lastName: 'Scott',
        id: 1001,
        title: 'Regional Manager',
        salary: 90000,
    },
    {
        firstName: 'Dwight',
        lastName: 'Shrute',
        id: 1002,
        title: 'Assistant (to the) Regional Manager',
        salary: 80000,
    },
    {
        firstName: 'Jim',
        lastName: 'Halpert',
        id: 1003,
        title: 'Salesman',
        salary: 70000,
    },
    {
        firstName: 'Pam',
        lastName: 'Beesly',
        id: 1004,
        title: 'Receptionist',
        salary: 45000,
    },
    {
        firstName: 'Phyllis',
        lastName: 'Vance',
        id: 1005,
        title: 'Salesman',
        salary: 70000,
    },
    {
        firstName: 'Stanley',
        lastName: 'Hudson',
        id: 1006,
        title: 'Salesman',
        salary: 70000,
    },


]
let officeEmpInd = 0; //index for use in addOffice()

function addEmployee() {
    console.log('in addEmployee');
    // data validation: if values are empty or invalid, throw an error message

    // none of below works bc collections of jquery objects don't like vanilla loops (i think)

    // const inputValidation = $('.validation');
    // console.log(inputValidation);
    // for (let input of inputValidation) { // none of the jquery methods work in this iterator. very frustrating...
    //     const inputClasses = input.classList;
    //     console.log(typeof input.classList);
    //     const correspondingInput = input.previousSibling;
    //     const correspondingValue = correspondingInput.value;
    //     console.log(inputClasses);

    //     if (inputClasses.includes('validate-false') || !correspondingValue) {

    //         // if (input.hasClass('validation-false') || !input.val());
    //         console.log('validation failed');
    //     }
    // }






    //take inputs and feed into new object
    const newEmployee = {
        firstName: $('#first_name').val(),
        lastName: $('#last_name').val(),
        id: $('#ID').val(),
        title: $('#title').val(),
        salary: $('#salary').val(),
    }

    for (let key in newEmployee) { // data validation: check if any are empty
        if (!newEmployee[key]) {
            console.log(`${key} empty`);
            $('#error').removeClass('hidden')
            $('#error').removeClass('submit-error');
            $('#error').addClass('submit-error'); // because the class is an animation in and out, need to remove before re-adding
            $('#error').html(`Please enter a value for ${key}`);
            return false;
        }
    }

    // data validation: check each text field for validation
    const dataValInputs = [$('#first-name-validation'), $('#last-name-validation'), $('#title-validation')];

    for (let input of dataValInputs) {
        if (input.hasClass('validate-false')) {
            $('#error').removeClass('hidden');
            $('#error').removeClass('submit-error');
            $('#error').addClass('submit-error');
            $('#error').html(`Please check text inputs`);
            return false;
        }
    }
    $('#error').removeClass('submit-error');
    $('#error').addClass('hidden'); // if we get through data validation, hide the error message


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

function addOffice() {
    if (officeEmpInd >= sampleEmployees.length) { // bugs happen if you keep adding employees past the number in the sample array
        window.alert('No more Office employees! Refresh page to get them back')
    } else {

        console.log('in addOffice');
        const newOfficeEmployee = sampleEmployees[officeEmpInd]
        //
        employees.push(newOfficeEmployee);
        officeEmpInd++;

        //update total salary figure
        totalSalaries += Number(newOfficeEmployee.salary) / 12;
        totalSalaries = Math.abs(totalSalaries); // corner case where when deleting employees, total monthly goes to -0.00
        render();
    }
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
//change monthly salary output to have fewer decimals. ✅
//total currently breaks after deleting rows - i suspect it has to do with the second 'this' in function deleteRow. ✅


function render() {

    totalSalaries = Math.abs(totalSalaries); // corner case bug: sometimes, deleting all employees results in total salary = -0.00
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
        <th>${employee.firstName}</th>
        <th>${employee.lastName}</th>
        <th>${employee.id}</th>
        <th>${employee.title}</th>
        <th>$${employee.salary}</th>
        <th><button class="deleteButton">Delete</button></th>
    </tr>`)
    };

    //arm the button - is there a way to do this in the onReady function?
    $('.deleteButton').on('click', deleteRow)
}

function validateText() {
    // take value of the input; compare it with parameters;
    const text = $(this).val();
    const reminderText = $(this).next();
    console.log(text);
    // validation paramter: can only be letters

    if (/^[a-zA-Z]+$/.test(text) || !text) {
        reminderText.removeClass('validate-false');
        reminderText.addClass('hidden-2');
    } else {
        reminderText.removeClass('hidden');
        reminderText.removeClass('hidden-2');
        reminderText.addClass('validate-false');
    }

    // if it doesn't pass test, remove hidden class;
    // if it passes test add hidden class

    // 


}



// to-do:

// accessibility fixees: make page (especially inputs) adhere to accessibility best practices
// warnings: make something actually publish to the dom rather than rely on window.alert
// input data validation
