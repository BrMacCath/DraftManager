import type ResearchPlugin from "src/main";


export function sortFolderOrder(plugin:ResearchPlugin):void{
    plugin.settings.folders.sort( (a,b) => a.folderName.localeCompare(b.folderName));
    plugin.saveSettings()
}