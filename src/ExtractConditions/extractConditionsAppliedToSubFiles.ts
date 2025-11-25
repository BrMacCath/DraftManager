import type FileArrangement from "types/FolderTypes/fileArrangement";
import { extractLastVersionContent } from "src/extractLastVersionContent";
import { App, Notice, TFile } from "obsidian";
import { removeFrontMatter } from "./removeFrontMatter";

export async function extractConditionsAppliedToSubFiles(subFiles:FileArrangement[],app:App,basePath:string,compileTFile:TFile):Promise<string>{
    const doNotUse= "Don't Use"

    let tempStrs =[];

    for(let i = 0;i <subFiles.length;i++ ){
        
        const file = subFiles[i]
        if(file.extractType == doNotUse){
            continue;
        }
        const temp = app.vault.getAbstractFileByPath(basePath+"/"+file.name)
        if(  !(temp instanceof TFile) ){
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
            const tempStr = removeFrontMatter(await app.vault.read(tFile))
            tempStrs.push(tempStr)
          
        }  
    }
    let str =""
    
    Promise.all(tempStrs)
        .then(async(results)=>{
            str = results.join("\n\n")
            await app.vault.modify(compileTFile,str)
            // Here is where I should modify the files
        }
    )
        .catch((err)=>{
            console.error(err)
        })
    return str;

}