var url = require('url');
var fs = require('fs');	
var jf = require('jsonfile');
//creating an array/repository of students.(existing)
var students=[];

//4.parsing an request body.
exports.parseRequestBody =function(req,callback){	
	var body='';
	req.on(
		//if event is readable in req then checking if body is a string or an object.
		'readable' ,function(){
			var rawBody=req.read();
			if (typeof rawBody == 'string') {
                    body += rawBody;
                } 
                else 
                	if (typeof rawBody == 'object' && rawBody instanceof Buffer) {
                    body += rawBody.toString('utf8');
                	}
			}
		);
	req.on(
		//if event on req is end i.e reading of req body is done then copy all data in studData by parsing it with JSON.parse.
		'end' ,function(){
			if(body){
				var studData=JSON.parse(body);
				callback(null,studData);
			}
		}
	);
};

//3.a method to add new students in repository 
exports.createStudent=function(newStud, callback){
	students.push(newStud);
	if(students.length != 0){
		callback(null,newStud);
	}
};

//implemetation of update functionality
exports.updateStudentByEmail = function (email, updateStudent, callback) {
	var flag=0;
    for (var i = 0; i < students.length; i++) {
        if (students[i].email == email){
        	flag=1;
       	    students[i] = updateStudent;
       	}
       	
    }
    if (flag!=1){
    	callback("Record not found",updateStudent);
    	return;
    }
    if (students.length != 0)
        callback(null, updateStudent);
};

//implenting read functionality
exports.getStudents=function(callback){
	callback(null,students);
};

//implementing delete with email id
exports.deleteStudentByEmail = function (email, callback) {
	var flag;
    for (var i = 0; i < students.length-1; i++) {
    	  if (students[i].email == email){
    	  	flag=1;
            students.splice(i, 1);
        }
    }
    if (flag!=1){
    	callback("Records not found",students);
    	return;
    }
    if (students.length >= 0)
        callback(null, students);
};

//function to write in respective sub.json
var insertInSub=function(){
	var sub1=[];
	var sub2=[],sub3=[];
	var file;
	var count1,count2,count3;
	//sub1.push("{subject name":"Maths");
	for (var i = 0; i <=students.length-1 ; i++) {
		var j=0;
		
		while(j<=students[i].enrolledSubjects.length-1){
		//checking which sub is enrolled by students
		switch (students[i].enrolledSubjects[j].subjectId) {
		    case "123":
		        count1=1;
		        var score=students[i].enrolledSubjects[j].Score;
		        var obj={id:students[i].id,score:score};
		        sub1.push(obj);
		        break;
		    case "124":
		    	count2=2;
		        var score=students[i].enrolledSubjects[j].Score;
		        var obj={id:students[i].id,score:score};
		        sub2.push(obj);
		        break;
		    case "125":
		       	count3=3;
		        var score=students[i].enrolledSubjects[j].Score;
		        var obj={id:students[i].id,score:score};
		        sub3.push(obj);
		        break;
		    }
			j++;
		}
	}

	if(count1==1){
		file='./Sub1.json';
		writeJson(sub1, file);
	}
	if(count2==2){
		file='./Sub2.json';
		writeJson(sub2, file);
	}
	if(count3==3){
		file='./Sub3.json';
		writeJson(sub3, file);
	}	
};

//function to write in each json respectively
exports.writToFile=function(){

	var file = './Student.json';
	var result = [];

	for (var i = 0; i <=students.length-1 ; i++) {
		var obj= {id:students[i].id,email:students[i].email};
		console.log(JSON.stringify(obj));
		result.push(obj);
	}
	writeJson(result,file);
	insertInSub();
}

//function to write in required json format with the help of jsonfile module.
var writeJson= function(result,file){

	jf.writeFile(file, result, function(err) {
	  		console.log("NOT error"+err);
	});
};
