import { PluginSettingTab,App,Setting, Notice } from "obsidian";
import ResearchPlugin from "src/main";
import { FolderSuggest } from "../suggesters/folderSuggester";
import { v4 } from "uuid";
import { UpdateFolder } from "../modals/updateFolder";
import { draftOptions } from "types/choices/draftOptions";
export class DraftTab extends PluginSettingTab {
	plugin: ResearchPlugin;
	constructor(app: App, plugin: ResearchPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}
	

	display(): void {
		const {containerEl} = this;
		containerEl.empty();
		new Setting(containerEl).setName("Plugin Settings")
		.setDesc("Choose which folders.").setHeading();
		//this.add_template_folder_setting();
		this.plugin.settings.folders.forEach( (folder) => {
			new Setting(containerEl).setName(folder.folderName).addButton( (btn)=> {
				// Create a folder modal that allows you to edit it.
				btn.setButtonText("Update Folder").onClick(() => {
					new UpdateFolder(this.app,this.plugin,folder,this).open()
				});
                btn.setClass("rp-button");
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
                cb.containerEl.addClass("templater_search");
		}).addButton((btn)=>{
			btn.setButtonText("Folder Button").onClick(() =>{
				this.checkFolderCanBeAdded(folderTextName)
			}  )
            btn.setClass("rp-button");
		})
		this.createDefaultDraftSettings()
	}

	checkFolderCanBeAdded(new_folder:string):void{
		for(let i = 0; i <this.plugin.settings.folders.length; i++){
			if (new_folder == this.plugin.settings.folders[i].folderName){
				new Notice("This folder is already on the list");
				return;
			}
		}
		this.plugin.settings.folders.push({folderName:new_folder,id:v4(),haveSubFolders:true,haveDrafts:true,bibliography: "",draftConditions:this.plugin.settings.defaultFolder,subFolderArrangement:{excludeFolders:[],folderArrangement:[]}});
		this.plugin.saveSettings();
		this.display();
	}

	createDefaultDraftSettings():void{
		const {containerEl} = this;
		new Setting(containerEl).setName("Default Folder conditions").setHeading();
		new Setting(containerEl).setName("Draft Style")
				.setDesc("Choose how you wish Drafts to be made")
				.addDropdown((dropdown) =>{
					for (let i=0; i< draftOptions.length;i++){
						dropdown.addOption(draftOptions[i],draftOptions[i])
					}
					dropdown.setValue(this.plugin.settings.defaultFolder.draftStyle.name);
					dropdown.onChange(async (value) =>{
						this.plugin.settings.defaultFolder.draftStyle.name = value;
						await this.plugin.saveSettings();
					})
				});
			
        new Setting(containerEl).setName("New line signifier")
        .setDesc("How to indicate a new line in your draft").addText((cb) =>{
            cb.setValue(this.plugin.settings.defaultFolder.rewriteLineNotifier).onChange(async(value)=>{
                this.plugin.settings.defaultFolder.rewriteLineNotifier = value;
                await this.plugin.saveSettings();
            })
        } )

        new Setting(containerEl).setName("Comment lines.")
        .setDesc("Do you wish to have comments in your drafts.").addToggle((cb) =>{
            cb.setValue(this.plugin.settings.defaultFolder.haveComments).onChange(async(value)=>{
                this.plugin.settings.defaultFolder.haveComments = value;
                commentSetting.settingEl.classList.toggle("rp-hidden");
                await this.plugin.saveSettings();
            })
        } )

        let commentSetting =new Setting(containerEl);
        commentSetting.setName("Comment Signifier")
        .setDesc("How to indicate a comment in your draft").addText((cb) =>{
            cb.setValue(this.plugin.settings.defaultFolder.commentNotifier).onChange(async(value)=>{
                this.plugin.settings.defaultFolder.commentNotifier = value;
                await this.plugin.saveSettings();
                
            })
            
        } )
        if(!this.plugin.settings.defaultFolder.haveComments){
            commentSetting.setClass("rp-hidden");
        }
	}
}
