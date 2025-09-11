import { Notice, Plugin, TFile} from 'obsidian';
import type DraftManagerPluginSettings from 'src/settings/DraftManagerPluginSettings';
import { DEFAULT_SETTINGS } from 'src/settings/DraftManagerPluginSettings';
import { DraftTab } from './settings/tabs/settingTab';
import { chooseFolder } from './settings/modals/chooseFolder';
import overwriteFileInOtherVault from './settings/functions/URI/overwriteFileInOtherVault';
// Remember to rename these classes and interfaces!


export default class ResearchPlugin extends Plugin {
	settings: DraftManagerPluginSettings;
	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new DraftTab(this.app, this));

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.addCommand({id:"New Draft",name:"New Draft",callback: async ()=>{
			new chooseFolder(this.app,this.settings,this).open()
		}})

		this.addCommand({id:"test URI",name:"testURI",callback: async ()=>{
			// changeVault("testVault")
            // window.OBS_ACT({"scheme":"Obsidian","action":"new","file":"temp/test8","content":"test","openmode":"silent"});
            const fileTFile:TFile = this.app.vault.getFileByPath("temp/test8.md");
            console.log(fileTFile)
            overwriteFileInOtherVault("testVault",fileTFile.path,await this.app.vault.read(fileTFile))

		}})

		this.registerObsidianProtocolHandler("blahTest",(e)=>{
			const parameters = e as unknown as Parameters;
			console.log(parameters)
			window.OBS_ACT({"scheme":"Obsidian","action":"new","vault":"testVault","file":"temp/test3","content":"test","openmode":"silent"});
            window.OBS_ACT({"scheme":"Obsidian","action":"new","vault":"testVault","file":"temp/test5","content":"test","openmode":"silent"});
            window.open('obsidian://new?vault=testVault&file=temp%2Ftest7','_external')
			new Notice(parameters.separator)
			new Notice("Got Here")
		})
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

interface Parameters {
    workspace?: string;
    filepath?: string;
    daily?: "true";
    data?: string;
    /**
     * Separator used between previous data and new data when performing
     * an append or prepend command.
     * @default "\n"
     */
    separator?: string;
    mode?: "overwrite" | "append" | "prepend" | "new";
    heading?: string;
    block?: string;
    commandname?: string;
    commandid?: string;
    search?: string;
    searchregex?: string;
    replace?: string;
    uid?: string;
    filename?: string;
    exists?: string;
    viewmode?: "source" | "preview" | "live";
   // openmode?: OpenMode;
    settingid?: string;
    settingsection?: string;
    "x-success"?: string;
    "x-error"?: string;
    saveworkspace?: "true";
    updateplugins?: "true";
    line?: string;
    column?: string;
    /**
     * @deprecated Use "openMode" instead
     */
    newpane?: "true" | "false";
    clipboard?: string;
    "enable-plugin"?: string;
    "disable-plugin"?: string;
    frontmatterkey?: string;
    eval?: string;
    bookmark?: string;
    /**
     * A list of comma separated node ids
     */
    canvasnodes?: string;
    /**
     * x,y,zoom split by `,`
     * To keep current value a `-` can be used
     * To alter a value by a number use `++` or `-` before the number
     * @example
     * 0,0,1 to reset to default
     * --50,++25,- to decrease x by 50, increase y by 25 and keep current zoom
     */
    canvasviewport?: string;
    confirm?: string;
    offset?: string;
}
