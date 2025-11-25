import { App, TFile, TFolder} from "obsidian";
import { overwriteFileInVault } from "./overwriteFileInVault";

export function moveFolderToVault(tFolder:TFolder,vault:string,app:App){
    const foldChildren = tFolder?.children;
    foldChildren.forEach( async(tFile) =>{
        if (tFile instanceof TFile){
            await overwriteFileInVault(tFile,vault,app)
            //Move file
        }
        if(tFile instanceof TFolder){
            moveFolderToVault(tFile,vault,app);
        }

    } )
}