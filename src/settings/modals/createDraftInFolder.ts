import {App, Modal,Setting } from "obsidian"
import createDraft from "../functions/Drafts/createDraft";
import type draftConditions from "types/choices/draftConditions";
import { buttonCssClassName } from "types/cssStylings/cssClassNames";
import type DraftManagerSettings from "../DraftManagerPluginSettings";
import type DraftManagerPlugin from "src/main";
export class createDraftInFolder extends Modal{
    settings: DraftManagerSettings;
    plugin: DraftManagerPlugin;
    folder: string;
    draftConditions:draftConditions;
    constructor(app: App,settings:DraftManagerSettings,plugin:DraftManagerPlugin,folder:string,draftConditions:draftConditions) {
        super(app);
        this.settings=settings;
        this.plugin = plugin;
        this.folder = folder;
        this.draftConditions=draftConditions;
    }
    onOpen(): void {
        const containerEl=this.modalEl;
        new Setting(containerEl).setName("Select File from " + this.folder).setHeading();
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
            btn.setClass(buttonCssClassName);
        })
    }

    onClose() {
        const {contentEl} = this;
        contentEl.empty();
    }

}