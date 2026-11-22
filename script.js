
const form = document.getElementById("marksForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const roll = document.getElementById("rollNumber").value.trim();

    const subjects = [
        ["Mathematics", "subject1"],
        ["Physics", "subject2"],
        ["Chemistry", "subject3"],
        ["English", "subject4"],
        ["Computer", "subject5"]
    ];

    let marks = [];

    for (let subject of subjects) {
        let value = document.getElementById(subject[1]).value;

        if (value === "" || Number(value) < 0 || Number(value) > 100) {
            alert("Please enter valid marks between 0 and 100 for all subjects.");
            return;
        }

        marks.push(Number(value));
    }

    if (!name || !roll) {
        alert("Please enter student details.");
        return;
    }

    let total = marks.reduce((a, b) => a + b, 0);
    let percentage = total / 5;
    let average = total / 5;

    let passed = marks.every(mark => mark >= 35);

    let grade;

    if (!passed) {
        grade = "F";
    } else if (percentage >= 90) {
        grade = "A+";
    } else if (percentage >= 80) {
        grade = "A";
    } else if (percentage >= 70) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else if (percentage >= 50) {
        grade = "D";
    } else {
        grade = "E";
    }

    document.getElementById("displayName").textContent = name;
    document.getElementById("displayRoll").textContent = roll;
    document.getElementById("totalMarks").textContent = total + "/500";
    document.getElementById("percentage").textContent = percentage.toFixed(2) + "%";
    document.getElementById("average").textContent = average.toFixed(2);
    document.getElementById("grade").textContent = grade;

    let status = document.getElementById("status");

    status.textContent = passed ? "Congratulations! You have PASSED." : "Sorry! You have FAILED.";
    status.className = passed ? "final-status" : "final-status fail";

    let details = document.getElementById("subjectDetails");
    details.innerHTML = "";

    subjects.forEach((subject, index) => {
        let row = document.createElement("div");
        row.className = "subject-row";
        row.innerHTML = `<span>${subject[0]}</span><span>${marks[index]}/100</span>`;
        details.appendChild(row);
    });

    document.querySelector(".empty-message").hidden = true;
    document.getElementById("resultDetails").hidden = false;

    document.getElementById("result").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

form.addEventListener("reset", function() {
    document.getElementById("resultDetails").hidden = true;
    document.querySelector(".empty-message").hidden = false;
});

document.getElementById("printBtn").addEventListener("click", function() {
    window.print();
});
