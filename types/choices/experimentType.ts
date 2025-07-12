import type { TFile, TFolder } from "obsidian";


export default interface ExperimentType{
    folder: TFolder;
    folderArrangement: [ExperimentType,number][];
    fileArrangement: [TFile,number][]
}