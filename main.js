class Student {
    #grade1;
    #grade2;
    #grade3;
    #attendance;

    constructor(name, grade1, grade2, grade3, attendance) {
        this.name = name;
        this.grade1 = grade1;
        this.grade2 = grade2;
        this.grade3 = grade3;
        this.attendance = attendance;
    }

    set grade1(value) {
        if (value === "" || value < 0 || value > 100) {
            throw new Error("Grade 1 must be between 0 and 100");
        }
        this.#grade1 = Number(value);
    }

    set grade2(value) {
        if (value === "" || value < 0 || value > 100) {
            throw new Error("Grade 2 must be between 0 and 100");
        }
        this.#grade2 = Number(value);
    }

    set grade3(value) {
        if (value === "" || value < 0 || value > 100) {
            throw new Error("Grade 3 must be between 0 and 100");
        }
        this.#grade3 = Number(value);
    }

    set attendance(value) {
        if (value === "" || value < 0 || value > 100) {
            throw new Error("Attendance must be between 0 and 100");
        }
        this.#attendance = Number(value);
    }

    get grade1() {
        return this.#grade1;
    }

    get grade2() {
        return this.#grade2;
    }

    get grade3() {
        return this.#grade3;
    }

    get attendance() {
        return this.#attendance;
    }

    getAverage() {
        return (this.#grade1 + this.#grade2 + this.#grade3) / 3;
    }
}

// Students Array
const studentsList = [];

// Get HTML Elements
const studentNameInput = document.getElementById("studentName");

const grade1Input = document.getElementById("grade1");
const grade2Input = document.getElementById("grade2");
const grade3Input = document.getElementById("grade3");

const attendanceInput = document.getElementById("attendance");

const addStudentButton = document.getElementById("addStudent");
const mercyButton = document.getElementById("mercyButton");

const errorMessage = document.getElementById("errorMessage");
const studentsDisplay = document.getElementById("studentsDisplay");
const reportDisplay = document.getElementById("reportDisplay");
addStudentButton.addEventListener("click", function () {

    try {
        const name = studentNameInput.value.trim();

        if (name === "") {
            throw new Error("Please enter student name");
        }

        const student = new Student(
            name,
            grade1Input.value,
            grade2Input.value,
            grade3Input.value,
            attendanceInput.value
        );

        studentsList.push(student);

        const studentItem = document.createElement("p");
        studentItem.textContent = student.name;

        studentsDisplay.appendChild(studentItem);

        errorMessage.textContent = "";

        studentNameInput.value = "";
        grade1Input.value = "";
        grade2Input.value = "";
        grade3Input.value = "";
        attendanceInput.value = "";

    } catch (error) {

        errorMessage.textContent = error.message;

    }

});
mercyButton.addEventListener("click", function () {

    // Filter
    const weakStudents = studentsList.filter(function (student) {
        const average = student.getAverage();
        return average >= 40 && average <= 49;
    });

    // Map
    const studentsAfterMercy = weakStudents.map(function (student) {
        return {
            name: student.name,
            newAverage: student.getAverage() + 5
        };
    });

    // Reduce
    let generalAverage = 0;

    if (studentsAfterMercy.length > 0) {

        const total = studentsAfterMercy.reduce(function (sum, student) {
            return sum + student.newAverage;
        }, 0);

        generalAverage = total / studentsAfterMercy.length;
    }

    // Display Report
    if (studentsAfterMercy.length === 0) {

        reportDisplay.innerHTML = `
            <p>No students need mercy committee.</p>
        `;

    } else {

        reportDisplay.innerHTML = `
            <h4>Mercy Committee Report</h4>
            <p>Number of students: ${studentsAfterMercy.length}</p>

            <h5>Students Names:</h5>

            <ul>
                ${studentsAfterMercy.map(student =>
                    `<li>${student.name} - New Average: ${student.newAverage.toFixed(2)}</li>`
                ).join("")}
            </ul>

            <p>
                General Average After Mercy:
                ${generalAverage.toFixed(2)}
            </p>
        `;
    }

});