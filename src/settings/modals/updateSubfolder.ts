import { App, Modal, Setting } from "obsidian";
import ResearchPlugin from "src/main";
import { DraftTab } from "../tabs/settingTab";
import subFolderArrangement from "types/choices/subFolderArrangement";
import { SubFolderSuggest } from "../suggesters/subFolderSuggester";

export class UpdateSubFolder extends Modal {
    plugin: ResearchPlugin;
    settingsTab:DraftTab;
    subFolder:subFolderArrangement;
    folderName:string;
    constructor(app: App,plugin: ResearchPlugin,subFolder:subFolderArrangement,folderName:string,settingsTab:DraftTab) {
            super(app);
            this.plugin = plugin;
            this.subFolder = subFolder;
            this.folderName=folderName;
            this.settingsTab=settingsTab;
    }

    onOpen(): void {
        const {contentEl} = this;
        contentEl.createEl("h1").setText("SubFolder Settings");
        new Setting(contentEl)
            .setName("Folder")
            .setDesc("This is where the code will be applied to.")
            .addSearch((cb) => {
                new SubFolderSuggest(this.app, cb.inputEl, this.folderName);
                cb.setPlaceholder("")
                    .onChange((new_folder) => {
                        // Trim folder and Strip ending slash if there
                        new_folder = new_folder.trim()
                        new_folder = new_folder.replace(/\/$/, "");
                        this.plugin.saveSettings();
                        this.settingsTab.display();
                    });
                // @ts-ignore
                cb.containerEl.addClass("templater_search");
        });
    }

    onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}