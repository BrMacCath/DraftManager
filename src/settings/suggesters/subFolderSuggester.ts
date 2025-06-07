// Credits go to Liam's Periodic Notes Plugin: https://github.com/liamcain/obsidian-periodic-notes

import { App, TAbstractFile, TFolder,TFile } from "obsidian";
import { TextInputSuggest } from "./suggest";

export class SubFolderSuggest extends TextInputSuggest<TFolder> {
    folder:string;
    sliceLength:number;
    constructor(app: App, inputEl: HTMLInputElement | HTMLTextAreaElement,folder:string) {
        super(app, inputEl);
        this.folder = folder;
        if(folder.length == 0){
            this.sliceLength=0;
        }else{
            this.sliceLength = folder.length+1;
        }
    }

    getSuggestions(inputStr: string): TFolder[] {
        let test = this.app.vault.getFileByPath(this.folder);
        const testTFolder = this.app.vault.getAllLoadedFiles().filter((folder: TAbstractFile) => {
                return folder instanceof TFolder;
            })
        const printTest = testTFolder[0].children.filter( (file: TAbstractFile) => {return file instanceof TFile &&  file.extension === "md"})

        for(let i = 0; i < printTest.length; i++){
            console.log(printTest[i].name)
        }

        const abstractFiles = this.app.vault.getAllLoadedFiles().filter( (folder: TAbstractFile) =>{
            return folder.path.toLowerCase().contains(this.folder.toLowerCase() )
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
        const text = file.path.slice(this.sliceLength);
        if (text == ""){
            el.setText("/")
        }else{
        el.setText(text);
    }}

    selectSuggestion(file: TFolder): void {
        this.inputEl.value = file.path;
        this.inputEl.trigger("input");
        this.close();
    }
}