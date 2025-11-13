<script lang="ts">
	import type FileArrangement from "types/FolderTypes/fileArrangement";
    interface Props{
        folderData: FolderArrangement;
        fileList: FileArrangement[];
        contentEl: HTMLElement;
        saveChanges: ()=>void;
    }

    let {
        folderData=$bindable(),
        fileList,
        contentEl,
        saveChanges
    }:Props =$props();
    // let folderChildren:TFolder[] =folder.children.filter((abfile) =>{return abfile instanceof TFolder});
    // let fileChildren:TFile[] =folder.children.filter((abfile) =>{return abfile instanceof TFile});
    // Could manage this outside the svelte situation
    console.log(fileList)
	import type FolderArrangement from "types/FolderTypes/folderArrangement";
    import { Setting } from "obsidian";
	import { draftStyleOptions } from "types/choices/draftStyleOptions";

    new Setting(contentEl).setName("Adjust " + " folder").setHeading()
    new Setting(contentEl).setName("Draft style").setDesc("Change the default style for files added to this folder.")
    .addDropdown((dropdown)=>{
        for (let i=0; i< draftStyleOptions.length;i++){
            dropdown.addOption(draftStyleOptions[i],draftStyleOptions[i])
        }
        dropdown.setValue(folderData.draftConditions.draftStyle);
        dropdown.onChange(async (value) =>{
            folderData.draftConditions.draftStyle = value;
            saveChanges();
        })
    })
    new Setting(contentEl).setName("Compile Output").setDesc("Where will the output be saved to.")
    .addDropdown((dropdown)=>{
        for (let i=0; i< draftStyleOptions.length;i++){
            dropdown.addOption(draftStyleOptions[i],draftStyleOptions[i])
        }
        dropdown.setValue(folderData.draftConditions.draftStyle);
        dropdown.onChange(async (value) =>{
            folderData.draftConditions.draftStyle = value;
            saveChanges();
        })
    })
</script>


<div>
    <div>
        Name: {folderData.folder}
    </div>
    
    
    <select bind:value={folderData.compileOutPut} onchange={saveChanges}>
        <!-- State not compile value. -->
        <option value="">No compile output option</option>
        {#each fileList as file }
            <option value={file.file}>{file.file}</option>
        {/each}
    </select>


</div>