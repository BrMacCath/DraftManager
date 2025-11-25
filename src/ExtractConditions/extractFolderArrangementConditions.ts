import {  TAbstractFile, TFile, type App } from "obsidian";

import type FileArrangement from "types/FolderTypes/fileArrangement";
import type FolderArrangement from "types/FolderTypes/folderArrangement";

import { extractConditionsAppliedToSubFiles } from "./extractConditionsAppliedToSubFiles";


export async function extractFolderArrangementToVault(folderArrangement:FolderArrangement,app:App,basePath:string){
    // Process each file within the folder arrangement.
    const subFolders:FolderArrangement[] = folderArrangement.subFolders;
    
    subFolders.forEach( async(subFolder)=>{
        await extractFolderArrangementToVault(subFolder,app,basePath +"/"+ subFolder.name)
    })


    for(let j=0;j <subFolders.length;j++){
        const subFolder = subFolders[j]
        const subFiles:FileArrangement[] = subFolder.subFiles;
        const compileOutputFilePath = basePath +"/" + subFolder.compileOutput;
        const compileOutPutTFile:TAbstractFile|null = app.vault.getAbstractFileByPath(compileOutputFilePath)
        if( !(compileOutPutTFile instanceof TFile) ){
            return;
        }

        await extractConditionsAppliedToSubFiles(subFiles,app,basePath+"/" + subFolder.name,compileOutPutTFile);
        
    } 

}