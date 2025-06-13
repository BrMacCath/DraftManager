import {App, Modal,Setting } from "obsidian"
import ResearchPluginSettings from "../researchPluginSettings";
import ResearchPlugin from "src/main";
import { SubFolderSuggest } from "../suggesters/subFolderSuggester";
import { createDraftInFolder } from "./createDraftInFolder";
import { chooseFileFromFolder } from "./chooseFileFromFolder";
export class chooseSubFolder extends Modal{
    settings: ResearchPluginSettings;
    plugin: ResearchPlugin;
    folder: string;
    constructor(app: App,settings:ResearchPluginSettings,plugin:ResearchPlugin,folder:string) {
        super(app);
        this.settings=settings;
        this.plugin = plugin;
        this.folder = folder;
    }
    onOpen(): void {
        const containerEl=this.modalEl;
        containerEl.createEl("h1").setText("Select Folder from " + this.folder);
        let folderTextName = "";
        new Setting(containerEl).setName("Select your folder")
        .setDesc("Choose which folder you wish to add from your list.")
        .addSearch((cb)=>{
            new SubFolderSuggest(this.app, cb.inputEl,this.folder);
                cb.setPlaceholder("Example: folder1/folder2")
                    .setValue("")
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
                // This will need to be figured out later.
                new chooseFileFromFolder(this.app,this.settings,this.plugin,folderTextName).open()
                this.close()
            }  )
            btn.setClass("rp-button");
        })
    }

    onClose() {
        const {contentEl} = this;
        contentEl.empty();
    }

}