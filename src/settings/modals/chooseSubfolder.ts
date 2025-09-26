import {App, Modal,Setting } from "obsidian"
import type ResearchPluginSettings from "../DraftManagerPluginSettings";

import { SubFolderSuggest } from "../suggesters/subFolderSuggester";
import { chooseFileFromFolder } from "./chooseFileFromFolder";
import type draftConditions from "types/choices/draftConditions";
import { buttonCssClassName, templateSearchCssName } from "src/cssStylings/cssClassNames";
import type DraftManagerPlugin from "src/main";
import type DraftManagerSettings from "../DraftManagerPluginSettings";
export class chooseSubFolder extends Modal{
    settings: DraftManagerSettings;
    plugin: DraftManagerPlugin;
    folder: string;
    draftConditions:draftConditions
    constructor(app: App,settings:DraftManagerSettings,plugin:DraftManagerPlugin,folder:string,draftConditions:draftConditions) {
        super(app);
        this.settings=settings;
        this.plugin = plugin;
        this.folder = folder;
        this.draftConditions= draftConditions;
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
                cb.containerEl.addClass(templateSearchCssName);
        }).addButton((btn)=>{
            btn.setButtonText("Folder Button").onClick(() =>{
                // This will need to be figured out later.
                new chooseFileFromFolder(this.app,this.settings,this.plugin,folderTextName,this.draftConditions).open()
                this.close()
            }  )
            btn.setClass(buttonCssClassName);
        })
    }

    onClose() {
        const {contentEl} = this;
        contentEl.empty();
    }

}