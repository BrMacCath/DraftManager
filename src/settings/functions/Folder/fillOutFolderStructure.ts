import { TFile, TFolder } from "obsidian";
import { defaultFolderDraftConditions } from "src/settings/Default Values/defaultFolderDraftConditions";
import type draftConditions from "types/choices/draftConditions";
import type FileArrangement from "types/FolderTypes/fileArrangement";
import type FolderArrangement from "types/FolderTypes/folderArrangement";
import { v4 } from "uuid";


export function fillOutFolderStructure(folderTFile:TFolder,defaultDraftConditions:draftConditions,order:number=0):FolderArrangement{
    let tFolders:TFolder[] =folderTFile?.children.filter((fold) =>{
        return fold instanceof TFolder;
    });
    let subFolders:FolderArrangement[] =[];
    tFolders.forEach((folder,order)=>{
        subFolders.push(fillOutFolderStructure(folder,defaultDraftConditions,order) )
    })

    let tFiles:TFile[]= folderTFile?.children.filter((file) =>{
        return file instanceof TFile;
    });
    let subFiles:FileArrangement[]=[];
    tFiles.forEach((file,order)=>{
        subFiles.push({file:file.name,order:order,draftConditions:defaultDraftConditions})
    })
    
    const id = v4();
    const compileOutPut ="";
    
    return {folder:folderTFile.name,subFolders:subFolders,subFiles:subFiles,compileOutPut:compileOutPut,id:id,order:order,draftConditions:defaultFolderDraftConditions}

}