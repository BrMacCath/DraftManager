import { Notice, TFile, type App } from "obsidian";

import { overwriteFileInVault } from "src/settings/functions/URI/overwriteFileInVault";
import { overwriteFileSelectionInVault } from "src/settings/functions/URI/overwriteFileSelectionInVault";
import type FileArrangement from "types/FolderTypes/fileArrangement";
import type FolderArrangement from "types/FolderTypes/folderArrangement";

export function moveFolderArrangementToVault(folderArrangement:FolderArrangement,vault:string,app:App,basePath:string){
    // Process each file within the folder arrangement.
    const subFolders:FolderArrangement[] = folderArrangement.subFolders;
    const doNotMove= "Do not move"
    console.log(folderArrangement.name)
    subFolders.forEach((subFolder)=>{
        console.log(folderArrangement.name)
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

        const asIs ="As Is"

        if(file.moveType ==asIs){
            await overwriteFileInVault(tFile,vault,app)
            return;
        }
        // Extract current Draft
        const lastVersion = "Last Version"
        if(file.moveType ==lastVersion){
            overwriteFileSelectionInVault(tFile,vault,app)
            return
        }
        return;

    }
    )

}