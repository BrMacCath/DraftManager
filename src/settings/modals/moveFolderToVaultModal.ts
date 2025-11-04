import type DraftManagerPlugin from "src/main";
import type DraftManagerSettings from "../DraftManagerPluginSettings";
import { Modal, Notice, Setting, TFolder, type App } from "obsidian";
import { buttonCssClassName, centerHeadingCssName, templateSearchCssName } from "types/cssStylings/cssClassNames";
import { FolderSuggest } from "../suggesters/folderSuggester";
import { moveFolderToVault } from "../functions/URI/moveFolderToVault";


export class moveFolderToVaultModal extends Modal{
    settings:DraftManagerSettings;
    plugin: DraftManagerPlugin;
    constructor(app: App,settings:DraftManagerSettings,plugin: DraftManagerPlugin) {
            super(app);
            this.settings = settings;
            this.plugin = plugin;
        }
    onOpen() {
        const containerEl = this.modalEl;
        new Setting(containerEl).setName("Move Folder to New Vault").setHeading();
        
        let folderTextName ="";
        new Setting(containerEl).setName("Select your folder")
            .setDesc("Which folder do you wish to move?")
            .addSearch((cb)=>{
                new FolderSuggest(this.app, cb.inputEl);
                cb.setPlaceholder("Example: folder1/folder2")
                    .setValue("")
                    .onChange((new_folder) => {
                        // Trim folder and Strip ending slash if there
                        new_folder = new_folder.trim()
                        new_folder = new_folder.replace(/\/$/, "");
                        folderTextName = new_folder;
                    });
                // @ts-ignore
                cb.containerEl.addClass(templateSearchCssName);
            })
        let vaultSelected = "";
        new Setting(containerEl).setName("Choose Vault")
            .setDesc("Selet the vault to add the files to.")
            .addDropdown((dropdown) =>{
                for (let i=0; i< this.settings.vaultList.length;i++){
                    dropdown.addOption(this.settings.vaultList[i],this.settings.vaultList[i])
                }
                dropdown.setValue("");
                dropdown.onChange(async (value) =>{
                    vaultSelected = value;
                    await this.plugin.saveSettings();
                })
            })
        new Setting(containerEl).addButton((btn)=>{
            btn.setButtonText("Move Folder")
            btn.onClick(() =>{
                const tFold:TFolder|null =  this.app.vault.getFolderByPath(folderTextName);
                if(tFold instanceof TFolder){
                    moveFolderToVault(tFold,vaultSelected,this.app);
                }
                else{
                    new Notice("Folder not found");
                }
            })
            btn.setClass(buttonCssClassName)
            
            
        })
    }

    onClose() {
        const {contentEl} = this;
        contentEl.empty();
    }
}