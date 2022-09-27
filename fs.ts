import { readFileSync } from "fs";
import {readFile, writeFile} from 'fs/promises';
import { DATABASE_GASTOS } from ".";

export const writeGastosFile= async (data:any) =>{
await writeFile(DATABASE_GASTOS, JSON.stringify(data))
return null
}

export const readGastosFile= async () =>{
    try{
        const gastos=  (await readFile(DATABASE_GASTOS)).toString();
        return gastos;
       }
       
    catch(error){
           await writeGastosFile([]);
           return "[]"
       }
}



 