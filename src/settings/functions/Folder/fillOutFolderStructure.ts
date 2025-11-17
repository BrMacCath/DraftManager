import { TFile, TFolder } from "obsidian";
import { defaultFolderDraftConditions } from "src/settings/Default Values/defaultFolderDraftConditions";
import type draftConditions from "types/choices/draftConditions";
import type FileArrangement from "types/FolderTypes/fileArrangement";
import type FolderArrangement from "types/FolderTypes/folderArrangement";
import { v4 } from "uuid";


export function fillOutFolderStructure(folderTFile:TFolder,defaultDraftConditions:draftConditions):FolderArrangement{
    let tFolders:TFolder[] =folderTFile?.children.filter((fold) =>{
        return fold instanceof TFolder;
    });
    let subFolders:FolderArrangement[] =[];
    tFolders.forEach((folder)=>{
        subFolders.push(fillOutFolderStructure(folder,defaultDraftConditions) )
    })

    let tFiles:TFile[]= folderTFile?.children.filter((file) =>{
        return file instanceof TFile;
    });
    let subFiles:FileArrangement[]=[];
    tFiles.forEach((file)=>{
        subFiles.push({name:file.name,id:v4(),draftConditions:defaultDraftConditions,moveType:"As Is",extractType:"Content"})
    })
    
    const unique_id = v4();
    const compileOutPut ="";
    
    return {name:folderTFile.name,subFolders:subFolders,subFiles:subFiles,compileOutput:compileOutPut,id:v4(),draftConditions:defaultFolderDraftConditions,moveType:"As Is",extractType:"Content"}

}