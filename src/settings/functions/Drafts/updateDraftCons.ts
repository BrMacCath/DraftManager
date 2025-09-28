import { Setting } from "obsidian"
import type draftConditions from "types/choices/draftConditions";
import { DraftTab } from "../../tabs/settingTab";
import { draftOptions } from "types/choices/draftOptions";
import { hideCssName } from "src/cssStylings/cssClassNames";
export function UpdateDraftCons(draftConditions:draftConditions,settingsTab:DraftTab,containerEl:HTMLElement,folder:string){
    new Setting(containerEl).setName(folder + " Draft Conditions").setHeading();
    new Setting(containerEl).setName("Draft Style")
        .setDesc("Choose how you wish Drafts to be made")
        .addDropdown((dropdown) =>{
            for (let i=0; i< draftOptions.length;i++){
                dropdown.addOption(draftOptions[i],draftOptions[i])
            }
            dropdown.setValue(draftConditions.draftStyle.name);
            dropdown.onChange(async (value) =>{
                draftConditions.draftStyle.name = value;
                await settingsTab.plugin.saveSettings();
            })
        })

    
    new Setting(containerEl).setName("New line signifier")
        .setDesc("How to indicate a new line in your draft").addText((cb) =>{
            cb.setValue(draftConditions.rewriteLineSignifier).onChange(async(value)=>{
                draftConditions.rewriteLineSignifier = value;
                await settingsTab.plugin.saveSettings();
            })
        } )


    new Setting(containerEl).setName("Comment lines.")
        .setDesc("Do you wish to have comments in your drafts.").addToggle((cb) =>{
            cb.setValue(draftConditions.haveComments).onChange(async(value)=>{
                draftConditions.haveComments = value;
                commentSetting.settingEl.classList.toggle(hideCssName);
                await settingsTab.plugin.saveSettings();
            })
        } )

    let commentSetting =new Setting(containerEl);
    commentSetting.setName("Comment Signifier")
        .setDesc("How to indicate a comment in your draft").addText((cb) =>{
            cb.setValue(draftConditions.commentSignifier).onChange(async(value)=>{
                draftConditions.commentSignifier = value;
                await settingsTab.plugin.saveSettings();
            })
        } )
    if(!draftConditions.haveComments){
        commentSetting.setClass(hideCssName);
    }
    new Setting(containerEl).setName("Paragraph Separator")
        .setDesc("How do you want paragraphs to be separated in your drafts").addText((cb) =>{
            cb.setValue(draftConditions.paragraphSeparator).onChange(async(value)=>{
                draftConditions.paragraphSeparator= value;
                await settingsTab.plugin.saveSettings();
            })
        } );
    new Setting(containerEl).setName("Unformatted Drafts Location")
        .setDesc("Where will you store the unformatted drafts").addText((cb) =>{
            cb.setValue(draftConditions.draftStorage).onChange(async(value)=>{
                draftConditions.draftStorage = value;
                await settingsTab.plugin.saveSettings();
            })
        } );

    new Setting(containerEl).setName("Draft File Signifier")
        .setDesc("How to indicate a file is a unformatted draft file").addText((cb) =>{
            cb.setValue(draftConditions.draftFileIndicator).onChange(async(value)=>{
                draftConditions.draftFileIndicator = value;
                await settingsTab.plugin.saveSettings();
            })
            
        } )
    new Setting(containerEl).setName("Topic Front Matter.")
        .setDesc("Do you wish to have frontmatter for each topic.").addToggle((cb) =>{
            cb.setValue(draftConditions.haveTopicFrontMatter).onChange(async(value)=>{
                draftConditions.haveTopicFrontMatter = value;
                frontmatterTopicSetting.settingEl.classList.toggle(hideCssName);
                await settingsTab.plugin.saveSettings();
            })
        } )

    let frontmatterTopicSetting =new Setting(containerEl);
    frontmatterTopicSetting.setName("FrontMatter Topic Separator Signifier")
        .setDesc("How do you want to separate the frontmatter of a topic from the paragraph").addText((cb) =>{
            cb.setValue(draftConditions.topicFrontMatterSeparator).onChange(async(value)=>{
                draftConditions.topicFrontMatterSeparator = value;
                await settingsTab.plugin.saveSettings();
            })
            
        } )
    if(!draftConditions.haveTopicFrontMatter){
        frontmatterTopicSetting.setClass(hideCssName);
    }
}
