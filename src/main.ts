import { Plugin,} from 'obsidian';
import type DraftManagerPluginSettings from 'src/settings/DraftManagerPluginSettings';
import { DEFAULT_SETTINGS } from 'src/settings/DraftManagerPluginSettings';
import { DraftTab } from './settings/tabs/settingTab';
import { chooseFolder } from './settings/modals/chooseFolder';
import {  moveFolderToVaultModal } from './settings/modals/moveFolderToVaultModal';
// Remember to rename these classes and interfaces!

export default class DraftManagerPlugin extends Plugin {
	settings: DraftManagerPluginSettings;
	async onload() {
		await this.loadSettings();
		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new DraftTab(this.app, this));
		
		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.addCommand({id:"New Draft",name:"New Draft",callback: async ()=>{
			new chooseFolder(this.app,this.settings,this).open();
		}})

		this.addCommand({id:"MoveFolder",name:"Move folder to new Vault",callback: async()=>{
			new moveFolderToVaultModal(this.app,this.settings,this).open();
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
