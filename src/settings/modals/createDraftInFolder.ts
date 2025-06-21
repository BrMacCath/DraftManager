import {App, Modal,Setting } from "obsidian"
import type ResearchPluginSettings from "../researchPluginSettings";
import ResearchPlugin from "src/main";
import createDraft from "../functions/createDraft";
import type draftConditions from "types/choices/draftConditions";
export class createDraftInFolder extends Modal{
    settings: ResearchPluginSettings;
    plugin: ResearchPlugin;
    folder: string;
    draftConditions:draftConditions;
    constructor(app: App,settings:ResearchPluginSettings,plugin:ResearchPlugin,folder:string,draftConditions:draftConditions) {
        super(app);
        this.settings=settings;
        this.plugin = plugin;
        this.folder = folder;
        this.draftConditions=draftConditions;
    }
    onOpen(): void {
        const containerEl=this.modalEl;
        containerEl.createEl("h1").setText("Select File from " + this.folder);
        let fileTextName = "";
        new Setting(containerEl).setName("Select your folder")
        .setDesc("Choose which folder you wish to add from your list.")
        .addText((cb) =>{
            cb.onChange((value)=>{
                fileTextName = value;
            })
        })
        .addButton((btn)=>{
            btn.setButtonText("Create Draft").onClick(() =>{
                createDraft(this.folder,this.draftConditions,this.app);
            }  )
            btn.setClass("rp-button");
        })
    }

    onClose() {
        const {contentEl} = this;
        contentEl.empty();
    }

}