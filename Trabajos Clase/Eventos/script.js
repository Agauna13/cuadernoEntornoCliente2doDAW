var fuera = document.getElementById("fuera");
var dentro = document.getElementById("dentro");

fuera.addEventListener("mouseover", function(event){
    if(event.target === fuera){
        console.log("fuera");
    }else if(event.target === dentro){
        console.log("dentro");
    }
});

dentro.addEventListener("click", function(){
    console.log("dentro");
});
