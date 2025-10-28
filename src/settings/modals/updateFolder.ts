import type FolderArrangement from "types/FolderTypes/folderArrangement";
import { DraftTab } from "../tabs/settingTab";
import { Modal,App,Setting,Notice,SearchComponent,  TFolder } from "obsidian";
import { UpdateSubFolder } from "./updateSubfolder";
import { buttonCssClassName,  deleteCssName } from "types/cssStylings/cssClassNames";
import type DraftManagerPlugin from "src/main";
import { fillOutFolderStructure } from "../functions/Folder/fillOutFolderStructure";
import { mount,unmount } from "svelte";
import AdjustText from "../svelteTest/adjustText.svelte";

export class UpdateFolder extends Modal {
	plugin: DraftManagerPlugin;
	folder: FolderArrangement;
	settingsTab: DraftTab;
	svelteText: ReturnType<typeof AdjustText> |undefined;
	constructor(app: App,plugin: DraftManagerPlugin,folder:FolderArrangement,settingsTab:DraftTab) {
		super(app);
		this.plugin = plugin;
		this.folder = folder;
		this.settingsTab =settingsTab;
	}

	onOpen() {
        this.createSubfolderConditions()
        this.createDeleteFolderButton()
		this.svelteText = mount(AdjustText,{target:this.containerEl,props:{text:this.plugin.settings.test}})
	}

    createSubfolderConditions():void{
        const {contentEl} = this;
		contentEl.createEl("h1").setText("Adjust " +this.folder.folder + " folder")
        let subFoldArrange = new Setting(contentEl);
        subFoldArrange.setName("Update Subfolders")
            .setDesc("Change Subfolder Conditions")
            .addButton((cb) => {
                cb.setButtonText("Update");
                cb.setClass(buttonCssClassName);
                cb.onClick( () =>{
                    new UpdateSubFolder(this.app,this.plugin,this.folder,this.settingsTab).open()
                } )
            } )
        
    }


    checkFolderCanBeAdded(new_folder:string,cb:SearchComponent,oldName:string):void{
		for(let i = 0; i <this.plugin.settings.folders.length; i++){
			if (new_folder == this.plugin.settings.folders[i].folder){
				new Notice("This folder is already on the list");
                cb.setValue(oldName);
				return;
			}
		}
        const foldName = this.app.vault.getFolderByPath(new_folder);
        if( !(foldName instanceof TFolder) ){
            return;
        }
 
        this.folder= fillOutFolderStructure(foldName,this.plugin.settings.defaultFolder);
		this.plugin.saveSettings();
		this.settingsTab.display();
	}


	createDeleteFolderButton():void{
        const {contentEl} = this;
        new Setting(contentEl).setName("Delete Folder?")
		.setDesc("Do you wish to delete this folder?")
		.addButton((cb) =>{
			cb.setButtonText("Delete").onClick( () =>{
				//this.plugin.settings.folders = this.plugin.settings.folders.filter(fold => fold.id != this.folder.id)
				this.plugin.saveSettings()
				this.settingsTab.display();
				this.close()
			} ) 
            cb.setClass(deleteCssName);
	} )
    }

	

	onClose() {
		const {contentEl} = this;
		if(this.svelteText){
            unmount(this.svelteText);
        }
		contentEl.empty();
	}
}
