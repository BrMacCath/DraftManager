export default interface subFolderArrangement{
    excludeFolders: string[];
    folderArrangement: [string,number][];
}
// Subfolder Arrangement has to have a few properties.
// 1. It has to contain itself.

// [Folder TFile, [Excluded folders/files], folderArrangement[], File Arrangement[]]