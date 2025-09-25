import { Notice, Plugin, TFile} from 'obsidian';
import type DraftManagerPluginSettings from 'src/settings/DraftManagerPluginSettings';
import { DEFAULT_SETTINGS } from 'src/settings/DraftManagerPluginSettings';
import { DraftTab } from './settings/tabs/settingTab';
import { chooseFolder } from './settings/modals/chooseFolder';
import overwriteFileInVault from './settings/functions/URI/overwriteFileInVault';
import { VaultTab } from './settings/tabs/vaultTab';
// Remember to rename these classes and interfaces!


export default class ResearchPlugin extends Plugin {
	settings: DraftManagerPluginSettings;
	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new DraftTab(this.app, this));
		this.addSettingTab(new VaultTab(this.app,this));

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.addCommand({id:"New Draft",name:"New Draft",callback: async ()=>{
			new chooseFolder(this.app,this.settings,this).open()
		}})

		this.addCommand({id:"test URI",name:"testURI",callback: async ()=>{
			// changeVault("testVault")
            // window.OBS_ACT({"scheme":"Obsidian","action":"new","file":"temp/test8","content":"test","openmode":"silent"});
            const fileTFile:TFile = this.app.vault.getFileByPath("temp/test8.md");
            console.log(fileTFile)
            overwriteFileInVault("testVault",fileTFile.path,await this.app.vault.read(fileTFile))
            const tempFold = this.app.vault.getFolderByPath("temp");
            console.log(tempFold);
            tempFold?.children.map( async(file) =>{
                overwriteFileInVault("testVault",file.path,await this.app.vault.read(file))
            }
            )
		}})

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
