import { TFile, TFolder } from "obsidian";
import type ExperimentType from "types/choices/experimentType";

export function fillOutFolderArrangement(folder:TFolder):ExperimentType{
    const subFolders:TFolder[] = folder.children.filter( (file) => file instanceof TFolder);
    const subFiles: TFile[] = folder.children.filter( (file) => file instanceof TFile);
    let fileArrangement:[TFile,number][] = [];
    for(let i=0; i< subFiles.length; i++){
        fileArrangement.push([subFiles[i],i+1])
    }
    let folderArrangement:[ExperimentType,number][] = []
    for(let i=0; i< subFolders.length; i++){
        folderArrangement.push([  fillOutFolderArrangement(subFolders[i])  , i+1 ])
    }
    const output:ExperimentType = {folder:folder,
        folderArrangement:folderArrangement,
        fileArrangement:fileArrangement}
    return output

}