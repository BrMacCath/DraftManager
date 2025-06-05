import { App,Setting } from "obsidian";
import ResearchPlugin from "src/main";
export class DefaultDraftConditions extends Setting {
    app:App;
    containerEl:HTMLElement;
    plugin: ResearchPlugin;
    constructor(app: App, plugin: ResearchPlugin,containerEl:HTMLElement) {
        super(containerEl);
        this.app=app;
        this.containerEl=containerEl;
        this.plugin = plugin;
    }
    
}