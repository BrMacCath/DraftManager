import { App, PluginSettingTab, Setting } from "obsidian";
import type ResearchPlugin from "src/main";


export class VaultTab extends PluginSettingTab {
    plugin: ResearchPlugin;
    constructor(app: App, plugin: ResearchPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const {containerEl} = this;
        new Setting(containerEl).setName("Vault Management")
                


    }

}