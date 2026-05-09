function checkPassword() {
    let password = document.getElementById("password").value;
    let score = 0;
    let feedback = [];

    if (password.length >= 8) score++;
    else feedback.push("Minimum 8 characters required");

    if (/[A-Z]/.test(password)) score++;
    else feedback.push("Add uppercase letter");

    if (/[a-z]/.test(password)) score++;
    else feedback.push("Add lowercase letter");

    if (/[0-9]/.test(password)) score++;
    else feedback.push("Add numbers");

    if (/[^A-Za-z0-9]/.test(password)) score++;
    else feedback.push("Add special characters");

    let strength = document.getElementById("strength");
    strength.className = "";

    let result = "";

    if (score <= 2) {
        strength.classList.add("weak");
        result = "Weak ❌";
    } else if (score <= 4) {
        strength.classList.add("medium");
        result = "Medium ⚠️";
    } else {
        strength.classList.add("strong");
        result = "Strong ✅";
    }

    document.getElementById("result").innerText = result;

    let list = document.getElementById("feedback");
    list.innerHTML = "";
    feedback.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
    });
}

document.getElementById("password").addEventListener("input", checkPassword);

function generatePassword() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let pass = "";

    for (let i = 0; i < 12; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }

    document.getElementById("suggestion").innerText = pass;
}

// Send password to backend
function savePassword() {
    let password = document.getElementById("password").value;

    fetch("http://127.0.0.1:5000/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password: password })
    })
    .then(res => res.json())
    .then(data => alert(data.message));
}