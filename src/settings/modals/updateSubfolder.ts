import { App, Modal} from "obsidian";
import { DraftTab } from "../tabs/settingTab";
import SvelteImportStuff from "../svelteTest/svelteImportStuff.svelte";
import { mount,unmount } from "svelte";
import type DraftManagerPlugin from "src/main";
import type FolderArrangement from "types/FolderTypes/folderArrangement";
import FolderManagement2 from "../svelteTest/FolderManagement2.svelte";


export class UpdateSubFolder extends Modal {
    plugin: DraftManagerPlugin;
    svelteTest:ReturnType<typeof FolderManagement2> | undefined;
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
        this.svelteTest = mount(FolderManagement2, { target:this.contentEl }  )

    }

    onClose() {
		if(this.svelteTest){
            unmount(this.svelteTest);
        }
        const {contentEl} = this;
        
		contentEl.empty();
	}
}