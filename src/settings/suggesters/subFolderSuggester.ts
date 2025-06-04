// Credits go to Liam's Periodic Notes Plugin: https://github.com/liamcain/obsidian-periodic-notes

import { App, TAbstractFile, TFolder } from "obsidian";
import { TextInputSuggest } from "./suggest";

export class SubFolderSuggest extends TextInputSuggest<TFolder> {
    folder:string;
    constructor(app: App, inputEl: HTMLInputElement | HTMLTextAreaElement,folder:string) {
        super(app, inputEl);
        this.folder = folder.toLowerCase();
    }

    getSuggestions(inputStr: string): TFolder[] {
        const abstractFiles = this.app.vault.getAllLoadedFiles().filter( (folder: TAbstractFile) =>{
            return folder.path.toLowerCase().contains(this.folder )
        }  );
        //this.app.vault.getFolderByPath
        const folders: TFolder[] = [];
        const lowerCaseInputStr = inputStr.toLowerCase();

        abstractFiles.forEach((folder: TAbstractFile) => {
            if (
                folder instanceof TFolder &&
                folder.path.toLowerCase().contains(lowerCaseInputStr)
            ) {
                folders.push(folder);
            }
        });

        return folders.slice(0, 1000);
    }

    renderSuggestion(file: TFolder, el: HTMLElement): void {
        const text = file.path.slice(this.folder.length + 1);
        if (text == ""){
            el.setText("/")
        }else{
        el.setText(file.path.slice(this.folder.length+1));
    }}

    selectSuggestion(file: TFolder): void {
        this.inputEl.value = file.path;
        this.inputEl.trigger("input");
        this.close();
    }
}