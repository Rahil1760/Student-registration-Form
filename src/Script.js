let firstName = document.querySelector(".firstName");
let lastName = document.querySelector(".lastName");
let contact = document.querySelector(".contact");
let email = document.querySelector(".email");
let submitButton = document.querySelector(".submit");
let form = document.querySelector(".formClass");
let tableBody = document.querySelector(".tableBody");
let allInput = document.getElementsByTagName("input");

  

// style section
const buttonStyle = ["flex", "text-center", "flex-col", "space-y-1"];
tableRowStyle = ["border", "border-white", "mt-10", "p-10"];
const resetButtonStyle = [
  "outline-none",
  "w-20",
  "m-auto",
  "rounded-xl",
  "bg-green-800",
  "font-bold",
];
const deleteButtonStyle = [
  "w-20",
  "m-auto",
  "rounded-xl",
  "bg-red-600",
  "font-bold",
  "outline-none",
];
const tableDataStyle = ["space-x-10", "p-3", "text-center"];
//

let students;

if (localStorage.getItem("My_Object" == null)) {
  students = [];
  
} else {
  students = JSON.parse(localStorage.getItem("My_Object"));
}

if (students == "") {
  document.querySelector(".tableDisplay").style.display="none"
}
submitButton.addEventListener("click", () => {
  if (
    firstName.value == "" ||
    lastName.value == "" ||
    contact.value == "" ||
    email.value == ""
  ) {
    alert("All The Fields Are Required");
  } else {
    let student = {
      Name: firstName.value,
      LastName: lastName.value,
      contactNo: contact.value,
      email: email.value,
    };

    students.push(student);

    saveToLocalStorage(students);

    updateTable(students);
    alert("Your form is submitted successfully");
  }
});
// function to save details into local storage
function saveToLocalStorage(students) {
  let stringified = JSON.stringify(students);
  localStorage.setItem("My_Object", stringified);
}

function updateTable(students) {
  tableBody.innerHTML = "";
  students.map((eachStudent, index) => {
    let tableRow = document.createElement("tr");
    tableRow.classList.add(...tableRowStyle);
    let studentName = document.createElement("td");
    studentName.innerHTML = eachStudent.Name;
    tableRow.appendChild(studentName);
    studentName.classList.add(...tableDataStyle);
    let studentLastName = document.createElement("td");
    studentLastName.innerHTML = eachStudent.LastName;
    tableRow.appendChild(studentLastName);
    studentLastName.classList.add(...tableDataStyle);

    let studentcontact = document.createElement("td");
    studentcontact.innerHTML = eachStudent.contactNo;
    tableRow.appendChild(studentcontact);
    studentcontact.classList.add(...tableDataStyle);

    let studentEmail = document.createElement("td");
    studentEmail.innerHTML = eachStudent.email;
    tableRow.appendChild(studentEmail);
    studentEmail.classList.add(...tableDataStyle);
    tableBody.appendChild(tableRow);

    let buttonSection = document.createElement("td");
    let resetButton = document.createElement("button");
    let deleteButton = document.createElement("button");
    buttonSection.append(resetButton);
    buttonSection.append(deleteButton);
    deleteButton.classList.add(...deleteButtonStyle);
    resetButton.classList.add(...resetButtonStyle);
    resetButton.textContent = "Reset";
    deleteButton.textContent = "Delete";

    tableRow.appendChild(buttonSection);
    tableBody.appendChild(tableRow);
    buttonSection.classList.add(...buttonStyle);

    document.querySelector(".tableDisplay").style.display="block"

    firstName.value = "";
    lastName.value = "";
    contact.value = "";
    email.value = "";
    // reset edit button function
    resetButton.addEventListener("click", () => {
      resetStudent(index, students);
    });

    deleteButton.addEventListener("click", () => {
      deleteStudent(index, students);
    });
  });
}


//reset student function
function resetStudent(index, students) {
  let resetValue = students[index];
  firstName.value = resetValue.Name;
  lastName.value = resetValue.LastName;
  contact.value = resetValue.contactNo;
  email.value = resetValue.email;
  students.splice(index, 1);
  saveToLocalStorage();
}


//delete student function
let deleteStudent = (index, students) => {
  students.splice(index, 1);
  saveToLocalStorage(students);
  updateTable(students);
  location.reload();
};

 updateTable(students);


