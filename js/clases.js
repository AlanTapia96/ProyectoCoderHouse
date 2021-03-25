class Camiseta{
    constructor(club,pais,cant){
        this.club = club;
        this.pais = pais;
        this.cantXs = cant;
        this.cantS = cant;
        this.cantM = cant;
        this.cantL = cant;
        this.cantxL = cant;
        this.precio = 1500; //Precio estandar hasta el momento para todas las camisetas
    }

    modificarPrecio(precio){
        this.precio = parseFloat(precio);
    }

    agregarCantidad(cant){
        this.cantidad += cant;
    }   

    vender(){
        this.cantidad -= 1;
    }

    devolverClub(){
        return this.club;
    }

    operarCantidad(talle,accion,cantidad){
        if(accion === "agregar"){
            if(talle = "Xs") this.cantXs += cantidad
            else if (talle = "S") this.cantS +=cantidad
            else if (talle = "M") this.cantM += cantidad;
            else if (talle = "L") this.cantL += cantidad;    
            else this.cantxL += 1;
        }else if (accion === "restar"){
            if(talle = "Xs") this.cantXs -= cantidad
            else if (talle = "S") this.cantS -=cantidad
            else if (talle = "M") this.cantM -= cantidad;
            else if (talle = "L") this.cantL -= cantidad;    
            else this.cantxL -= cantidad;
        }
    }

    devolverCantidad(talle){
            if(talle = "Xs") return this.cantXs;
            else if (talle = "S") return this.cantS;
            else if (talle = "M") return this.cantM;
            else if (talle = "L") return this.cantL;    
            else this.cantxL += 1;
    }


    devolverPrecio(){
        return this.precio;
    }

    devolverPais(){
        return this.pais;
    }
}