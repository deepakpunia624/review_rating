// const events = require('events')
// const event = new events.EventEmitter()
// // event.on('click',()=>
//     console.log('first event created'))
//     event.emit('click');


// const first_event  = function(n1,n2){
//     console.log(n2*n1)
//     event.emit('click2')
// }
// const sec_event = function(){
//     console.log('second event trigger')
// }
// event.on('click2',sec_event)
// event.on('click',first_event)

// event.emit('click',3,4)


// function student(first_name,last_name){
//     this.first_name = first_name
//     this.last_name = last_name
// }
// student.prototype.display_full_name = function(){
//     return `${this.first_name}${this.last_name}`
// }
// const student1 = new student("arvi","k")
// const student2 = new student("deepak","punia")

// console.log(student1.display_full_name())


//........................................oops coding...........................................
// class user {
//     #password;
//     constructor(name,username,password){

//         this.name = name;
//         this.username = username;
//         this.#password = password;
//     }
//     login(username,password){
//         if(username === this.username && password === this.#password){
//             console.log ("login successfully");
//         }else{
//             console.log("loginfail");
//         }
//     }

//     setpassword(newpassword){
//         this.#password = newpassword;
//     }
// }
// const obj1 = new user("deepak","deepak","abc@123");
// const obj2 = new user("punia","punia1","abc@123");
// obj1.login("deepak","abc@123"); //loginsuccessfully
// obj2.login("punia","abc@123");

// console.log(obj1.name); //deepak
// console.log(obj1.password); //undefined

// obj1.setpassword("newpassword");
// obj1.login("deepak","abc@123"); //loginfail
// obj1.login("deepak","newpassword"); //login successfully

// //.......................abstraction oops coding.........................................

// for(row=1;row<=10;row++){
//     for(col=1;col<=row;col++){
//         console.log(col)
//     }; 
//     console.log(\n)
// }