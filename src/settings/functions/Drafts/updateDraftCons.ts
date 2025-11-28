import { Setting } from "obsidian"
import type draftConditions from "types/choices/draftConditions";
import { DraftTab } from "../../tabs/settingTab";
import { draftStyleOptions } from "types/choices/draftStyleOptions";
import { contentChoices } from "types/choices/contentChoices";
export function UpdateDraftCons(draftConditions:draftConditions,settingsTab:DraftTab,containerEl:HTMLElement,folder:string){
    new Setting(containerEl).setName(folder + " Draft conditions").setHeading();
    new Setting(containerEl).setName("Draft style")
        .setDesc("Choose how you wish drafts to be made")
        .addDropdown((dropdown) =>{
            for (let i=0; i< draftStyleOptions.length;i++){
                dropdown.addOption(draftStyleOptions[i],draftStyleOptions[i])
            }
            dropdown.setValue(draftConditions.draftStyle);
            dropdown.onChange(async (value) =>{
                draftConditions.draftStyle = value;
                await settingsTab.plugin.saveSettings();
            })
        })


    new Setting(containerEl).setName("Extract type")
        .setDesc("How do you wish detail to be extracted from this file")
        .addDropdown((dropdown) =>{
            for (let i=0; i<contentChoices.length;i++){
                dropdown.addOption(contentChoices[i],contentChoices[i])
            }
            dropdown.setValue(draftConditions.extractType
            );
            dropdown.onChange(async (value) =>{
                draftConditions.extractType = value;
                await settingsTab.plugin.saveSettings();
            })
        })

    new Setting(containerEl).setName("Move type")
        .setDesc("What will the default move type be")
        .addDropdown((dropdown) =>{
            for (let i=0; i<contentChoices.length;i++){
                dropdown.addOption(contentChoices[i],contentChoices[i])
            }
            dropdown.setValue(draftConditions.moveType);
            dropdown.onChange(async (value) =>{
                draftConditions.moveType = value;
                await settingsTab.plugin.saveSettings();
            })
        })
}
