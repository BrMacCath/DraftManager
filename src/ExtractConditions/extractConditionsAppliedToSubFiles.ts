import type FileArrangement from "types/FolderTypes/fileArrangement";
import { extractLastVersionContent } from "src/extractLastVersionContent";
import { App, Notice, TFile } from "obsidian";
import { removeFrontMatter } from "./removeFrontmatter";

export function extractConditionsAppliedToSubFiles(subFiles:FileArrangement[],app:App,basePath:string):string{
    let str =""
    const doNotUse= "Don't Use"
    console.log("BasePath:: " + basePath)
    console.log(subFiles.length)
    subFiles.forEach(async (file,index)=>{
        console.log(file.extractType)
        console.log(basePath+"/"+file.name)
        console.log(index)
        if(file.extractType == doNotUse){
            return;
        }

        const temp = await app.vault.getAbstractFileByPath(basePath+"/"+file.name)
        if(  !(temp instanceof TFile) ){
            return;
        }
        const tFile:TFile = temp
        if(!tFile){
            new Notice("Couldn't find " + file.name)
            return
        }
        console.log(await app.vault.cachedRead(tFile))

        const asIs ="As Is"
        if(file.extractType == asIs){
            const tempStr= await app.vault.cachedRead(tFile);
            str += tempStr;
            return;
        }
        
        // Extract current Draft
        const lastVersion = "Last Version"
        
        if(file.extractType == lastVersion){
            const selection = extractLastVersionContent(await app.vault.cachedRead(tFile));
            str += selection;
            return;
        }
        const content = "Content"
        if(file.extractType == content){
            const tempStr = removeFrontMatter(await app.vault.cachedRead(tFile))
            str += tempStr;
            console.log("Inside content case")
            console.log(str)
            return;
        }
        console.log("No extract conditions found")
        console.log(file.extractType)
        console.log(file.extractType == content)
        return;
    })
    console.log("End of extract")
    console.log(str)
    return str;

}