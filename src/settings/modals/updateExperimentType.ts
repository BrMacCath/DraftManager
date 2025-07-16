import { App, Modal, Setting } from "obsidian";
import ResearchPlugin from "src/main";
import { DraftTab } from "../tabs/settingTab";
import type subFolderArrangement from "types/choices/subFolderArrangement";
import { SubFolderSuggest } from "../suggesters/subFolderSuggester";
//import {faBars} from "@fortawesome/free-solid-svg-icons";
import SvelteImportStuff from "../svelteTest/svelteImportStuff.svelte";
import { mount,unmount } from "svelte";
import SvelteExperimentData from "../svelteTest/svelteExperimentData.svelte";
import type ExperimentType from "types/choices/experimentType";

export class UpdateExperiment extends Modal {
    plugin: ResearchPlugin;
    svelteTest:ReturnType<typeof SvelteImportStuff> | undefined;
    experimentSvelteTest:ReturnType<typeof SvelteExperimentData>|undefined;
    settingsTab:DraftTab;
    subFolder:subFolderArrangement;
    folderName:string;
    check: ExperimentType;
    constructor(app: App,plugin: ResearchPlugin,subFolder:subFolderArrangement,folderName:string,settingsTab:DraftTab,check:ExperimentType) {
            super(app);
            this.plugin = plugin;
            this.subFolder = subFolder;
            this.folderName=folderName;
            this.settingsTab=settingsTab;
            this.check = check;
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
        //this.svelteTest = mount(SvelteImportStuff, { target:this.contentEl,props:{tabs:10, folder:fold} }  )
        //this.svelteTest = mount(SvelteImportStuff, { target:this.contentEl,props:{tabs:20} }  )
        this.experimentSvelteTest = mount(SvelteExperimentData,{target:this.contentEl,props:{tabs:10, folder:this.check}})


    }

    onClose() {
		if(this.svelteTest){
            unmount(this.svelteTest);
        }
        const {contentEl} = this;
        
		contentEl.empty();
	}
}