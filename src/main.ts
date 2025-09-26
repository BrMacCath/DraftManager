import { getFrontMatterInfo, Plugin, TFile} from 'obsidian';
import type DraftManagerPluginSettings from 'src/settings/DraftManagerPluginSettings';
import { DEFAULT_SETTINGS } from 'src/settings/DraftManagerPluginSettings';
import { DraftTab } from './settings/tabs/settingTab';
import { chooseFolder } from './settings/modals/chooseFolder';
// Remember to rename these classes and interfaces!

export default class DraftManagerPlugin extends Plugin {
	settings: DraftManagerPluginSettings;
	async onload() {
		await this.loadSettings();
		console.log(this.app.vault.getName());
		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new DraftTab(this.app, this));
		

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.addCommand({id:"New Draft",name:"New Draft",callback: async ()=>{
			new chooseFolder(this.app,this.settings,this).open()
		}})

		this.addCommand({id:"test URI",name:"testURI",callback: async ()=>{
            const tempFold = this.app.vault.getFolderByPath("temp");
			
			const tempFile = this.app.vault.getFileByPath("temp/Example.md");
			let tempContent = await this.app.vault.cachedRead(tempFile);
			let frontMatter = getFrontMatterInfo(tempContent).frontmatter;
			const startDraft =frontMatter.indexOf("DraftNum");
			frontMatter = frontMatter.substring(startDraft)
			let lengthDraftFrontMatter = "DraftNum:".length;

			const draftNumContent = frontMatter.substring(lengthDraftFrontMatter, frontMatter.indexOf("\n")).trim();
			console.log(draftNumContent)
			let draftNum = Number(draftNumContent)
			
			console.log(tempFile);
            console.log(tempFold);
			console.log(tempContent)
			console.log(draftNum)
			console.log(getFrontMatterInfo(tempContent).frontmatter.indexOf("DraftNum"))
			const exampleText = "There is {[can't see this ]}that.";
			const frontBrace = String.raw`\{\[`;
			const backBrace = String.raw`\]\}`;
			let testString = String.raw`${frontBrace}(.*?)${backBrace}`;
			console.log(testString);
			let re = new RegExp(testString,"g" );
			console.log(exampleText);
			console.log(exampleText.replace(re,""));

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
