import { Notice } from "obsidian";
import type DraftManagerSettings from "src/settings/DraftManagerPluginSettings";

export function checkVaultCanBeAdded(vaultName:string,vaultSettings:DraftManagerSettings){
    // Chech Vault is not already on the list
    let newVault= true;
    vaultSettings.vaultList.forEach((vault) =>{
        if(vault == vaultName){
            newVault = false;
        }
    })
    if(!newVault){
        new Notice("This vault is already added.");
    }
    // Check the vault exists
    

}