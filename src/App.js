import {useState,useEffect} from "react"
import axios from "axios"

function App(){

const [name,setName] = useState("")
const [age,setAge] = useState("")
const [course,setCourse] = useState("")
const [students,setStudents] = useState([])


// get students

const getStudents = async () => {

const res = await axios.get("https://mongodb-student-app.onrender.com/students")

setStudents(res.data)

}




// add student

const addStudent = async () => {

if(!name || !age || !course){
alert("Please fill all fields")
return
}

await axios.post("https://mongodb-student-app.onrender.com/addStudent",{
name:name,
age:age,
course:course,
status:"enrolled"
})

getStudents()

setName("")
setAge("")
setCourse("")

}


// delete student

const deleteStudent = async(id)=>{

await axios.delete("https://mongodb-student-app.onrender.com/delete/"+id)

getStudents()

}


// update student

const updateStudent = async(id)=>{

await axios.put("https://mongodb-student-app.onrender.com/updateStatus/"+id)

getStudents()

}


useEffect(()=>{

getStudents()

},[])



return(

<div style={{padding:"40px"}}>

<h2>Student Database</h2>

<input
value={name}
placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
value={age}
placeholder="Age"
onChange={(e)=>setAge(e.target.value)}
/>

<input
value={course}
placeholder="Course"
onChange={(e)=>setCourse(e.target.value)}
/>

<button onClick={addStudent}>Add Student</button>

<hr/>

<h3>Total Students: {students.length}</h3>

{students.map((s)=>{

return(

<div key={s._id}>

<h3>{s.name}</h3>

<p>Age : {s.age}</p>
<p>Course : {s.course}</p>
<p>Status : {s.status}</p>

<button onClick={()=>updateStudent(s._id)}>Complete</button>
<button onClick={()=>deleteStudent(s._id)}>Delete</button>

<hr/>

</div>

)

})}



</div>

)

}

export default App