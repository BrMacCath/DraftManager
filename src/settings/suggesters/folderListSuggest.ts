import { App} from "obsidian";
import { TextInputSuggest } from "./suggest";
import type FolderArrangement from "types/FolderTypes/folderArrangement";

export class folderListSuggest extends TextInputSuggest<FolderArrangement> {
    sliceLength:number;
    folderList: FolderArrangement[];
    constructor(app: App, inputEl: HTMLInputElement | HTMLTextAreaElement,folderList:FolderArrangement[]) {
        super(app, inputEl);
        this.folderList = folderList;
    }

    getSuggestions(inputStr: string): FolderArrangement[] {
        const abstractFiles = this.folderList;
        //this.app.vault.getFolderByPath
        const folders: FolderArrangement[] = [];
        const lowerCaseInputStr = inputStr.toLowerCase();
        abstractFiles.forEach((folder: FolderArrangement) => {
            if (
                folder.folder.toLowerCase().contains(lowerCaseInputStr)
            ) {
                folders.push(folder);
            }
        });

        return folders.slice(0, 1000);
    }

    renderSuggestion(folder: FolderArrangement, el: HTMLElement): void {
        const text = folder.folder.slice(this.sliceLength);
        if (text == ""){
            el.setText("/")
        }else{
        el.setText(text);
    }}

    selectSuggestion(folder: FolderArrangement): void {
        // Get the TFile for this
        this.inputEl.value = folder.folder;
        this.inputEl.trigger("input");
        this.close();
    }
}