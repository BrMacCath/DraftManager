import { App, TAbstractFile, TFile} from "obsidian";
import { TextInputSuggest } from "./suggest";
import FolderArrangement from "types/choices/folderArrangement";

// What does this class need to do?
// Takes the list of files from a folder



export class FileFromFolderSuggest extends TextInputSuggest<TAbstractFile> {
    sliceLength:number;
    folder: string;
    constructor(app: App, inputEl: HTMLInputElement | HTMLTextAreaElement,folder:string) {
        super(app, inputEl);
        this.folder = folder;
    }

    getSuggestions(inputStr: string): TAbstractFile[] {
        let test = this.app.vault.getFileByPath(this.folder);
        const abstractFiles = this.app.vault.getAllLoadedFiles().filter((file: TAbstractFile) => {
                return file instanceof TFile;
            })
        //this.app.vault.getFolderByPath
        const folders: TFile[] = [];
        const lowerCaseInputStr = inputStr.toLowerCase();

        abstractFiles.forEach((file: TAbstractFile) => {
            if (
                file instanceof TFile &&
                file.extension === "md" 
            ) {
                folders.push(file);
            }
        });

        return folders.slice(0, 1000);
    }

    renderSuggestion(file: TFile, el: HTMLElement): void {
        if (file.path == ""){
            el.setText("/")
        }else{
        el.setText(file.path.slice(0,-3));
    }
}

    selectSuggestion(file: TFile): void {
        // Get the TFile for this
        this.inputEl.value = file.path;
        this.inputEl.trigger("input");
        this.close();
    }
}