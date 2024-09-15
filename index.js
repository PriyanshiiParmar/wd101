const userForm = document.getElementById("user-form");

const retrieveEntries = () => {
    let entries = localStorage.getItem("userEntries");
    if (entries) {
        entries = JSON.parse(entries); 
    } else {
        entries = []; 
    }
    return entries;
};

const displayEntries = () => {
    let entries = retrieveEntries();
    let tableRows = entries.map(entry => {
        let nameCell = `<td style = "border:1px solid black; padding:10px" class="table-cell">${entry.name}</td>`;
        let emailCell = `<td style = "border:1px solid black" class="table-cell">${entry.email}</td>`;
        let pwdCell = `<td style = "border:1px solid black" class="table-cell">${entry.password}</td>`;
        let dobCell = `<td style = "border:1px solid black" class="table-cell">${entry.dob}</td>`;
        let acceptCell = `<td style = "border:1px solid black" class="table-cell">${entry.accept ? 'true' : 'false'}</td>`;

        return `<tr>${nameCell}${emailCell}${pwdCell}${dobCell}${acceptCell}</tr>`;
    }).join("\n");

    const tableHeader = `<tr class="table-header">
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>Dob</th>
        <th>Accepted terms?</th>
    </tr>`;

    const table = `<thead>${tableHeader}</thead><tbody>${tableRows}</tbody>`;
    let details = document.getElementById("user-entry");
    details.innerHTML = table;
};

const validateDOB = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18 && age <= 55;
};

const saveForm = (event) => {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let accept = document.getElementById("accept").checked;

    if (!validateDOB(dob)) {
        alert("Date of Birth must be between 18 and 55 years old.");
        return;
    }

    const entry = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        accept: accept
    };

    let userEntries = retrieveEntries();
    userEntries.push(entry);
    localStorage.setItem("userEntries", JSON.stringify(userEntries));
    displayEntries();
};

userForm.addEventListener("submit", saveForm);

displayEntries();
