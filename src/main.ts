import {Editor, Notice, Plugin, type MarkdownFileInfo} from 'obsidian';
import type DraftManagerPluginSettings from 'src/settings/DraftManagerPluginSettings';
import { DEFAULT_SETTINGS } from 'src/settings/DraftManagerPluginSettings';
import { DraftTab } from './settings/tabs/settingTab';
import {  moveFolderToVaultModal } from './settings/modals/moveFolderToVaultModal';
import { settingsStore } from 'types/zustand/store';
import { draftStyleOptions } from 'types/choices/draftStyleOptions';
import { createFromDraft } from './settings/functions/Drafts/createFromDraft';
import { extractCurrentDraft } from './settings/functions/Drafts/extractCurrentDraft';
import { createDraftTitle } from './settings/functions/Drafts/createDraftTitle';
import { createPetersonDraft } from './settings/functions/Drafts/createPetersonDraft';
import { createFromPetersonFirstDraft } from './settings/functions/Drafts/createFromPetersonFirstDraft';
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
		this.addCommand({id:"UpdatePage",name:"Update Page", editorCallback: async(editor:Editor,ctx:MarkdownFileInfo)=>{
			// Figure out meta data
			const completeFrontmatterIndicator = "complete";
			const draftNumIndicator = "draftNum";
			const draftStyleIndicator= "draftStyle";

			if(!ctx.file){
				new Notice("No file found");
				return;
			}
			// Prepare frontmatter conditions.
			const metadata = ctx?.metadataEditor.properties;
			let completeStatus = metadata.filter( (property)=>{
				return property["key"] == completeFrontmatterIndicator
			} )
			if(completeStatus.length ==1 && completeStatus[0]["value"]){
				// Don't update
				new Notice("This page is listed as complete")
				return;
			}
			
			let draftNum = metadata.filter( (property)=>{
				return property["key"] == draftNumIndicator;
			} )
			if(draftNum.length != 1){
				new Notice("The meta data for the draft number has been made incorrectly."
					+" You indicate your draft number"
					+ " by " +draftNumIndicator
				)
				return;
			}

			let draftStyle= metadata.filter( (property:any)=>{
				return property["key"] == draftStyleIndicator;
			} );

			if(draftStyle.length != 1){
				new Notice("The meta data for the draft style has been made incorrectly." 
					+" You indicate your draft style"
					+ " by " +draftStyleIndicator
				)
				return;
			}
			let listedStyle = false;
			
			
			draftStyleOptions.forEach((style)=>{
				if(style == draftStyle[0]["value"]){
					listedStyle = true
				}
			} )
			if(!listedStyle){
				new Notice("The style listed in your page, " + draftStyle[0]["value"]
					+ ", is not selected from one of the options allowed: " 
					+ draftStyleOptions.join(", "));
					
				return;
			}
			
			const rawData = ctx.data;
			//createFromDraft(rawData,this.settings.defaultFolderConditions.paragraphSeparator)
			
			const PetersonStyle = ""

			// Try Extract data and then decide if you can move on from there.
			const line = editor.getLine(editor.lastLine())
			// This puts text at the end of the document
			const [continueForward, currentDraft]= extractCurrentDraft(editor.getValue(),draftNum[0]["value"])
			if(!continueForward){
				new Notice("Cannot find current drafts heading " + createDraftTitle(draftNum[0][["value"]]))
				return;
			}
			let newContent = "";
			if(draftStyle[0]["value"] =="Peterson"){
				// Create draft
				if(draftNum[0][["value"]]>1){
					//content += blah
					newContent = createPetersonDraft(currentDraft,draftNum[0]["value"],this.settings.defaultFolderConditions)
				} else{
					newContent = createFromPetersonFirstDraft(currentDraft,this.settings.defaultFolderConditions)
				}
			}
			else if(draftStyle[0]["value"] =="Blank") {
				const newLine = "\n";
				const newTitle = createDraftTitle(draftNum[0][["value"]] +1)
				newContent = newLine+ newLine + newTitle+ newLine+newLine;
			}else{
				new Notice("Draft style is not recognised.")
				return;
			}
			console.log(newContent)
			editor.replaceRange(newContent,{line:editor.lastLine(),ch:line.length})
			
			this.app.fileManager.processFrontMatter(ctx.file,(frontmatter)=>{
				frontmatter["DraftNum"] = frontmatter["DraftNum"] + 1;
			})
			// Attach the new draft version.

			// Edit frontmatter.
			// this.app.fileManager.processFrontMatter()
			

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
