import { App} from "obsidian";
import { TextInputSuggest } from "./suggest";
import FolderArrangement from "types/choices/folderArrangement";

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
        console.log("Folder")
        abstractFiles.forEach((folder: FolderArrangement) => {
            if (
                folder.folderName.toLowerCase().contains(lowerCaseInputStr)
            ) {
                folders.push(folder);
            }
        });

        return folders.slice(0, 1000);
    }

    renderSuggestion(file: FolderArrangement, el: HTMLElement): void {
        const text = file.folderName.slice(this.sliceLength);
        if (text == ""){
            el.setText("/")
        }else{
        el.setText(text);
    }}

    selectSuggestion(file: FolderArrangement): void {
        // Get the TFile for this
        this.inputEl.value = file.folderName;
        this.inputEl.trigger("input");
        this.close();
    }
}