import { Notice } from "obsidian";
import type ResearchPlugin from "src/main";
import type draftConditions from "types/choices/draftConditions";
import { v4 } from "uuid";


export function checkFolderCanBeAdded(new_folder:string,plugin:ResearchPlugin):void{
    for(let i = 0; i <this.plugin.settings.folders.length; i++){
        if (new_folder == this.plugin.settings.folders[i].folderName){
            new Notice("This folder is already on the list");
            return;
        }
    }
    // This is assigning not just the values but the memory too.
    const folderCopy:draftConditions = this.plugin.settings.defaultFolder;
    this.plugin.settings.folders.push({folderName:new_folder,id:v4(),haveSubFolders:true,haveDrafts:true,bibliography: "",draftConditions:this.plugin.settings.defaultFolder,subFolderArrangement:{excludeFolders:[],folderArrangement:[]}});
    this.plugin.saveSettings();
    this.display();
}