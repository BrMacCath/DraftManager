import { App, Modal} from "obsidian";
import { DraftTab } from "../tabs/settingTab";
import { mount,unmount } from "svelte";
import type DraftManagerPlugin from "src/main";
import type FolderArrangement from "types/FolderTypes/folderArrangement";
import FolderManagement from "../svelteComponents/FolderManagement.svelte";


export class UpdateSubFolder extends Modal {
    plugin: DraftManagerPlugin;
    svelteTest:ReturnType<typeof FolderManagement> | undefined;
    settingsTab:DraftTab;
    folderArrangement:FolderArrangement;
    constructor(app: App,plugin: DraftManagerPlugin,folderArrangement:FolderArrangement,settingsTab:DraftTab) {
            super(app);
            this.plugin = plugin;
            this.folderArrangement=folderArrangement;
            this.settingsTab=settingsTab;
    }

    onOpen(): void {
        const tabIndent = 10;
        const {contentEl} = this;
        this.svelteTest = mount(FolderManagement, { target:this.contentEl,props:{tabs:tabIndent, folderArrangement:this.folderArrangement,contentEl:contentEl} }  )

    }

    onClose() {
		if(this.svelteTest){
            unmount(this.svelteTest);
        }
        const {contentEl} = this;
        
		contentEl.empty();
	}
}