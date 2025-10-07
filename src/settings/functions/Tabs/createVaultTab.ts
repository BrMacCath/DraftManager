import { Setting } from "obsidian";
import { buttonCssClassName, deleteCssName } from "types/cssStylings/cssClassNames";
import type DraftManagerPlugin from "src/main";
import { checkVaultCanBeAdded } from "./checkVaultCanBeAdded";
import type { DraftTab } from "src/settings/tabs/settingTab";

export function createVaultTab(html:HTMLElement,  plugin: DraftManagerPlugin,settingTab:DraftTab){
    html.createEl("h2").setText("Vault Transfer Management");
    new Setting(html).setName("Vaults that we can transfer files to").setHeading();
    plugin.settings.vaultList.forEach( (vault) =>{
        new Setting(html).setName(vault).addButton( (btn)=> {
        // Create a folder modal that allows you to edit it.
        btn.setButtonText("Delete Vault").onClick(async () => {
            // Delete vault action
            plugin.settings.vaultList =plugin.settings.vaultList.filter((name)=>{
                return name != vault;
            } )
            await plugin.saveSettings();
            await settingTab.display();
        });
        btn.setClass(deleteCssName);
    })
    } )
    let vaultName = ""
    new Setting(html).setName("Add a vault")
    .setDesc("Type which vault you wish to add:")
    .addText((cb)=>{
        cb.setPlaceholder(vaultName)
            .setValue("")
            .onChange( (vaultChange) => {
                // Trim folder and Strip ending slash if there
                vaultChange = vaultChange.trim()
                vaultChange = vaultChange.replace(/\/$/, "");
                vaultName = vaultChange;
            });
       
        
    }).addButton((btn)=>{
        btn.setButtonText("Add Vault").onClick(async () =>{
            await checkVaultCanBeAdded(vaultName,plugin.settings,plugin);
            await settingTab.display();
        }  )
        btn.setClass(buttonCssClassName);
    })

    
}