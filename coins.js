const c = [0,1,2,5,10]

const S = 33

function C(i, s) {
    if (s==0){
        return 0;
    }else if (s > 0 && i==0){
        return Number.MAX_VALUE;

    }else if (c[i]>s){
        return C(i-1,s)
    }else if (c[i]<=s){
        let a= 1+C(i, s-c[i])
        let b = C(i-1,s)
        return Math.min(a, b)
    }
}


console.log("La cantidad de monedas necesaria es: "+C(4, S))