import { Modal,App, Setting } from "obsidian";
import draftConditions from "types/choices/draftConditions";
import { DraftTab } from "../tabs/settingTab";
import { draftOptions } from "types/choices/draftOptions";
export class UpdateDraftSettings extends Modal{
    draftConditions:draftConditions;
    settings: DraftTab;
    constructor(app: App,draftConditions:draftConditions,settings:DraftTab) {
            super(app);
            this.draftConditions = draftConditions;
            this.settings=settings;
        }
    onOpen() {
		const {contentEl} = this;
        contentEl.createEl("h1").setText("Draft Settings")
        new Setting(contentEl).setName("Draft Style")
        .setDesc("Choose how you wihs Drafts to be made")
        .addDropdown((dropdown) =>{
            for (let i=0; i< draftOptions.length;i++){
                dropdown.addOption(draftOptions[i],draftOptions[i])
            }
            dropdown.setValue(this.draftConditions.draftStyle.name);
            dropdown.onChange(async (value) =>{
                this.draftConditions.draftStyle.name = value;
                await this.settings.plugin.saveSettings();
            })
        })

        new Setting(contentEl).setName("New line signifier")
        .setDesc("How to indicate a new line in your draft").addText((cb) =>{
            cb.setValue(this.draftConditions.rewriteLineNotifier).onChange(async(value)=>{
                this.draftConditions.rewriteLineNotifier = value;
                await this.settings.plugin.saveSettings();
            })
        } )

        new Setting(contentEl).setName("Comment lines.")
        .setDesc("Do you wish to have comments in your drafts.").addToggle((cb) =>{
            cb.setValue(this.draftConditions.haveComments).onChange(async(value)=>{
                this.draftConditions.haveComments = value;
                commentSetting.settingEl.classList.toggle("rp-hidden");
                await this.settings.plugin.saveSettings();
            })
        } )

        let commentSetting =new Setting(contentEl);
        commentSetting.setName("Comment Signifier")
        .setDesc("How to indicate a comment in your draft").addText((cb) =>{
            cb.setValue(this.draftConditions.commentNotifier).onChange(async(value)=>{
                this.draftConditions.commentNotifier = value;
                await this.settings.plugin.saveSettings();
                
            })
            
        } )
        if(!this.draftConditions.haveComments){
            commentSetting.setClass("rp-hidden");
        }
    }

    onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}