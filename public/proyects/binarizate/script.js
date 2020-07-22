// document.getElementById("boton1").addEventListener("click", function(){
//     var input = document.getElementById("texto").value;
//     var output = document.getElementById("resultado1");
//     output.innerHTML = ""; 
//     if (input != ""){                
//         for (i=0; i < input.length; i++) {
//             var res = 0 + input[i].charCodeAt(0).toString(2) + " ";
//             document.getElementById("resultado1").innerHTML += res;
//        }
//     }else {
//         output.innerHTML = "Ingresá algún texto";
//     }
// });

// document.getElementById("boton2").addEventListener("click", function(){
//     var input = document.getElementById("binario").value;
//     var output = document.getElementById("resultado2");
//     output.innerHTML = ""; 
//     if (input != ""){        
//         document.getElementById("resultado2").innerHTML = parseInt(input,2).toString(10);       
//     }else {
//         output.innerHTML = "No ingresaste un número!";
//     }
// });

document.getElementById("boton1").addEventListener("click", function(){
    var input = document.getElementById("texto").value;
    var output = document.getElementById("resultado1");
    output.innerHTML = "";
    if (input != ""){        
        var utf8ToBin = function(s){
            s = unescape(encodeURIComponent(s));
            var chr, i = 0, l = s.length, out = '';
            for(; i < l; i ++){
                chr = s.charCodeAt(i).toString(2);
                while(chr.length % 8 != 0){chr = '0' + chr;}
                out += chr;
            }
            return out;
        };
        document.getElementById("resultado1").innerHTML = utf8ToBin(input.value);
    }else {
        output.innerHTML = "Ingresá algún texto";
        }
    });



    document.getElementById("boton2").addEventListener("click", function(){
        var input = document.getElementById("binario").value;
        var output = document.getElementById("resultado2");
        output.innerHTML = ""; 
        if (input != ""){  
            var binToUtf8 = function(){
                var i = 0, l = input.length, chr, out = '';
                for(; i < l; i += 8){
                    chr = parseInt(input.substr(i, 8),2).toString(16);
                    out += '%' + ((chr.length % 2 == 0) ? chr : '0' + chr);
                }
                return out;
            };       
            document.getElementById("resultado2").innerHTML = binToUtf8(output.value);
        }else {
            output.innerHTML = "No ingresaste un número!";
        }
    });