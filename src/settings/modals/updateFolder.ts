import type FolderArrangement from "types/FolderTypes/folderArrangement";
import { DraftTab } from "../tabs/settingTab";
import { Modal,App,Setting,Notice,SearchComponent, Vault, TFolder } from "obsidian";
import { FolderSuggest } from "../suggesters/folderSuggester";
import { UpdateDraftSettings } from "./updateDraftSettings";
import { UpdateSubFolder } from "./updateSubfolder";
import { buttonCssClassName, hideCssName, deleteCssName } from "types/cssStylings/cssClassNames";
import type DraftManagerPlugin from "src/main";
import { fillOutFolderStructure } from "../functions/Folder/fillOutFolderStructure";

export class UpdateFolder extends Modal {
	plugin: DraftManagerPlugin;
	folder: FolderArrangement;
	settingsTab: DraftTab;
	constructor(app: App,plugin: DraftManagerPlugin,folder:FolderArrangement,settingsTab:DraftTab) {
		super(app);
		this.plugin = plugin;
		this.folder = folder;
		this.settingsTab =settingsTab;
	}

	onOpen() {
        this.folderNameConditions()
        this.createSubfolderConditions()
        // this.createDraftConditions()
        this.createDeleteFolderButton()
	}

    folderNameConditions():void{
        const {contentEl} = this;
        contentEl.createEl("h1").setText("Adjust Folder Settings");
        new Setting(contentEl)
			.setName("Folder")
            .setDesc("This is where the code will be applied to.")
            .addSearch((cb) => {
                new FolderSuggest(this.app, cb.inputEl);
                cb.setPlaceholder(this.folder.folder)
                    .setValue(this.folder.folder)
                    .onChange((new_folder) => {
                        // Trim folder and Strip ending slash if there
                        new_folder = new_folder.trim()
                        new_folder = new_folder.replace(/\/$/, "");

                        this.checkFolderCanBeAdded(new_folder,cb,this.folder.folder);
						this.settingsTab.display();
                    });
                // @ts-ignore
                cb.containerEl.addClass("templater_search");
            });
    }

    createSubfolderConditions():void{
        const {contentEl} = this;
		new Setting(contentEl).setName("Subfolders")
            .setDesc("Does this folder have subfolders?")
            .addToggle( (cb) => cb.onChange(async (value)=>{
                // this.folder.haveSubFolders = value;
                subFoldArrange.settingEl.classList.toggle(hideCssName);
                await this.plugin.saveSettings();}
            )
	    )
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

    // createDraftConditions():void{
    //     const {contentEl} = this;
    //     new Setting(contentEl).setName("Drafts")
    //         .setDesc("Will you be using drafts in your situation?")
    //         .addToggle( (cb) => cb.setValue(this.folder.haveDrafts)
    //         .onChange(async (value)=>{
    //             this.folder.haveDrafts = value;
    //             draftConditionsTab.settingEl.classList.toggle(hideCssName);
    //             await this.plugin.saveSettings();}
    //         )
    //     )
    //     let draftConditionsTab =new Setting(contentEl).setName("Update draft conditions.").addButton((btn) => {
    //         btn.setButtonText("Update").onClick( () =>{
    //             // Make a modal that talks about the draft settings
    //             console.log(this.folder.draftConditions)
                
    //             new UpdateDraftSettings(this.app,this.folder.draftConditions,this.settingsTab,this.folder.folder.name).open()
    //         } )
    //         btn.setClass(buttonCssClassName)
    //     })
    // }

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
		contentEl.empty();
	}
}
