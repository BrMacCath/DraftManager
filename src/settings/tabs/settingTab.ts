import { PluginSettingTab,App,Setting, Notice } from "obsidian";
import { FolderSuggest } from "../suggesters/folderSuggester";
import { v4 } from "uuid";
import { UpdateFolder } from "../modals/updateFolder";
import { UpdateDraftCons } from "../functions/Drafts/updateDraftCons";
import type draftConditions from "types/choices/draftConditions";
import { createVaultTab } from "../functions/Tabs/createVaultTab";
import { buttonCssClassName, templateSearchCssName } from "src/cssStylings/cssClassNames";
import { sortFolderOrder } from "../functions/Folder/sortFolderOrder";
import type DraftManagerPlugin from "src/main";
export class DraftTab extends PluginSettingTab {
	plugin: DraftManagerPlugin;

	constructor(app: App, plugin: DraftManagerPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
		sortFolderOrder(this.plugin);
		containerEl.empty();
		containerEl.createEl("h1").setText("Plugin Settings")
		new Setting(containerEl).setName("Choose which folders.").setHeading();
		//this.add_template_folder_setting();
		this.plugin.settings.folders.forEach( (folder) => {
			new Setting(containerEl).setName(folder.folderName).addButton( (btn)=> {
				// Create a folder modal that allows you to edit it.
				btn.setButtonText("Update Folder").onClick(() => {
					new UpdateFolder(this.app,this.plugin,folder,this).open()
				});
                btn.setClass(buttonCssClassName);
			})
		} )
		let folderTextName = "";
		new Setting(containerEl).setName("Add a folder template")
		.setDesc("Choose which folder you wish to add")
		.addSearch((cb)=>{
			new FolderSuggest(this.app, cb.inputEl);
                cb.setPlaceholder("Example: folder1/folder2")
                    .setValue("")
                    .onChange((new_folder) => {
                        // Trim folder and Strip ending slash if there
                        new_folder = new_folder.trim()
                        new_folder = new_folder.replace(/\/$/, "");
						folderTextName = new_folder;
                        this.plugin.saveSettings();
                    });
                // @ts-ignore
                cb.containerEl.addClass(templateSearchCssName);
		}).addButton((btn)=>{
			btn.setButtonText("Folder Button").onClick(() =>{
				this.checkFolderCanBeAdded(folderTextName)
			}  )
            btn.setClass(buttonCssClassName);
		})
		UpdateDraftCons(this.plugin.settings.defaultFolder, this,containerEl,"Default");
		//new VaultTab(containerEl,this.plugin);
		createVaultTab(containerEl,this.plugin)
	}

	checkFolderCanBeAdded(new_folder:string):void{
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

	sortFolderOrder():void{
		this.plugin.settings.folders.sort( (a,b) => a.folderName.localeCompare(b.folderName));
		this.plugin.saveSettings()
	}
}
