import { App, Notice, TAbstractFile, TFile} from "obsidian";
import { TextInputSuggest } from "./suggest";
// What does this class need to do?
// Takes the list of files from a folder



export class FileFromFolderSuggest extends TextInputSuggest<TFile> {
    sliceLength:number;
    folder: string;
    constructor(app: App, inputEl: HTMLInputElement | HTMLTextAreaElement,folder:string) {
        super(app, inputEl);
        this.folder = folder;
    }

    getSuggestions(inputStr: string): TFile[] {
        const abstractFiles = this.app.vault.getAllLoadedFiles().filter((file: TAbstractFile) => {
                return file instanceof TFile &&
                file.parent?.path == this.folder
            })
        //this.app.vault.getFolderByPath
        const folders: TFile[] = [];
        abstractFiles.forEach((file: TAbstractFile) => {
            if (
                file instanceof TFile &&
                file.extension === "md" 
            ) {
                folders.push(file);
            }
        });
        if (folders.length == 0){
            new Notice("There are no files to create a draft from in this folder.")
        }

        return folders.slice(0, 1000);
    }

    renderSuggestion(file: TFile, el: HTMLElement): void {
        if (file.path == ""){
            el.setText("/")
        }else{
        el.setText(file.name.slice(0,-3));
    }
}

    selectSuggestion(file: TFile): void {
        // Get the TFile for this
        this.inputEl.value = file.path;
        this.inputEl.trigger("input");
        this.close();
    }
}