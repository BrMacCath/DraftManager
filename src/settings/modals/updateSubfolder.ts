import { App, Modal, Setting } from "obsidian";
import { DraftTab } from "../tabs/settingTab";
import type subFolderArrangement from "types/choices/subFolderArrangement";
import { SubFolderSuggest } from "../suggesters/subFolderSuggester";
//import {faBars} from "@fortawesome/free-solid-svg-icons";
import SvelteImportStuff from "../svelteTest/svelteImportStuff.svelte";
import { mount,unmount } from "svelte";
import SvelteExperimentData from "../svelteTest/svelteExperimentData.svelte";
import type DraftManagerPlugin from "src/main";

export class UpdateSubFolder extends Modal {
    plugin: DraftManagerPlugin;
    svelteTest:ReturnType<typeof SvelteImportStuff> | undefined;
    experimentSvelteTest:ReturnType<typeof SvelteExperimentData>|undefined;
    settingsTab:DraftTab;
    subFolder:subFolderArrangement;
    folderName:string;
    constructor(app: App,plugin: DraftManagerPlugin,subFolder:subFolderArrangement,folderName:string,settingsTab:DraftTab) {
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
        const fold = this.app.vault.getAbstractFileByPath(this.folderName);
        this.svelteTest = mount(SvelteImportStuff, { target:this.contentEl,props:{tabs:10, folder:fold} }  )
    

    }

    onClose() {
		if(this.svelteTest){
            unmount(this.svelteTest);
        }
        const {contentEl} = this;
        
		contentEl.empty();
	}
}