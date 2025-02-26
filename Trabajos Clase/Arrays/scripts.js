let palabra = "Holaç coMo €eStas€ rRrraaaaaaaamon";
let text = palabra.toLowerCase();



for(let i = 0; i < text.length; i++){
    let letr = text.charAt(i);
    if(letr !== 'l'){
        for(let j = i+1; j < text.length -1; j++){
            if(text.charAt(j) == letr){
                text.replace(text.charAt(j), "");
            }
        }
    }
    
}

console.log(text);
