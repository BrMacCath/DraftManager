import { Setting } from "obsidian";
import { buttonCssClassName, deleteCssName } from "src/cssStylings/cssClassNames";
import type DraftManagerPlugin from "src/main";
import { checkVaultCanBeAdded } from "./checkVaultCanBeAdded";

export function createVaultTab(html:HTMLElement,  plugin: DraftManagerPlugin){
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
        }  )
        btn.setClass(buttonCssClassName);
    })

    
}