import ResearchPlugin from "src/main";
import FolderArrangement from "types/choices/folderArrangement";
import { DraftTab } from "../tabs/settingTab";
import { Modal,App,Setting } from "obsidian";
import { FolderSuggest } from "../suggesters/folderSuggester";


export class UpdateFolder extends Modal {
	plugin: ResearchPlugin;
	folder: FolderArrangement;
	settings: DraftTab;
	constructor(app: App,plugin: ResearchPlugin,folder:FolderArrangement,settings:DraftTab) {
		super(app);
		this.plugin = plugin;
		this.folder = folder;
		this.settings=settings;
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.createEl("h1").setText("Adjust Folder Settings");
		new Setting(contentEl)
			.setName("Folder")
            .setDesc("This is where the code will be applied to.")
            .addSearch((cb) => {
                new FolderSuggest(this.app, cb.inputEl);
                cb.setPlaceholder(this.folder.folderName)
                    .setValue(this.plugin.settings.templates_folder)
                    .onChange((new_folder) => {
                        // Trim folder and Strip ending slash if there
                        new_folder = new_folder.trim()
                        new_folder = new_folder.replace(/\/$/, "");

                        this.folder.folderName = new_folder;
                        this.plugin.saveSettings();
						this.settings.display();
                    });
                // @ts-ignore
                cb.containerEl.addClass("templater_search");
            });
		new Setting(contentEl).setName("Subfolders")
		.setDesc("Does this folder have subfolders?")
		.addToggle( (cb) => cb.setValue(this.folder.subFolders)
		.onChange(async (value)=>{
			this.folder.subFolders = value;
			await this.plugin.saveSettings();}
		)
		
	)
	new Setting(contentEl).setName("Drafts")
		.setDesc("Will you be using drafts in your situation?")
		.addToggle( (cb) => cb.setValue(this.folder.haveDrafts)
		.onChange(async (value)=>{
			this.folder.haveDrafts = value;
			await this.plugin.saveSettings();}
		)
	)
	new Setting(contentEl).setDesc("Update draft conditions").addButton((btn) => {
		btn.setButtonText("Draft Settings").onClick( () =>{
			// Make a modal that talks about the draft settings
		} )
	})
	new Setting(contentEl).setDesc("Bibliography").addTextArea((cb)=>{
		//cb.setPlaceholder(this.folder.)
	})

	let deleteBtn = new Setting(contentEl).setName("Delete Folder?")
		.setDesc("Do you wish to delete this folder?")
		.addButton((cb) =>{
			cb.setButtonText("Delete").onClick( () =>{
				this.plugin.settings.folders = this.plugin.settings.folders.filter(fold => fold.id != this.folder.id)
				this.plugin.saveSettings()
				this.settings.display();
				this.close()
			} ) 
		} )
	deleteBtn.setClass("rp-delete")
	
	}
	
	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}
