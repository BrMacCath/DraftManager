import type DraftManagerPlugin from "src/main";


export function sortFolderOrder(plugin:DraftManagerPlugin):void{
    plugin.settings.folders.sort( (a,b) => a.folderName.localeCompare(b.folderName));
    plugin.saveSettings()
}