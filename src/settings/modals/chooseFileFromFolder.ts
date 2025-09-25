import {App, Modal,Setting } from "obsidian"
import type ResearchPluginSettings from "../DraftManagerPluginSettings";
import ResearchPlugin from "src/main";
import { FileFromFolderSuggest } from "../suggesters/fileFromFolderSuggester";
import createDraft from "../functions/Drafts/createDraft";
import type draftConditions from "types/choices/draftConditions";
import { buttonCssClassName, templateSearchCssName } from "src/cssStylings/cssClassNames";
export class chooseFileFromFolder extends Modal{
    settings: ResearchPluginSettings;
    plugin: ResearchPlugin;
    folder: string;
    draftConditions:draftConditions;
    constructor(app: App,settings:ResearchPluginSettings,plugin:ResearchPlugin,folder:string,draftConditions:draftConditions) {
        super(app);
        this.settings=settings;
        this.plugin = plugin;
        this.folder = folder;
        this.draftConditions=draftConditions;
    }
    onOpen(): void {
        const containerEl=this.modalEl;
        containerEl.createEl("h1").setText("Select File from " + this.folder);
        let fileName = "";
        new Setting(containerEl).setName("Select the file")
        .setDesc("Choose which folder you wish to add from your list.")
        .addSearch((cb)=>{
            new FileFromFolderSuggest(this.app, cb.inputEl,this.folder);
                cb.setPlaceholder("Example: folder1/folder2")
                    .setValue("")
                    .onChange((file) => {
                        // Trim folder and Strip ending slash if there
                        file = file.trim()
                        file = file.replace(/\/$/, "");
                        fileName = file;
                    });
                // @ts-ignore
                cb.containerEl.addClass(templateSearchCssName);
        }).addButton((btn)=>{
            btn.setButtonText("Folder Button").onClick(() =>{
                createDraft(fileName,this.draftConditions,this.app);
                const leaf =this.app.workspace.getLeaf(false);
                const tFileLeaf = this.app.vault.getFileByPath(fileName)
                if( tFileLeaf == null ){

                }
                else{
                    leaf.openFile(tFileLeaf);
                    this.close();
                }
            }  )
            btn.setClass(buttonCssClassName);
        })
    }

    onClose() {
        const {contentEl} = this;
        contentEl.empty();
    }

}