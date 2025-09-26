import { Setting } from "obsidian";
import { buttonCssClassName, deleteCssName } from "src/cssStylings/cssClassNames";
import type ResearchPlugin from "src/main";
import { checkVaultCanBeAdded } from "./checkVaultCanBeAdded";

export function createVaultTab(html:HTMLElement,  plugin: ResearchPlugin){
    html.createEl("h2").setText("Vault Transfer Management");
    new Setting(html).setName("Vaults that we can transfer files to").setHeading();
    plugin.settings.vaultList.forEach( (vault) =>{
        new Setting(html).setName(vault).addButton( (btn)=> {
        // Create a folder modal that allows you to edit it.
        btn.setButtonText("Delete Vault").onClick(() => {
            // Delete vault action
        });
        btn.setClass(deleteCssName);
    })

    } )
    let vaultName = ""
    new Setting(html).setName("Add a folder template")
    .setDesc("Choose which folder you wish to add")
    .addSearch((cb)=>{
        cb.setPlaceholder(vaultName)
            .setValue("")
            .onChange((vaultChange) => {
                // Trim folder and Strip ending slash if there
                vaultChange = vaultChange.trim()
                vaultChange = vaultChange.replace(/\/$/, "");
                vaultName = vaultChange;
                this.plugin.saveSettings();
            });
        // @ts-ignore
        cb.containerEl.addClass(templateSearchCssName);
    }).addButton((btn)=>{
        btn.setButtonText("Add Vault").onClick(() =>{
            checkVaultCanBeAdded(vaultName)
        }  )
        btn.setClass(buttonCssClassName);
    })
this.checkFolderCanBeAdded
    
}