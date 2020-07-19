document.getElementById("boton").addEventListener("click", function(){
    var num = document.getElementById("numero").value;
    console.log(num);
    if (num != ""){
        num = parseInt(num);
        var res = num.toString(2);
        document.getElementById("resultado").innerHTML = res;

    }else {
        document.getElementById("resultado").innerHTML = "No ingresaste un número!";
    }
});