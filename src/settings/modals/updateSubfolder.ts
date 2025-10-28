import { App, Modal} from "obsidian";
import { DraftTab } from "../tabs/settingTab";
import SvelteImportStuff from "../svelteTest/svelteImportStuff.svelte";
import { mount,unmount } from "svelte";
import type DraftManagerPlugin from "src/main";
import type FolderArrangement from "types/FolderTypes/folderArrangement";


export class UpdateSubFolder extends Modal {
    plugin: DraftManagerPlugin;
    svelteTest:ReturnType<typeof SvelteImportStuff> | undefined;
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
        contentEl.createEl("h1").setText("Update " + this.folderArrangement.folder);
        this.svelteTest = mount(SvelteImportStuff, { target:this.contentEl,props:{tabs:10, folderArrangement:this.folderArrangement} }  )

    }

    onClose() {
		if(this.svelteTest){
            unmount(this.svelteTest);
        }
        const {contentEl} = this;
        
		contentEl.empty();
	}
}