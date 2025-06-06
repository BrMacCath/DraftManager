import { Plugin} from 'obsidian';
import ResearchPluginSettings from 'src/settings/researchPluginSettings';
import { DEFAULT_SETTINGS } from 'src/settings/researchPluginSettings';
import { DraftTab } from './settings/tabs/settingTab';
import { chooseFolder } from './settings/modals/chooseFolder';
// Remember to rename these classes and interfaces!


export default class ResearchPlugin extends Plugin {
	settings: ResearchPluginSettings;

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new DraftTab(this.app, this));

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
		this.addCommand({id:"New Draft",name:"New Draft",callback: async ()=>{
			new chooseFolder(this.app,this.settings,this).open()
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

