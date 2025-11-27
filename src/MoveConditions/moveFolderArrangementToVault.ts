import { Notice, TFile, type App } from "obsidian";

import { overwriteFileInVault } from "src/settings/functions/URI/overwriteFileInVault";
import { overwriteFileSelectionInVault } from "src/settings/functions/URI/overwriteFileSelectionInVault";
import { asIsStr, lastVersionStr } from "types/choices/Constants/draftConstants";
import type FileArrangement from "types/FolderTypes/fileArrangement";
import type FolderArrangement from "types/FolderTypes/folderArrangement";

export function moveFolderArrangementToVault(folderArrangement:FolderArrangement,vault:string,app:App,basePath:string){
    // Process each file within the folder arrangement.
    const subFolders:FolderArrangement[] = folderArrangement.subFolders;
    const doNotMove= "Do not move"
    subFolders.forEach((subFolder)=>{
        moveFolderArrangementToVault(subFolder,vault,app,basePath +"/"+ folderArrangement.name)
    })

    const subFiles:FileArrangement[] = folderArrangement.subFiles;
    subFiles.forEach(async (file)=>{
        if(file.moveType == doNotMove){
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

        if(file.moveType ==asIsStr){
            await overwriteFileInVault(tFile,vault,app)
            return;
        }
        // Extract current Draft
        if(file.moveType ==lastVersionStr){
            overwriteFileSelectionInVault(tFile,vault,app)
            return
        }
        return;

    }
    )

}