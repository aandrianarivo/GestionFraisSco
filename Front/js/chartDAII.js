
let dataC= []
const urlt ='http://localhost:3450/api/etudiant/count-t-etudiant';
fetch(urlt)
    .then(response =>{
        if(!response.ok){
            throw new Error('Erreur')   
        }
        return response.json()
    })
    .then(don => {
         return dataC.push(don.count)
    })
const urlc ='http://localhost:3450/api/etudiant/count-complet-etudiant';
    fetch(urlc)
        .then(response =>{
            if(!response.ok){
                throw new Error('Erreur')   
            }
            return response.json()
        })
        .then(don => {
            console.log(don.count)
        })

const urlp ='http://localhost:3450/api/etudiant/count-paspaye-etudiant';
        fetch(urlp)
            .then(response =>{
                if(!response.ok){
                    throw new Error('Erreur')   
                }
                return response.json()
            })
            .then(don => {
                return dataC.push(don.count) 
            })





const ctx = document.getElementById('myChartDAII');
console.log(dataC[1])
let d;

new Chart(ctx, {
  type: 'polarArea',
  data: {
    labels: ['COMPLET', '1T', 'PAS PAYE'],
    datasets: [{
      label: '# of Votes',
      data: [3,1,2],
      borderWidth: 1
    }]
  },
  options: {


    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

