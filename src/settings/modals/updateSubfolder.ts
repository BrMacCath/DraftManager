import { App, Modal, Setting, TFolder } from "obsidian";
import { DraftTab } from "../tabs/settingTab";
import { SubFolderSuggest } from "../suggesters/subFolderSuggester";
//import {faBars} from "@fortawesome/free-solid-svg-icons";
import SvelteImportStuff from "../svelteTest/svelteImportStuff.svelte";
import { mount,unmount } from "svelte";
import type DraftManagerPlugin from "src/main";
import type FolderArrangement from "types/FolderTypes/folderArrangement";
import SvelteDisplayList from "../svelteTest/svelteDisplayList.svelte";
import AdjustFiles from "../svelteTest/adjustFiles.svelte";

export class UpdateSubFolder extends Modal {
    plugin: DraftManagerPlugin;
    svelteTest:ReturnType<typeof SvelteImportStuff> | undefined;
    svelteTest2:ReturnType<typeof SvelteDisplayList>|undefined;
    svelteTest3:ReturnType<typeof AdjustFiles>|undefined;
    settingsTab:DraftTab;
    folderArrangement:FolderArrangement;
    constructor(app: App,plugin: DraftManagerPlugin,folderArrangement:FolderArrangement,settingsTab:DraftTab) {
            super(app);
            this.plugin = plugin;
            this.folderArrangement=folderArrangement;
            this.settingsTab=settingsTab;
    }

    onOpen(): void {
        const {contentEl} = this;
        contentEl.createEl("h1").setText("SubFolder Settings");
        new Setting(contentEl)
            .setName("Folder")
            .setDesc("This is where the code will be applied to.")
            .addSearch((cb) => {
                new SubFolderSuggest(this.app, cb.inputEl, this.folderArrangement.folder);
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
        
        this.svelteTest = mount(SvelteImportStuff, { target:this.contentEl,props:{tabs:10, folderArrangement:this.folderArrangement} }  )
        this.svelteTest2 = mount(SvelteDisplayList, { target:this.contentEl,props:{} }  )
        this.svelteTest3 = mount(AdjustFiles, { target:this.contentEl,props:{subFiles:this.folderArrangement.subFiles} }  )
    

    }

    onClose() {
		if(this.svelteTest){
            unmount(this.svelteTest);
        }
        const {contentEl} = this;
        
		contentEl.empty();
	}
}