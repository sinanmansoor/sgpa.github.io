let subjects = [];

function calculateSGPA() {
    const allSubjects = document.querySelectorAll('.subject');
    let totalPoints = 0;
    let totalCredits = 0;

    allSubjects.forEach(subject => {
        const markInput = subject.querySelector('.mark-input');
        const creditInput = subject.querySelector('.credit-input');
        const mark = parseFloat(markInput.value);
        const credit = parseFloat(creditInput.value);

        if(isNaN(mark) || isNaN(credit) || mark < 0 || credit <= 0) {
            alert("Please enter valid numbers");
            return;
        }

        let gradePoint = 0;
        if(mark >= 90) gradePoint = 10;
        else if(mark >= 80) gradePoint = 9;
        else if(mark >= 70) gradePoint = 8;
        else if(mark >= 60) gradePoint = 7;
        else if(mark >= 50) gradePoint = 6;
        else if(mark >= 45) gradePoint = 5;
        else if(mark >= 40) gradePoint = 4;

        totalPoints += gradePoint * credit;
        totalCredits += credit;
    });

    if(totalCredits === 0) {
        alert("Please enter valid credits");
        return;
    }

    const sgpa = totalPoints / totalCredits;
    document.getElementById('result').innerHTML = 
        `Your SGPA is: <strong>${sgpa.toFixed(3)}</strong>`;
}

document.getElementById('add-subject').addEventListener('click', () => {
    const newSubject = document.createElement('div');
    newSubject.className = 'subject';
    newSubject.innerHTML = `
        <input type="number" class="mark-input">
        <input type="number" class="credit-input">
    `;
    document.getElementById('subject-container').appendChild(newSubject);
});

// Process initial subject on page load
document.addEventListener('DOMContentLoaded', () => {
    const initialSubject = document.querySelector('.subject');
    if(initialSubject) {
        subjects.push(initialSubject);
    }
});