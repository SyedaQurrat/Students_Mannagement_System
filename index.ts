#! /usr/bin/env node
import inquirer from "inquirer" ;
import chalk from "chalk" ;

console.log( "<<","=".repeat(15), "*".repeat(20) ,"=".repeat(15), ">>");
console.log(chalk.bold.italic.green("\t \t WELCOME TO STUDENT_MANAGEMENT"));
console.log( "<<","=".repeat(15), "*".repeat(20) ,"=".repeat(15), ">>");

// Define a student class
class Students {
    static counter :number= 10000 ;
    id : number ;
    name :  string ;
    cources : string[] ;
    balance : number ;

     constructor( name :string ){
        this.id  = Students.counter ++ ;
        this.name = name ;
        this.cources = [] ; // innitilize an empty array for courcess 
        this.balance = 20000 ;
        
    }
    // Method to enroll a student in a course
    enroll(course : string){
        this.cources.push(course) ;
    }
    //Method to view balance of students
    view_balance (){
        console.log(`ballance for ${this.name} : ${this.balance}`);
        
    }
    // Method to pay fees
    pay_fee(amount : number){
        this.balance -= amount ;
        console.log(`${this.name} has successfully paid ${amount} to the school fees`) ;
    }
    //Display students status

    show_status(){
        console.log(`ID : ${this.id}`);
        console.log(`Name : ${this.name}`);
        console.log(`Courses : ${this.cources}`);
        console.log(`Balance : ${this.balance}`);
        
    }
}
// define student mennagment

class student_management{
    students : Students[] = [] ;
    
    constructor(){
        this.students =[];
    }
    // Method to add a student
    add_student(name : string){
     let student =new Students(name);
     this.students.push(student);
     console.log(`${student.name} has been added to the student list : Student ID : ${student.id}`);
    }
    // Method to enroll a student in a course
    enroll_student(student_id:number, course: string){
      let find =  this.find_student(student_id);

      if(find){
        find.enroll(course);
        console.log(`${find.name} has been enrolled in ${course}`);
      }
    }
    // Method to view a student balance
    view_balance(student_id:number){
        let find =  this.find_student(student_id);
        if(find){
            find.view_balance();
        }
        else{
            console.log("Student not found");
        }
    }
    // Method to pay students fees
    pay_student_fee(student_id:number , amount: number){
        let find =  this.find_student(student_id);
        if(find){
            find.pay_fee(amount);
        }
        else{
            console.log("Student not found");
        }

    }
    // Method to view students status

    view_student_status(student_id:number){

        let find =  this.find_student(student_id);
        if(find){
            find.show_status();
        }
        else{
            console.log("Student not found");
        }
    }
    //METHOD TO FIND A STUDENT BY STUDENT ID
    find_student(student_id:number){

        return this.students.find(std => std.id === student_id);
    }
}

// Create a main function to run the program
async function main (){
   
    let student_management_system = new student_management();
    while(true){
        let choice = await inquirer.prompt([
            {
                name: "Choice",
                type: "list",
                message:"select an Option",
                choices:["Add Student",
                "Enroll Student",
                "View Balance",
                "Pay Fees",
                "View Student Status",
                "Exit"]
                
            }
        ]);
        //using switch cvase to handle user choice
        switch(choice.Choice){

            case "Add Student":
            let name_input = await inquirer.prompt([

                {
                    name: "Name",
                    type: "input",
                    message:"Enter Student Name"
                }
            ]);
            student_management_system.add_student(name_input.Name);
            break;
            case "Enroll Student":
                let enroll_input = await inquirer.prompt([
                    {
                        name: "Student_id",
                        type: "number",
                        message:"Enter Student ID"
                    },
                    {
                        name: "Course",
                        type: "input",
                        message:"Enter Course Name"
                    }
                ]);
                student_management_system.enroll_student(enroll_input.Student_id, enroll_input.Course);
                break;
            case "View Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "Student_id",
                        type: "number",
                        message:"Enter Student ID"
                    }
                ]);
                student_management_system.view_balance(balance_input.Student_id);
                break;
            case "Pay Fees":
                let pay_input = await inquirer.prompt([
                    {
                        name: "Student_id",
                        type: "number",
                        message:"Enter Student ID"
                    },
                    {
                        name: "Amount",
                        type: "number",
                        message:"Enter Amount"
                    }
                ]);
                student_management_system.pay_student_fee(pay_input.Student_id, pay_input.Amount);
                break;
            case "View Student Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "Student_id",
                        type: "input",
                        message:"Enter Student ID"
                    }
                ]);
                student_management_system.view_student_status(status_input.Student_id);
                break;
            case "Exit":
                console.log ("Exiting...");
                process.exit ()
           
        }
    }
    
}
//calling main function
main ();



