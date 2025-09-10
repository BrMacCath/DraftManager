import { Plugin, type App } from "obsidian";

export default function experimentURI(app:App){
    console.log("obsidian://new?vault=testVault&file=test2");
    //const lastParameters = app.plugins.plugins["obsidian-advanced-uri"];
    let dailyNotesPluginInstance = this.app.internalPlugins.getEnabledPluginById("daily-notes");

}