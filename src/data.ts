export interface signUp{
    name:string,
    password:string,
    email:string
}

export interface Login{
    password:string,
    email:string
}

export interface Products{
    name:string,
    price:number,
    categories:string,
    colour:string,
    description:string,
    image:string,
    id:number,
    quantity:undefined | number,
    productId:undefined |number
}

export interface Cart{
    name:string,
    price:number,
    categories:string,
    colour:string,
    description:string,
    image:string,
    id:number | undefined,
    quantity:undefined | number,
    productId: number,
    userId: number
}

export interface priceSummary{
    price:number,
    delivery:number,
    discount:number,
    tax:number,
    total:number
}

export interface Orders{
    email:string,
    adress:string,
    contactNo:string,
    userId:number,
    totalPrice:undefined|number,
    id:number|undefined
}