window.onload=function(){
    document.getElementById("searchBtn").addEventListener("click", async function(){
          
        let name = document.getElementById('name').value;
        let last = document.getElementById('last').value;
        let puestoField = document.getElementById('puesto');
        let selected = puestoField.selectedIndex;
        let puesto = puestoField.options[selected].value;
        let checked = document.querySelectorAll("[name='medio']");
        
        let avatarUrl = "../../img/" + document.getElementById('avatar').value + ".jpg";
        
        let medio = '';
        //console.log(checked)
        let obj = [];

        for (var i = 0; i < checked.length; i++) {
            if (checked[i].checked) {
                obj.push(checked[i].value);               
            }
          };
        
        medio = obj;

        const data = {name, last, puesto, medio, avatarUrl};
        const options = {   
           method: 'POST',
           headers:{
               'Content-Type': 'application/json'
               },
           body: JSON.stringify(data),
       };
        const response = await fetch('/api1', options);
        const json = await response.json();
        console.log(json);
       
      });  
  };