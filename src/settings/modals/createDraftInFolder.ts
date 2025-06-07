import {App, Modal,Setting } from "obsidian"
import ResearchPluginSettings from "../researchPluginSettings";
import ResearchPlugin from "src/main";
import { FileFromFolderSuggest } from "../suggesters/fileFromFolderSuggester";
export class createDraftInFolder extends Modal{
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
        let folderTextName = "";
        new Setting(containerEl).setName("Select your folder")
        .setDesc("Choose which folder you wish to add from your list.")
        .addText((cb) =>{
            cb.onChange((value)=>{
                folderTextName = value
            })
        })
        .addButton((btn)=>{
            btn.setButtonText("Create Draft").onClick(() =>{
                console.log(folderTextName)
            }  )
            btn.setClass("rp-button");
        })
    }

    onClose() {
        const {contentEl} = this;
        contentEl.empty();
    }

}