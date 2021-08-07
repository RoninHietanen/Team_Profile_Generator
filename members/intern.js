const Employee = require("./employee");

class Intern extends Employee {
    constructor (name, id, email, github) {
        super (name, id, email, github);
    }
    getRole() {
        return "Intern";
    }
}

module.exports = Intern;