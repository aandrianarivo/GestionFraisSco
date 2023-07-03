let idEtudiant;

function validateForm() {
  const nom = document.getElementById('nom').value;
  const prenom = document.getElementById('prenom').value;
  const email = document.getElementById('email').value;
  const adresse = document.getElementById('adresse').value;
  const tel = document.getElementById('tel').value;
  const niveau = document.getElementById('niveau').value;
  const parcours = document.getElementById('parcours').value;
  const mention = document.getElementById('mention').value;

  if (nom == '') {
      alert("Le nom est requis");
      return false;
  }else if (id <=0){
      alert("L'identifiant doit etre superieur a zero")
      return false
  }



  if (nom == '') {
    alert("Le nom est requis");
    return false;
  }
  if (prenom == '') {
    alert("L'age est requis");
    return false;
  }

  if (adresse == '') {
    alert("L'adresse est requise");
    return false;
  }
  
  if (email == '') {
    alert("L'email est requis");
    return false;
  } else if (!email.includes('@')) {
    alert("Adresse Email invalide");
    return false;
  }

  if (tel == '') {
      alert("Le numero telephone est requise");
      return false;
  }
  if (niveau == '') {
      alert("Le niveau est requise");
      return false;
  }
  if (parcours == '') {
      alert("Le parcours est requise");
      return false;
  }
  if (mention== '') {
      alert("Le mention est requise");
      return false;
    }


  return true;
}
  
  function showData() {
    const url = 'http://localhost:3450/api/etudiant/list-etudiant';
  
    fetch(url)
      .then(response => {
        if (!response.ok){
            throw new Error("Erreur")
        }
        console.log('fetch succes')
        return response.json()
      })
      .then(data => {
        console.log(data)
        let html = "";
        data.forEach(function (element, index) {
          html += "<tr>";
          html += "<td>" + element.idEt + "</td>";
          html += "<td>" + element.nomEt + "</td>";
          html += "<td>" + element.prenomEt + "</td>";
          html += "<td>" + element.emailEt + "</td>";
          html += "<td>"+'0'+ element.telEt + "</td>";
          html += "<td>" + element.status + "</td>";
          html += "<td>" + element.niveauCl + "</td>";
          html += "<td>" + element.parcoursCl + "</td>";
          html += "<td>" + element.mentionCl + "</td>";
          html += '<td> <button onclick="deleteData(' + index + ')" class="btn btn-danger">Delete</button><button onclick="updateData(' + index + ')" class="btn btn-warning m-2">Edit</button> </td>';
          html += "</tr>";
        });
        document.querySelector("#crudTable tbody").innerHTML = html;
      })
      .catch(error => console.error(error));

  }
  
  document.onload = showData();
  
  function addData() {
    if (validateForm()) {
      const url = 'http://localhost:3450/api/etudiant/create-etudiant';
      const nom = document.getElementById('nom').value;
      const prenom = document.getElementById('prenom').value;
      const email = document.getElementById('email').value;
      const adresse = document.getElementById('adresse').value;
      const tel = document.getElementById('tel').value;
      const niveau = document.getElementById('niveau').value;
      const parcours = document.getElementById('parcours').value;
      const mention = document.getElementById('mention').value;
  
      const data = {
        nomEt:nom,
        prenomEt:prenom,
        emailEt:email,
        adresseEt:adresse,
        telEt:tel,
        niveauCl:niveau,
        parcoursCl:parcours,
        mentionCl:mention
      };
  
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(() => {
          showData();
          document.getElementById('nom').value = "";
          document.getElementById('prenom').value = "";
          document.getElementById('email').value = "";
          document.getElementById('adresse').value = "";
          document.getElementById('tel').value = "";
          document.getElementById('status').value = "";
          document.getElementById('niveau').value = "";
          document.getElementById('parcours').value = "";
          document.getElementById('mention').value = "";
          alert('Suppression!')

        })
        .catch(error => console.error(error));
    }
  }
  

function deleteData(index) {
        

      
        const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?');
        if (!confirmDelete) {
          return;
        }
        const row = document.querySelectorAll('#crudTable tbody tr')[index]
        const cells = row.querySelectorAll('td')
        const id =  cells[0].innerText;
        const idEt = parseInt(id,10)
        console.log(typeof(idEt))
      
        const url = 'http://localhost:3450/api/etudiant/delete-etudiant/'+idEt;
      
        fetch(url, {
          method: 'DELETE',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Une erreur s\'est produite lors de la suppression de l\'étudiant.');
            }
            return response.json();
          })
          .then(() => {
            alert('Suppression reussi!')
            showData();
          })
          .catch(error => console.error(error));
}
      

  
  
function updateData(index) {
    document.getElementById('Submit').style.display = 'none';
    document.getElementById('Update').style.display = 'block';
    const row = document.querySelectorAll('#crudTable tbody tr')[index]
    const cells = row.querySelectorAll('td')

  
    const id =  cells[0].innerText;
    const nom = cells[1].innerText;
    const prenom = cells[2].innerText;
    const email = cells[3].innerText;
    const adresse = cells[4].innerText;
    const tel =cells[5].innerText;
    const niveau = cells[6].innerText;
    const parcours = cells[7].innerText;
    const mention = cells[8].innerText;

    document.getElementById('id').value = id;
    document.getElementById('nom').value = nom;
    document.getElementById('prenom').value = prenom;
    document.getElementById('email').value = email;
    document.getElementById('adresse').value = adresse;
    document.getElementById('tel').value = tel;
    document.getElementById('niveau').value = niveau;
    document.getElementById('parcours').value = parcours;
    document.getElementById('mention').value = mention;

    document.getElementById('Update').addEventListener('click', function() {
    const url = 'http://localhost:3450/api/etudiant/update-etudiant/'+id;

        const updatedData = {
          idEtudiant: document.getElementById('id').value,
          nomEt: document.getElementById('nom').value,
          prenomEt: document.getElementById('prenom').value,
          emailEt: document.getElementById('email').value,
          adresseEt: document.getElementById('adresse').value,
          telEt: document.getElementById('tel').value,
          niveauCl: document.getElementById('niveau').value,
          parcoursCl: document.getElementById('parcours').value,
          mentionCl: document.getElementById('mention').value
        }
        fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Une erreur s\'est produite lors de la mise à jour des données.');
            }
            return response.json();
          })
          .then(() => {
            showData();
            document.getElementById('Submit').style.display = 'block';
            document.getElementById('Update').style.display = 'none';
            document.getElementById('id').value = '';
            document.getElementById('nom').value = '';
            document.getElementById('prenom').value = '';
            document.getElementById('email').value = '';
            document.getElementById('adresse').value = '';
            document.getElementById('tel').value = '';
            document.getElementById('niveau').value = '';
            document.getElementById('parcours').value = '';
            document.getElementById('mention').value = '';
            alert('Modification reussi!')
          })
          .catch(error => console.error(error));
      });

    }

  
    
  
