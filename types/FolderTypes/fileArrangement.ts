import { TFile } from "obsidian";
import type draftConditions from "types/choices/draftConditions";

export default interface FileArrangement{
    file:TFile;
    order:number;
    draftConditions: draftConditions;
}