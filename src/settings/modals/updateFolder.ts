import ResearchPlugin from "src/main";
import FolderArrangement from "types/choices/folderArrangement";
import { DraftTab } from "../tabs/settingTab";
import { Modal,App,Setting } from "obsidian";
import { FolderSuggest } from "../suggesters/folderSuggester";
import { UpdateDraftSettings } from "./updateDraftSettings";
import { UpdateSubFolder } from "./updateSubfolder";

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
        this.folderNameConditions()
        this.createSubfolderConditions()
        this.createBibliography()
        this.createDraftConditions()
        this.createDeleteFolderButton()
	}

    folderNameConditions():void{
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
    }

    createSubfolderConditions():void{
        const {contentEl} = this;
		new Setting(contentEl).setName("Subfolders")
            .setDesc("Does this folder have subfolders?")
            .addToggle( (cb) => cb.setValue(this.folder.haveSubFolders)
            .onChange(async (value)=>{
                this.folder.haveSubFolders = value;
                subFoldArrange.settingEl.classList.toggle("rp-hidden");
                await this.plugin.saveSettings();}
            )
	    )
        let subFoldArrange = new Setting(contentEl);
        subFoldArrange.setName("Update Subfolders")
            .setDesc("Change Subfolder Conditions")
            .addButton((cb) => {
                cb.setButtonText("Update");
                cb.setClass("rp-button");
                cb.onClick( () =>{
                    new UpdateSubFolder(this.app,this.plugin,this.folder.subFolderArrangement,this.folder.folderName,this.settings).open()
                } )
            } )
        if(!this.folder.haveSubFolders){
            subFoldArrange.settingEl.classList.add("rp-hidden");
        }
    }

    createBibliography():void{
        const {contentEl} = this;
        new Setting(contentEl).setName("Bibliography").addTextArea((cb)=>{
            cb.setValue(this.folder.bibliography)
            .onChange(async (value)=>{
                this.folder.bibliography = value;
                await this.plugin.saveSettings();
            })
	})
    }

    createDraftConditions():void{
        const {contentEl} = this;
        new Setting(contentEl).setName("Drafts")
            .setDesc("Will you be using drafts in your situation?")
            .addToggle( (cb) => cb.setValue(this.folder.haveDrafts)
            .onChange(async (value)=>{
                this.folder.haveDrafts = value;
                draftConditionsTab.settingEl.classList.toggle("rp-hidden")
                await this.plugin.saveSettings();}
            )
        )
        let draftConditionsTab =new Setting(contentEl).setName("Update draft conditions.").addButton((btn) => {
            btn.setButtonText("Update").onClick( () =>{
                // Make a modal that talks about the draft settings
                new UpdateDraftSettings(this.app,this.folder.draftConditions,this.settings).open()
            } )
            btn.setClass("rp-button")
        })
        if(!this.folder.haveDrafts){
            draftConditionsTab.settingEl.classList.add("rp-hidden");
        }
    }

	createDeleteFolderButton():void{
        const {contentEl} = this;
        new Setting(contentEl).setName("Delete Folder?")
		.setDesc("Do you wish to delete this folder?")
		.addButton((cb) =>{
			cb.setButtonText("Delete").onClick( () =>{
				this.plugin.settings.folders = this.plugin.settings.folders.filter(fold => fold.id != this.folder.id)
				this.plugin.saveSettings()
				this.settings.display();
				this.close()
			} ) 
            cb.setClass("rp-delete");
	} )
    }
	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}
