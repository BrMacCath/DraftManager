import { Modal,App } from "obsidian";
import draftConditions from "types/choices/draftConditions";
import { DraftTab } from "../tabs/settingTab";
import { UpdateDraftCons } from "../functions/updateDraftCons";
export class UpdateDraftSettings extends Modal{
    draftConditions:draftConditions;
    settings: DraftTab;
    folderName:string;
    constructor(app: App,draftConditions:draftConditions,settings:DraftTab,folderName: string) {
            super(app);
            this.draftConditions = draftConditions;
            this.settings=settings;
            this.folderName= folderName;
        }
    onOpen() {
		UpdateDraftCons(this.draftConditions,this.settings,this.modalEl,this.folderName + " ")
    }

    onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}