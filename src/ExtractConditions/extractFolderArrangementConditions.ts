import { Notice, TFile, type App } from "obsidian";

import type FileArrangement from "types/FolderTypes/fileArrangement";
import type FolderArrangement from "types/FolderTypes/folderArrangement";

import { extractConditionsAppliedToSubFiles } from "./extractConditionsAppliedToSubFiles";


export async function extractFolderArrangementToVault(folderArrangement:FolderArrangement,app:App,basePath:string){
    // Process each file within the folder arrangement.
    const subFolders:FolderArrangement[] = folderArrangement.subFolders;
    const doNotUse= "Don't Use"
    console.log("BasePath: " +basePath)
    subFolders.forEach((subFolder)=>{
        
        extractFolderArrangementToVault(subFolder,app,basePath +"/"+ subFolder.name)
    })
    let compileOutputContinue = false;

    subFolders.forEach((subFolder)=>{
        if(subFolder.compileOutput != ""){
            const subFiles = subFolder.subFiles
            let str = extractConditionsAppliedToSubFiles(subFiles,app,basePath+"/"+ subFolder.name )
            console.log(subFolder)
            console.log(str)
            console.log(basePath+"/"+ subFolder.name)

        }
    })


    if(folderArrangement.compileOutput == ""){
        return
    }
    
    console.log(folderArrangement.name)
    const subFiles:FileArrangement[] = folderArrangement.subFiles;
    let str = extractConditionsAppliedToSubFiles(subFiles,app,basePath)
    // let str =""
    // subFiles.forEach(async (file)=>{
    //     console.log(file.extractType)
    //     if(file.extractType == doNotUse){
    //         return;
    //     }

    //     const temp = await app.vault.getAbstractFileByPath(basePath+"/"+file.name)
    //     if(  !(temp instanceof TFile) ){
    //         return;
    //     }
    //     const tFile:TFile = temp
    //     if(!tFile){
    //         new Notice("Couldn't find " + file.name)
    //         return
    //     }

    //     const asIs ="As Is"
    //     if(file.extractType == asIs){
    //         const tempStr= await app.vault.cachedRead(tFile);
    //         str += tempStr;
    //         return;
    //     }
        
    //     // Extract current Draft
    //     const lastVersion = "Last Version"
        
    //     if(file.extractType == lastVersion){
    //         const selection = extractLastVersionContent(await app.vault.cachedRead(tFile));
    //         str += selection
    //     }
    //     const content = "Content"
    //     if(file.extractType == content){
    //         const tempStr = removeFrontMatter(await app.vault.cachedRead(tFile))
    //         str += tempStr
    //     }
        
    //     return;
    // })
    const compileOutputFilePath = basePath +"/" + folderArrangement.compileOutput;
    const compileOutPutTFile = await app.vault.getAbstractFileByPath(compileOutputFilePath)
    console.log("Before end")
    console.log(compileOutputFilePath)
    if( !(compileOutPutTFile instanceof TFile) ){
        return;
    }
    console.log(str)
    await app.vault.modify(compileOutPutTFile,str)


}