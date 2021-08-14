const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./members/engineer");
const Intern = require("./members/intern");
const Manager = require("./members/manager");
const employees = [];

function init() {
    initHtml();
    addMember();
}

function addMember() {
    inquirer.prompt([{
        type: "input",
        message: "Enter team member's name.",
        name: "name"
    },
    {
        type: "list",
        message: "Select team member's role.",
        choices: [
            "Manager",
            "Engineer",
            "Intern"
        ],
        name: "role"
    },
    {
        type: "input",
        message: "Enter team member's id.",
        name: "id"
    },
    {
        type: "input",
        message: "Enter team member's email address.",
        name: "email"
    },
    {
        type: "input",
        message: `Enter team member's Github.`,
        name: "github"
    }])
    .then(function({name, role, id, email, github}) {
        inquirer.prompt([
        {
            type: "list",
            message: "Would you like to add more team members?",
            choices: [
                "yes",
                "no"
            ],
            name: "moreMembers"
        }])
        .then(function({moreMembers}) {
            let newMember;
            if (role === "Engineer") {
                newMember = new Engineer(name, role, id, email, github);
            } else if (role === "Intern") {
                newMember = new Intern(name, role, id, email, github);
            } else if (role === "Manager") {
                newMember = new Manager(name, role, id, email, github);
            }
            employees.push(newMember);
            addHtml(newMember)
            .then(function() {
                if (moreMembers === "yes") {
                    addMember();
                } else {
                    finishHtml();
                }
            });
            
        });
    });
}

function initHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
        <title>Team Profile</title>
    </head>
    
    <body>
        <header class="title is-1 p-5 has-text-centered has-background-primary-light">
            <h1>Team Profile</h1>         
        </header>
        <div class="container mt-6">
            <div class="columns is-three-quarters-tablet is-two-thirds-desktop">`;
    fs.writeFile("./htmlfolder/Team_Profile.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("start");
}

function addHtml(member) {
    return new Promise(function(resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        const gitHub = member.getGithub();
        let data = "";
        if (role === "Manager") {
            data = `<div class="column">
            <div class="card">
                <header class="card-header has-background-info-light">
                    <h3 class="title">${name}<br /><br />Manager</h3>
                </header>
                <div class="content has-background-white-ter">
                    <p><strong>ID:</strong> ${id}</p>
                    <p><strong>Email Address: </strong><a href="mailto:${email}">${email}</a></p>
                    <p><strong>GitHub: </strong><a href="${gitHub}">${gitHub}</a></p>
                </div>
            </div>
        </div>`
        } else if (role === "Engineer") {
            data = `<div class="column">
            <div class="card">
                <header class="card-header has-background-primary-light">
                    <h3 class="title">${name}<br /><br />Engineer</h3>
                </header>
                <div class="content has-background-white-ter">
                    <p><strong>ID:</strong> ${id}</p>
                    <p><strong>Email Address: </strong><a href="mailto:${email}">${email}</a></p>
                    <p><strong>GitHub: </strong><a href="${gitHub}">${gitHub}</a></p>
                </div>
            </div>
        </div>`;
        } else if (role === "Intern") {
            data = `<div class="column">
            <div class="card">
                <header class="card-header has-background-success-light">
                    <h3 class="title">${name}<br /><br />Intern</h3>
                </header>
                <div class="content has-background-white-ter">
                    <p><strong>ID:</strong> ${id}</p>
                    <p><strong>Email Address: </strong><a href="mailto:${email}">${email}</a></p>
                    <p><strong>GitHub: </strong><a href="${gitHub}">${gitHub}</a></p>
                </div>
            </div>`;
        }
        console.log("adding team member");
        fs.appendFile("./htmlfolder/Team_Profile.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });  
}

function finishHtml() {
    const html = `</div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./htmlfolder/Team_Profile.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("You're Done!");
}

init();