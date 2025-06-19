import {App, Modal,Setting } from "obsidian"
import ResearchPluginSettings from "../researchPluginSettings";
import ResearchPlugin from "src/main";
import { FileFromFolderSuggest } from "../suggesters/fileFromFolderSuggester";
import createDraft from "../functions/createDraft";
export class chooseFileFromFolder extends Modal{
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
        containerEl.createEl("h1").setText("Select File from " + this.folder);
        let fileName = "";
        new Setting(containerEl).setName("Select the file")
        .setDesc("Choose which folder you wish to add from your list.")
        .addSearch((cb)=>{
            new FileFromFolderSuggest(this.app, cb.inputEl,this.folder);
                cb.setPlaceholder("Example: folder1/folder2")
                    .setValue("")
                    .onChange((file) => {
                        // Trim folder and Strip ending slash if there
                        file = file.trim()
                        file = file.replace(/\/$/, "");
                        fileName = file;
                    });
                // @ts-ignore
                cb.containerEl.addClass("templater_search");
        }).addButton((btn)=>{
            btn.setButtonText("Folder Button").onClick(() =>{
                createDraft(fileName,"","")
            }  )
            btn.setClass("rp-button");
        })
    }

    onClose() {
        const {contentEl} = this;
        contentEl.empty();
    }

}