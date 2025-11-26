import { Notice, TFolder } from "obsidian";
import type DraftManagerPlugin from "src/main";
import type FolderArrangement from "types/FolderTypes/folderArrangement";
import { v4 } from "uuid";


export async function checkFolderCanBeAdded(new_folder:string,plugin:DraftManagerPlugin):Promise<void>{
    for(let i = 0; i <plugin.settings.folders.length; i++){
        if (new_folder == plugin.settings.folders[i].folder.name){
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
    const folderArrangement:FolderArrangement ={name:tfold.name,id:v4(),draftConditions:this.plugin.settings.defaultFolder,compileOutput:"",subFiles:[],subFolders:[],moveType:"As Is",extractType:"Content"};
    plugin.settings.folders.push({folder:folderArrangement,id:v4(),displayName: tfold.name,basePath:tfold.path});
    await plugin.saveSettings();
    //plugin.settings.display();
}