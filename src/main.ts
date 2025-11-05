import {Plugin} from 'obsidian';
import type DraftManagerPluginSettings from 'src/settings/DraftManagerPluginSettings';
import { DEFAULT_SETTINGS } from 'src/settings/DraftManagerPluginSettings';
import { DraftTab } from './settings/tabs/settingTab';
import {  moveFolderToVaultModal } from './settings/modals/moveFolderToVaultModal';
import { settingsStore } from 'types/zustand/store';
// Remember to rename these classes and interfaces!

export default class DraftManagerPlugin extends Plugin {
	settings: DraftManagerPluginSettings;
	private unsubscribeSettingsStore: () => void;
	
	async onload() {
		await this.loadSettings();
		settingsStore.setState(this.settings);
		this.unsubscribeSettingsStore = settingsStore.subscribe((settings) => {
			this.settings = settings;
			void this.saveSettings();
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new DraftTab(this.app, this));
		
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
