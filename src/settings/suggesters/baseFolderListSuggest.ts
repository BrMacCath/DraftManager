import { App} from "obsidian";
import { TextInputSuggest } from "./suggest";
import type { BaseFolderArrangement } from "types/FolderTypes/BaseFolderArrangement";

export class baseFolderListSuggest extends TextInputSuggest<BaseFolderArrangement> {
    sliceLength:number;
    folderList: BaseFolderArrangement[];
    constructor(app: App, inputEl: HTMLInputElement | HTMLTextAreaElement,folderList:BaseFolderArrangement[]) {
        super(app, inputEl);
        this.folderList = folderList;
    }

    getSuggestions(inputStr: string): BaseFolderArrangement[] {
        const abstractFiles = this.folderList;
        //this.app.vault.getFolderByPath
        const folders: BaseFolderArrangement[] = [];
        const lowerCaseInputStr = inputStr.toLowerCase();
        abstractFiles.forEach((folder: BaseFolderArrangement) => {
            if (
                folder.folder.name.toLowerCase().contains(lowerCaseInputStr)
            ) {
                folders.push(folder);
            }
        });

        return folders.slice(0, 1000);
    }

    renderSuggestion(folder: BaseFolderArrangement, el: HTMLElement): void {
        const text = folder.folder.name.slice(this.sliceLength);
        if (text == ""){
            el.setText("/")
        }else{
        el.setText(text);
    }}

    selectSuggestion(folder: BaseFolderArrangement): void {
        // Get the TFile for this
        this.inputEl.value = folder.folder.name;
        this.inputEl.trigger("input");
        this.close();
    }
}