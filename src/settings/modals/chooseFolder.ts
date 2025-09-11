import {App, Modal,Setting } from "obsidian"
import { folderListSuggest } from "../suggesters/folderListSuggest";
import type ResearchPluginSettings from "../DraftManagerPluginSettings";
import ResearchPlugin from "src/main";
import { chooseSubFolder } from "./chooseSubfolder";
import type draftConditions from "types/choices/draftConditions";
export class chooseFolder extends Modal{
    settings: ResearchPluginSettings;
    plugin: ResearchPlugin
    constructor(app: App,settings:ResearchPluginSettings,plugin:ResearchPlugin) {
        super(app);
        this.settings=settings;
        this.plugin = plugin;
    }
    onOpen(): void {
        const containerEl=this.modalEl;
        containerEl.createEl("h1").setText("Select Folder" );
        let folderTextName = this.settings.folders[0].folderName;
        new Setting(containerEl).setName("Select your folder")
        .setDesc("Choose which folder you wish to add from your list.")
        .addSearch((cb)=>{
            new folderListSuggest(this.app, cb.inputEl,this.settings.folders);
                cb.setPlaceholder("Example: folder1/folder2")
                    .setValue(this.settings.folders[0].folderName)
                    .onChange((new_folder) => {
                        // Trim folder and Strip ending slash if there
                        new_folder = new_folder.trim()
                        new_folder = new_folder.replace(/\/$/, "");
                        folderTextName = new_folder;
                    });
                // @ts-ignore
                cb.containerEl.addClass("templater_search");
        }).addButton((btn)=>{
            btn.setButtonText("Folder Button").onClick(() =>{
                let folderDraftConditions:draftConditions = this.settings.folders[0].draftConditions;
                for (let i =0; i < this.settings.folders.length;i++){
                    if(this.settings.folders[i].folderName == folderTextName){
                        folderDraftConditions = this.settings.folders[i].draftConditions;
                    }
                }
                new chooseSubFolder(this.app,this.settings,this.plugin,folderTextName,folderDraftConditions).open()
                this.close()
            }  )
            btn.setClass("dm-button");
        })
    }
    onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}

}