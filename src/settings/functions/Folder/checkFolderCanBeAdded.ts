import { Notice, TFolder } from "obsidian";
import type DraftManagerPlugin from "src/main";
import type draftConditions from "types/choices/draftConditions";
import { v4 } from "uuid";


export function checkFolderCanBeAdded(new_folder:string,plugin:DraftManagerPlugin):void{
    for(let i = 0; i <plugin.settings.folders.length; i++){
        if (new_folder == plugin.settings.folders[i].folder){
            new Notice("This folder is already on the list");
            return;
        }
    }
    const tfold:TFolder|null  = plugin.app.vault.getFolderByPath(new_folder);
    if( !(tfold instanceof TFolder) ){
        new Notice("This folder does not exist");
        return;
    }

    // This is assigning not just the values but the memory too.
    const folderCopy:draftConditions = this.plugin.settings.defaultFolder;
    plugin.settings.folders.push({folder:tfold.name,id:v4(),draftConditions:this.plugin.settings.defaultFolder,compileOutPut:"",subFiles:[],subFolders:[]});
    plugin.saveSettings();
    //plugin.settings.display();
}