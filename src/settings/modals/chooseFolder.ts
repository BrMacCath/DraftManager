import {App, Modal,Setting } from "obsidian"
import { FolderSuggest } from "../suggesters/folderSuggester";
import ResearchPlugin from "src/main";
export class chooseFolder extends Modal{
    settings: ResearchPlugin;
    constructor(app: App,settings:ResearchPlugin) {
        super(app);
        this.settings=settings;
    }
    onOpen(): void {
        const containerEl=this.modalEl;
        containerEl.createEl("h1").setText("Select Folder ");
        let folderTextName = "";
        new Setting(containerEl).setName("Select your folder")
        .setDesc("Choose which folder you wish to add from your list.")
        .addSearch((cb)=>{
            new FolderSuggest(this.app, cb.inputEl);
                cb.setPlaceholder("Example: folder1/folder2")
                    .setValue("")
                    .onChange((new_folder) => {
                        // Trim folder and Strip ending slash if there
                        new_folder = new_folder.trim()
                        new_folder = new_folder.replace(/\/$/, "");
                        folderTextName = new_folder;
                        this.settings.saveSettings();
                    });
                // @ts-ignore
                cb.containerEl.addClass("templater_search");
        }).addButton((btn)=>{
            btn.setButtonText("Folder Button").onClick(() =>{
                // This will need to be figured out later.
            }  )
            btn.setClass("rp-button");
        })
    }


    onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}

}