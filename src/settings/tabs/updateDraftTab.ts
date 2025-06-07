import { App,Setting } from "obsidian";
import ResearchPlugin from "src/main";
export class UpdateDraftConditions extends HTMLElement {
    app:App;
    containerEl:HTMLElement;
    plugin: ResearchPlugin;
    constructor(app: App, plugin: ResearchPlugin) {
        super();
        this.app=app;
        this.plugin = plugin;
    }
    
    show(): void {
        new Setting(this).setDesc("Got her yeahhhhh")
    }

}