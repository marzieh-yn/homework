var fs = require('fs');

var TASK_JSON_PATH = "./db.json";

var command = process.argv[2];
var argument = process.argv[3];

function init(){
	if(!fs.existsSync(TASK_JSON_PATH)){
		console.log("Creating `db.json` file");
		setData([]);	
	}
	
}

function getData(){
	var contents = fs.readFileSync(TASK_JSON_PATH);
	var data = JSON.parse(contents);
	return data;
}


function setData(data){
	var dataString = JSON.stringify(data);
	fs.writeFileSync(TASK_JSON_PATH,dataString);
}

function usage() {
	console.log("use node todo.js [new | Complete | delete | help] [task]");
}

//new task
function add(task) {
	var data = getData();
	data.push({task :task ,completed:false});
	setData(data);
	list();
}

//complete task
function Complete(task) {
	var data = getData();
	data[task].completed = !data[task].completed;
	setData(data);
	list();
}

//delete task
function del(task){
	var data = getData();
	data.splice(task,1);
	setData(data);
	list();
}

//list all tasks
function list() {
	var data = getData();
	if(data.length > 0){
		console.log("Task list:");
		data.forEach(function (task,index){
			console.log("task", index+1+"."," ["+(task.completed ? "✓" : " ")+"] ",task.task);
		});
		
	}else{
		console.log("No tasks added!!");
	}

}


init();

switch(command){
	case "new":
		add(argument);
		break;
	case "complete":
		Complete(argument-1);
		break;
	case "delete":
		del(argument);
		break;
	case "help":
		usage();
		break;
		case undefined:
			list();
			break;
	
}
