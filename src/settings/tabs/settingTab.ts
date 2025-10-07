import { PluginSettingTab,App,Setting, Notice, TFolder } from "obsidian";
import { FolderSuggest } from "../suggesters/folderSuggester";
import { UpdateFolder } from "../modals/updateFolder";
import { UpdateDraftCons } from "../functions/Drafts/updateDraftCons";
import { createVaultTab } from "../functions/Tabs/createVaultTab";
import { buttonCssClassName, templateSearchCssName } from "types/cssStylings/cssClassNames";
import { sortFolderOrder } from "../functions/Folder/sortFolderOrder";
import type DraftManagerPlugin from "src/main";
import { fillOutFolderStructure } from "../functions/Folder/fillOutFolderStructure";
import type FolderArrangement from "types/FolderTypes/folderArrangement";
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
		
	
			new Setting(containerEl).setName(folder.folder).addButton( (btn)=> {
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
			btn.setButtonText("Add Folder").onClick(async () =>{
				await this.checkFolderCanBeAdded(folderTextName,this.plugin)
			}  )
            btn.setClass(buttonCssClassName);
		})
		UpdateDraftCons(this.plugin.settings.defaultFolder, this,containerEl,"Default");
		//new VaultTab(containerEl,this.plugin);
		createVaultTab(containerEl,this.plugin,this)
	}

	async checkFolderCanBeAdded(new_folder:string,plugin:DraftManagerPlugin):Promise<void>{
		for(let i = 0; i <plugin.settings.folders.length; i++){
			if (new_folder == plugin.settings.folders[i].folder){
				new Notice("This folder is already on the list");
				return;
			}
		}
		// This is assigning not just the values but the memory too.
		const tfold:TFolder|null = this.app.vault.getFolderByPath(new_folder);
		if( !(tfold instanceof TFolder)){
			return;
		}
		console.log(plugin.settings.folders)
		const foldArrange:FolderArrangement = fillOutFolderStructure(tfold,plugin.settings.defaultFolder)
		console.log(foldArrange)
		console.log(JSON.stringify({
			"a": "test"
		})
		)
		console.log(foldArrange)
		console.log(JSON.stringify(foldArrange))
		console.log(foldArrange.id)
		plugin.settings.folders.push(foldArrange);
		await plugin.saveData(plugin.settings)
		await plugin.saveSettings();
		this.display();
	}

	sortFolderOrder():void{
		this.plugin.settings.folders.sort( (a,b) => a.folder.localeCompare(b.folder));
		this.plugin.saveSettings()
	}
}
