import fs, { readFileSync } from 'fs'
import { writeFile } from 'fs/promises';
import { readGastosFile, writeGastosFile } from './fs';
import { Command } from 'commander'; 
import { argv, title } from 'process';
import chalk from 'chalk';
import prompt from 'prompts'



export const DATABASE_GASTOS = 'gastos.json'

interface ICreateGasto{
name: string;
description:string;
value:number;
}

class Gasto{
    
    ID:number;
    name:string;
    description:string;
    value:number;

    constructor({name, description, value} :ICreateGasto){
        this.ID=JSON.parse(readFileSync(DATABASE_GASTOS).toString()).length + 1;
        this.name=name;
        this.description=description;
        this.value=value;


        
    }
}





const getGastos=async()=>{
 
     const gastos= await readGastosFile();
     return JSON.parse(gastos);
    
 
}


const createGasto=async (gasto: Gasto) =>{
    const gastos= await getGastos();
    gastos.push(gasto);

    await writeGastosFile(gastos);
    return gasto;
}


const getGasto=async(ID:number)=> {
    const gastos=await getGastos();
    return gastos.find((gasto:Gasto)=>gasto.ID ===ID)
}

const deleteGasto =async (ID: number) =>{
    const gastos= await getGastos();
    const newGastos = gastos.filter((gasto:Gasto)=> gasto.ID !== ID);
    await writeGastosFile(newGastos)
   
}



const cli=new Command()

cli.name("Gastos").description("APP Gastos").version("1.0.0")

cli.command("nucba").description("first command").action(()=>{console.log(chalk.red("bienvenido a Nucba"))})

cli.command("gastos").description("Administracion de gastos CLI").action(async () =>{
    const {action} =await prompt ({
        type: "select",
        name:"action",
        message:"¿Que accion queres hacer con tus gastos?",
        choices:[
           { title: "Agregar gasto",
            value:"C",},
            { title: "Ver listado de gastos",
            value:"R",},
            { title: "Eliminar gasto",
            value:"D",},
        ]

    })


    switch (action){
        case 'C':
        const {name} =await prompt({
            type:'text',
            name:'name',
            message:'Ingresa el nombre del usuario',
        });
        const {description} =await prompt({
            type:'text',
            name:'description',
            message:'Describe el gasto',
        });
        const {value} =await prompt({
            type:'text',
            name:'value',
            message:'Coloca el valor del gasto',
        });

        await createGasto(
            new Gasto({name, description, value})
        )
        return console.log(chalk.green("Usuario creado con exito, felicitaciones"))

        case 'R':
            
            const data= await getGastos();
            console.table(data)

        case 'D':
            const {id}= await prompt({
                type:'number',
                name:'id',
                message:'Ingresa el ID del gasto a eliminar',
            })

            try{
                await deleteGasto(id);
                return console.log(chalk.green('El gasto se elimino con exito'));

            }catch(error){
                return console.log(chalk.red(error));
            }
    }
})

cli.parse(argv)