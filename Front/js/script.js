function validateForm(){
     const name = document.getElementById('name').value;
     const age = document.getElementById('age').value;
     const adresse = document.getElementById('adresse').value;
     const email = document.getElementById('email').value;


     if(name == ''){
        alert("Le nom est requis")
        return false
     }
     if(age ==''){
        alert("L'age est requis")
        return false

     }
     else if(age <= 1){
        alert("Age most be positive")
        return false

     }

     if(adresse == ''){
        alert("L'adresse est requis")
        return false

     }
     if(email == ''){
        alert("L'email est requis")
        return false
     }
     else if(!email.includes('@')){
        alert("Adresse Email invalide")
        return false
     }

     return true
}

function showData(){
    let peopleList;
    if(localStorage.getItem('peopleList')== null) {
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem('peopleList'))
    }
    
    let html = "";
    peopleList.forEach(function(element,index){
        html+="<tr>";
        html+="<td>" + element.name +"</td>"
        html+="<td>" + element.age +"</td>"
        html+="<td>" + element.adresse +"</td>"
        html+="<td>" + element.email +"</td>"
        html+= '<td> <button onclick="deleteData('+index+')" class = "btn btn-danger">Delete</button><button onclick="updateData('+index+')" class = "btn btn-warning m-2">Edit</button> </td>'
        html +="</tr>"
    })
    document.querySelector("#crudTable tbody").innerHTML = html

}

document.onload =showData()

function addData(){
    if(validateForm() == true){
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const adresse = document.getElementById('adresse').value;
        const email = document.getElementById('email').value;

        let peopleList;
        if(localStorage.getItem('peopleList')== null) {
            peopleList = [];
        }
        else{
            peopleList = JSON.parse(localStorage.getItem('peopleList'))
        }

        peopleList.push({
            name,
            age,
            adresse,
            email
        })

        localStorage.setItem("peopleList",JSON.stringify(peopleList))
        showData();
        document.getElementById('name').value = ""
        document.getElementById('age').value = ""
        document.getElementById('adresse').value = ""
        document.getElementById('email').value = ""

    }
}

function deleteData(index){
    let peopleList;
    if(localStorage.getItem('peopleList')== null) {
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem('peopleList'))
    }
    peopleList.splice(index,1)
    localStorage.setItem('peopleList',JSON.stringify(peopleList))
    showData()

    
}

function updateData(index){
    
     
    document.getElementById('Submit').style.display = 'none'
    document.getElementById('Update').style.display = 'block'

    let peopleList;
    if(localStorage.getItem('peopleList')== null) {
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem('peopleList'))
    }

    document.getElementById('name').value = peopleList[index].name
    document.getElementById('age').value = peopleList[index].age
    document.getElementById('adresse').value = peopleList[index].adresse
    document.getElementById('email').value = peopleList[index].email


}

