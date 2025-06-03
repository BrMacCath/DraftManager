import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { FolderSuggest } from './settings/suggesters/folderSuggester';
import { text } from 'stream/consumers';
import subFolderArrangement from 'types/choices/subFolderArrangement';
import { v4 as v4 } from 'uuid';
// Remember to rename these classes and interfaces!


export default class ResearchPlugin extends Plugin {
	settings: ResearchPluginSettings;

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


// This is going to be used to add a folder to our groupings. Right now it is not useful.
class UpdateFolder extends Modal {
	plugin: ResearchPlugin;
	folder: subFolderArrangement;
	settings: SampleSettingTab;
	constructor(app: App,plugin: ResearchPlugin,folder:subFolderArrangement,settings:SampleSettingTab) {
		super(app);
		this.plugin = plugin;
		this.folder = folder;
		this.settings=settings;
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.createEl("h1").setText("Adjust Folder Settings");
		new Setting(contentEl)
			.setName('Folder Name')
			.addText(text => text
				.setPlaceholder(this.folder.folderName)
				.setValue(this.folder.folderName)
				.onChange(async (value) => {
					this.folder.folderName = value;
					this.settings.display();
					await this.plugin.saveSettings();
				}));
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

	let deleteBtn = new Setting(contentEl).setName("Delete Folder?")
		.setDesc("Do you wish to delete this folder?")
		.addButton((cb) =>{
			cb.setButtonText("Delete").onClick( () =>{
				this.plugin.settings.testFolder = this.plugin.settings.testFolder.filter(fold => fold.id != this.folder.id)
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

interface ResearchPluginSettings {
	draftFolders:string[];
	templates_folder:string;
	user_scripts_folder:string;
	test_type:[startloc:string,endloc:string];
	testModal: string;
	testFolder: subFolderArrangement[];

}

const DEFAULT_SETTINGS: ResearchPluginSettings = {
	draftFolders: [],
	templates_folder:"",
	user_scripts_folder:"",
	test_type: ["",""],
	testModal: "",
	testFolder: [],
}


class SampleSettingTab extends PluginSettingTab {
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

		this.plugin.settings.testFolder.forEach( (folder) => {
			let btnFold =new Setting(containerEl).setDesc(folder.folderName).addButton( (btn)=> {
				// Create a folder modal that allows you to edit it.
				btn.setButtonText("Update Folder").onClick(() => {new UpdateFolder(this.app,this.plugin,folder,this).open()})
			})
			btnFold.setClass("rp-button")
		} )

		let btnTest =new Setting(containerEl).setDesc("Add a folder template").addButton((btn)=>{
			btn.setButtonText("Folder Button").onClick(() =>{
				this.plugin.settings.testFolder.push({folderName:"Test Folder",id:v4(),subFolders:true,haveDrafts:true});
				this.plugin.saveSettings();
				this.display();
			}  )
		
		})
		btnTest.setClass("rp-button");
		let testText=new Setting(containerEl).setDesc("Test input").addTextArea((cb)=>{});
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
