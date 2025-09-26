import { TFile, TFolder } from "obsidian";

export function fillOutFolderArrangement(folder:TFolder){
    const subFolders:TFolder[] = folder.children.filter( (file) => file instanceof TFolder);
    const subFiles: TFile[] = folder.children.filter( (file) => file instanceof TFile);
    let fileArrangement:[TFile,number][] = [];
    for(let i=0; i< subFiles.length; i++){
        fileArrangement.push([subFiles[i],i+1])
    }
   return 0;

}