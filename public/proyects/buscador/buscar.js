window.onload=function(){
    
    setTimeout(() => {
        document.getElementById("loadingCat").style.display = "none";
        document.getElementById("fullPage").className = "fullDisplay";
    }, 2000);
    
      document.getElementById("searchBtn").addEventListener("click", async function(){


        document.getElementById('results').textContent = '';

        let nameField = document.getElementById('name');
        let name = nameField.value.toLowerCase();
        
        let puestoField = document.getElementById('puesto');
        let selected = puestoField.selectedIndex;
        let puesto = puestoField.options[selected].value;

        let checked = document.querySelectorAll("[name='medio']");
        
        let medio = '';
        let obj = [];
        
        for (i=0; i<checked.length;i++) {
            if (checked[i].checked) {
                obj.push(checked[i].value);               
            }
          };
        medio = obj;
        
        const response = await fetch('/api1');
        const data = await response.json();
        
        const removeAccents = (str) => {
            return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          } 
          
        for (item of data){

            if (puesto == 'Todos' || puesto == item.puesto){
                
                if(removeAccents(name) == '' || removeAccents(name) == removeAccents(item.name.toLowerCase()) || removeAccents(name) == removeAccents(item.last.toLowerCase())){
                  
                  let selectedMedio = Object.values(medio);
                  let dbMedio = Object.values(item.medio);
                                  
                  if (dbMedio.some(medio => selectedMedio.includes(medio))) {
                                const root = document.createElement('article');
                                root.className = "contenedor col-xs-12 col-sm-6 col-md-4 col-lg-3 pt-2";
        
                                const container = document.createElement ('section');
                                container.className = "row";
                                
                                const restData = document.createElement('aside');
                                restData.className = "row";
        
                                const medioData = document.createElement('span');
                                medioData.className = "medio col-md-12";
                                medioData.textContent = `${item.medio}`.replace(/,/g," ");
                                       
                                const puesto = document.createElement('p');
                                puesto.className = "puesto col-md-12";
                                puesto.textContent = `${item.puesto}`;
                                
                                const fullName = document.createElement('section');
                                fullName.className = "name col";
                                fullName.textContent = `${item.name}`+' '+`${item.last}`;
            
                                const avatar = document.createElement('img');
                                avatar.className = "avatar col";
                                avatar.src = `${item.avatarUrl}`;
        
                                restData.append(puesto, medioData);
                                fullName.append(restData);
                                container.append(avatar,fullName)
                                root.append(container);
                                document.getElementById('results').append(root);
                              }
                      }    
          }
        }
    });
}

