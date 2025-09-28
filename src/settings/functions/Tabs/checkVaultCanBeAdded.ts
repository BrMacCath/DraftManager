import { Notice } from "obsidian";
import type DraftManagerPlugin from "src/main";
import type DraftManagerSettings from "src/settings/DraftManagerPluginSettings";

export async function checkVaultCanBeAdded(vaultName:string,draftManagerSettings:DraftManagerSettings,plugin: DraftManagerPlugin){
    // Check Vault is not already on the list
    let newVault= true;
    draftManagerSettings.vaultList.forEach((vault) =>{
        if(vault == vaultName){
            newVault = false;
        }
    })
    if(!newVault)
    {
        new Notice("This vault is already added.");
        return;
    }
    let vaultExists = true

    // Check Vault Exists

    if(!vaultExists){
        new Notice("This vault does not exist.");
        return;
    }
   
    draftManagerSettings.vaultList.push(vaultName)
    await plugin.saveSettings()
    
    // Check the vault exists
    

}