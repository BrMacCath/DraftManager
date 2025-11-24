import type FileArrangement from "types/FolderTypes/fileArrangement";
import { extractLastVersionContent } from "src/extractLastVersionContent";
import { App, Notice, TFile } from "obsidian";
import { removeFrontMatter } from "./removeFrontMatter";

export async function extractConditionsAppliedToSubFiles(subFiles:FileArrangement[],app:App,basePath:string):Promise<string>{
    
    const doNotUse= "Don't Use"
    console.log("Inside extract conditions")
    console.log(basePath)
    let tempStrs =[];
    for(let i = 0;i++;i <subFiles.length ){
        const file = subFiles[i]
        if(file.extractType == doNotUse){
            continue;
        }
        const temp = app.vault.getAbstractFileByPath(basePath+"/"+file.name)
        if(  !(temp instanceof TFile) ){
            console.log("Not file")
            continue;
        }
        const tFile:TFile = temp
        if(!tFile){
            new Notice("Couldn't find " + file.name)
            continue
        }
        const asIs ="As Is"
        if(file.extractType == asIs){
            const tempStr= await app.vault.read(tFile);
            tempStrs.push(tempStr);
            continue;
        } 
        // Extract current Draft
        const lastVersion = "Last Version"
        
        if(file.extractType == lastVersion){
            const selection = extractLastVersionContent(await app.vault.read(tFile));
            tempStrs.push(selection)
            continue;
        }
        const content = "Content"
        if(file.extractType == content){
            console.log("Inside Content")
            const tempStr = removeFrontMatter(await app.vault.read(tFile))
            console.log(tempStr)
            tempStrs.push(tempStr)
          
        }  
    }
    let str =""
    Promise.all(tempStrs)
        .then((results)=>{
            str = results.join("\n\n")
            console.log(str)
        }
    )
        .catch((err)=>{
            console.log(err)
        })
    return str;

}