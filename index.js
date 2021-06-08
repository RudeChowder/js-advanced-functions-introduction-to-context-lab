const createEmployeeRecord = (attributes) => {
    let employee = {
        firstName: attributes[0],
        familyName: attributes[1],
        title: attributes[2],
        payPerHour: attributes[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

const createEmployeeRecords = (employeesData) => {
    return employeesData.map(employee => createEmployeeRecord(employee))
}

const createTimeInEvent = (employee, dateTime) => {
    const timeIn = {
        type: "TimeIn",
        date: dateTime.slice(0,10),
        hour: parseInt(dateTime.slice(-4))
    }
    employee.timeInEvents.push(timeIn)
    return employee
}

const createTimeOutEvent = (employee, dateTime) => {
    const timeOut = {
        type: "TimeOut",
        date: dateTime.slice(0,10),
        hour: parseInt(dateTime.slice(-4))
    }
    employee.timeOutEvents.push(timeOut)
    return employee
}

const hoursWorkedOnDate = (employee, date) => {
    const matchingTimeIn = employee.timeInEvents.find(timeIn => timeIn.date === date)
    const matchingTimeOut = employee.timeOutEvents.find(timeOut => timeOut.date === date)
    return (matchingTimeOut.hour - matchingTimeIn.hour)/100
}

const wagesEarnedOnDate = (employee, date) => {
    return employee.payPerHour * hoursWorkedOnDate(employee, date)
}

const allWagesFor = (employee) => {
    const dates = employee.timeInEvents.map(event => event.date)
    return dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0)
}

const calculatePayroll = (employeeArray) => {
    return employeeArray.reduce((total, employee) => total + allWagesFor(employee), 0)
}

const findEmployeeByFirstName = (employeeArray, name) => {
    return employeeArray.find(employee => employee.firstName === name)
}