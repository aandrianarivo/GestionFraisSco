

  function validateForm() {
    const idAd = document.getElementById('idAd').value;
    const idEt = document.getElementById('idEt').value;
    const status = document.getElementById('status').value;
    const ref = document.getElementById('ref').value;
    const montant = document.getElementById('montant').value;
    const date = document.getElementById('date').value;


    if (idAd == '') {
        alert("L'id Admin est requis");
        return false;
    }


  
    if (idEt == '') {
      alert("L'id de l'etudiant est requis");
      return false;
    }
    if (status == '') {
      alert("Le status est requis");
      return false;
    }
  
    if (ref == '') {
      alert("Le reference du borderaux est requis");
      return false;
    }
    
    if (montant == '') {
      alert("Le montant est requis");
      return false;
    }

    if (date == '') {
        alert("La date  est requise");
        return false;
    }
  return true;
}

function showData() {
    const url = 'http://localhost:3450/api/enregister/liste-enregister';
  
    fetch(url)
      .then(response => {
        if (!response.ok){
            throw new Error("Erreur pory e")
        }
        console.log('fetch succes')
        return response.json()
      })
      .then(data => {
        console.log(data)
        
        let html = "";
        data.forEach(function (element, index) {
          if(element.statusEn == "COMPLET"){
            element.payement2eT = ""
          }
          html += "<tr>";
          html += "<td>" + element.idEn + "</td>";
          html += "<td>" + element.idAd + "</td>";
          html += "<td>" + element.Borderaux.idEt + "</td>";
          html += "<td>" + element.statusEn + "</td>";
          html += "<td>"+'0'+ element.refBord + "</td>";
          html += "<td>" + element.Borderaux.montantBord + "</td>";
          html += "<td>" + element.Borderaux.dateBord+ "</td>";
          html += "<td>" + element.payement2eT + "</td>";
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
      const url = 'http://localhost:3450/api/enregister/create-enregister';
      const idAd = document.getElementById('idAd').value;
      const idEt = document.getElementById('idEt').value;
      const status = document.getElementById('status').value;
      const ref = document.getElementById('ref').value;
      const montant = document.getElementById('montant').value;
      const date = document.getElementById('date').value;
  
      const data = {
        idAd:idAd,
        idEt:idEt,
        statusEn:status,
        refBord:ref,
        montantBord:montant,
        dateBord:date
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
          document.getElementById('idAd').value='';
          document.getElementById('idEt').value='';
          document.getElementById('status').value='';
          document.getElementById('ref').value='';
          document.getElementById('montant').value='';
          document.getElementById('date').value='';
          alert('Ajout reussi!')
        })
        .catch(error => console.error(error));
    }
}

function updateData(index) {
  document.getElementById('Submit').style.display = 'none';
  document.getElementById('Update').style.display = 'block';
  const row = document.querySelectorAll('#crudTable tbody tr')[index]
  const cells = row.querySelectorAll('td')


  const idEn =  cells[0].innerText;
  const idAd = cells[1].innerText;
  const idEt = cells[2].innerText;
  const status = cells[3].innerText;
  const ref = cells[4].innerText;
  const montant =cells[5].innerText;
  const date = cells[6].innerText;
  const date2eT = cells[7].innerText;

  document.getElementById('idAd').value=idAd;
  document.getElementById('idEt').value=idEt;
  document.getElementById('status').value=status;
  document.getElementById('ref').value=ref;
  document.getElementById('montant').value=montant;
  document.getElementById('date').value=date;

  document.getElementById('Update').addEventListener('click', function() {
  const url = 'http://localhost:3450/api/enregister/update-enregister/'+idEn;

      const updatedData = {
        idAd: document.getElementById('idAd').value,
        idEt: document.getElementById('idEt').value,
        statusEn: document.getElementById('status').value,
        refBord: document.getElementById('ref').value,
        montantBord: document.getElementById('montant').value,
        dateBord: document.getElementById('date').value,

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
          document.getElementById('idAd').value='';
          document.getElementById('idEt').value='';
          document.getElementById('status').value='';
          document.getElementById('ref').value='';
          document.getElementById('montant').value='';
          document.getElementById('date').value='';
          alert('Modification reussi!')

        })
        .catch(error => console.error(error));
    });

}

function deleteData(index) {
        

      
  const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?');
  if (!confirmDelete) {
    return;
  }
  const row = document.querySelectorAll('#crudTable tbody tr')[index]
  const cells = row.querySelectorAll('td')
  const id =  cells[0].innerText;
  const idEn = parseInt(id,10)
  console.log(typeof(idEn))

  const url = 'http://localhost:3450/api/enregister/delete-enregister/'+idEn;

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
      showData();
      alert('Suppression!') 
    })
    .catch(error => console.error(error));
}