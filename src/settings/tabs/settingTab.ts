import { PluginSettingTab,App,Setting } from "obsidian";
import ResearchPlugin from "src/main";
import { FolderSuggest } from "../suggesters/folderSuggester";
import draftConditions from "types/choices/draftConditions";
import { v4 } from "uuid";
import { UpdateFolder } from "../modals/updateFolder";


export class DraftTab extends PluginSettingTab {
	plugin: ResearchPlugin;
    second: HTMLElement;
	constructor(app: App, plugin: ResearchPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();
		new Setting(containerEl).setName("Plugin Settings")
		//this.add_template_folder_setting();

		this.plugin.settings.folders.forEach( (folder) => {
			let btnFold =new Setting(containerEl).setDesc(folder.folderName).addButton( (btn)=> {
				// Create a folder modal that allows you to edit it.
				btn.setButtonText("Update Folder").onClick(() => {new UpdateFolder(this.app,this.plugin,folder,this).open()})
                btn.setClass("rp-button");
			})
		} )

        new Setting(containerEl).setDesc("Add a folder template").addButton((btn)=>{
			btn.setButtonText("Folder Button").onClick(() =>{
				let subfolderTemp:draftConditions = {draftStyle:{name:"Peterson"},haveComments:true, commentNotifier:"-",rewriteLineNotifier:">"};
				this.plugin.settings.folders.push({folderName:"",id:v4(),haveSubFolders:true,haveDrafts:true,bibliography: "",draftConditions:subfolderTemp,subFolderArrangement:{excludeFolders:[],folderArrangement:[]}});
				this.plugin.saveSettings();
				this.display();
			}  )
            btn.setClass("rp-button");
		})
	}

	add_template_folder_setting(): void {
        new Setting(this.containerEl)
            .setName("Template folder location")
            .setDesc("Files in this folder will be available as templates.")
            .addSearch((cb) => {
                new FolderSuggest(this.app, cb.inputEl);
                cb.setPlaceholder("Example: folder1/folder2")
                    .setValue(this.plugin.settings.templates_folder)
                    .onChange((new_folder) => {
                        // Trim folder and Strip ending slash if there
                        new_folder = new_folder.trim()
                        new_folder = new_folder.replace(/\/$/, "");
                        this.plugin.settings.templates_folder = new_folder;
                        this.plugin.saveSettings();
                    });
                // @ts-ignore
                cb.containerEl.addClass("templater_search");
            });
    }
}
