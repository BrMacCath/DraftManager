import type FolderArrangement from "./folderArrangement";

export interface BaseFolderArrangement{
    folder: FolderArrangement;
    displayName: string;
    basePath: string;
    id: string;
}