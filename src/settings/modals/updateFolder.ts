import type FolderArrangement from "types/FolderTypes/folderArrangement";
import { DraftTab } from "../tabs/settingTab";
import { Modal,App,Setting,Notice,SearchComponent,  TFolder } from "obsidian";
import { UpdateSubFolder } from "./updateSubfolder";
import { buttonCssClassName,  deleteCssName } from "types/cssStylings/cssClassNames";
import type DraftManagerPlugin from "src/main";
import { fillOutFolderStructure } from "../functions/Folder/fillOutFolderStructure";
import { settingsStore } from "types/zustand/store";
import { moveFolderArrangementToVault } from "src/MoveConditions/moveFolderArrangementToVault";
import type { BaseFolderArrangement } from "types/FolderTypes/BaseFolderArrangement";
import { v4 } from "uuid";

export class UpdateFolder extends Modal {
	plugin: DraftManagerPlugin;
	folder: BaseFolderArrangement;
	settingsTab: DraftTab;
	constructor(app: App,plugin: DraftManagerPlugin,folder:BaseFolderArrangement,settingsTab:DraftTab) {
		super(app);
		this.plugin = plugin;
		this.folder = folder;
		this.settingsTab =settingsTab;
	}

	onOpen() {
        this.createSubfolderConditions()
		this.createMoveVaultConditions()
		this.createApplyFolderConditions()
        this.createDeleteFolderButton()
	}

    createSubfolderConditions():void{
        const {contentEl} = this;
		new Setting(contentEl).setName("" +this.folder.displayName + " conditions").setHeading();
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


	createMoveVaultConditions():void{
		
		const vaultList = this.plugin.settings.vaultList;
		if (vaultList.length==0){
			return;
		}
		const {contentEl} = this;
		let vaultChosen = vaultList[0];
		new Setting(contentEl).setName("Move to another Vault")
		.setDesc("Select from the dropdown")
		.addDropdown(
			(dropdown)=>{
				for (let i=0; i< vaultList.length;i++){
					dropdown.addOption(vaultList[i],vaultList[i])
				}
				dropdown.setValue(vaultChosen)
				dropdown.onChange((value)=>{
					vaultChosen = value;
				})
			}
		).addButton((btn)=>{
			btn.setButtonText("Move files to vault")
			btn.onClick(() =>{
				// FolderArrangement and vault
				moveFolderArrangementToVault(this.folder.folder,vaultChosen,this.plugin.app,this.folder.basePath)
			} )
		})

	}


    checkFolderCanBeAdded(new_folder:string,cb:SearchComponent,oldName:string):void{
        const foldName = this.app.vault.getFolderByPath(new_folder);
        if( !(foldName instanceof TFolder) ){
			new Notice("Folder abstract file not found")
            return;
        }
		
        const folder= fillOutFolderStructure(foldName,this.plugin.settings.defaultFolderConditions);
		const baseFolder:BaseFolderArrangement= {folder:folder,id:v4(),displayName:foldName.name,basePath:foldName.path}
		settingsStore.setState({folders:[...settingsStore.getState().folders,baseFolder]})
		this.settingsTab.display();
	}

	createApplyFolderConditions():void{
		const {contentEl} = this;
		new Setting(contentEl).setName("Apply folder conditions.")
		.setDesc("Apply draft conditions.")
		.addButton((cb) =>{
			cb.setButtonText("Apply").onClick( () =>{
				//this.plugin.settings.folders = this.plugin.settings.folders.filter(fold => fold.id != this.folder.id)
				const folderList = settingsStore.getState().folders.filter(fold => fold.id != this.folder.id)
				settingsStore.setState({folders:folderList})
				this.settingsTab.display();
				this.close()
			} ) 
            
	} )
	}

	createDeleteFolderButton():void{
        const {contentEl} = this;
        new Setting(contentEl).setName("Delete Folder?")
		.setDesc("Do you wish to delete this folder?")
		.addButton((cb) =>{
			cb.setButtonText("Delete").onClick( () =>{
				//this.plugin.settings.folders = this.plugin.settings.folders.filter(fold => fold.id != this.folder.id)
				const folderList = settingsStore.getState().folders.filter(fold => fold.id != this.folder.id)
				settingsStore.setState({folders:folderList})
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
