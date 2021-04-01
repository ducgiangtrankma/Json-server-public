const faker = require('faker');
const fs = require('fs');
faker.locale = "vi";
const randomClassList = (n)=>{
    const classList = [];
    if(n <= 0) return [];
    //Loop
    Array.from(new Array(n)).forEach(()=>{
        const _class = {
            id:faker.random.uuid(),
            totalStudent:faker.random.number(40),
            supervising_Teacher:`${faker.name.lastName()} ${faker.name.firstName()}`,
            avatar_Teacher:faker.image.avatar(400,400)
        }
        classList.push(_class)
    })
    return classList;
}
const randomStudentList = (classList, studentOfClass)=>{
    const studentList = [];
    if(studentOfClass <= 0) return [];
    for(const e of classList){
        Array.from(new Array(studentOfClass)).forEach(()=>{
            const student = {
            class_id:e.id,
            id:faker.random.uuid(),
            name:`${faker.name.lastName()} ${faker.name.firstName()}`,
            sex:faker.name.gender(),
            medium_score:Number.parseFloat(faker.random.number(10)),
            avatar:faker.image.avatar(400,400)
            };
            studentList.push(student)
        })
    }
    return studentList;
}
(()=>{
    const classList = randomClassList(20)
    const studentList = randomStudentList(classList,1)

    const db = {
        class: classList,
        students:studentList
    };
    //write db obj to db.json
    fs.writeFile('./db.json',JSON.stringify(db),()=>{
        console.log('Write successfully')
    });
})()