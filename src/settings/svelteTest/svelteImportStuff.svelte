<script lang="ts">
    interface Props{
        tabs: number;
        folderArrangement: FolderArrangement;
    }

    let {
        tabs,
        folderArrangement
    }:Props =$props();
    // let folderChildren:TFolder[] =folder.children.filter((abfile) =>{return abfile instanceof TFolder});
    // let fileChildren:TFile[] =folder.children.filter((abfile) =>{return abfile instanceof TFile});
    // Could manage this outside the svelte situation

    
	import type FolderArrangement from "types/FolderTypes/folderArrangement";
    import SvelteImportStuff from "./svelteImportStuff.svelte";
    import AdjustFiles from "./adjustFiles.svelte";
	import ObsidianIcon from "./ObsidianIcon.svelte";
</script>

<div class="Test1" >
    <ObsidianIcon iconId="folder" size={16} />{"  "+folderArrangement.folder}
    <!-- {mount(SvelteImportStuff)} -->
    <div class={folderArrangement.folder}>
{#each folderArrangement.subFolders as fold}
<div class="Test2" >
    <SvelteImportStuff tabs={tabs+5} folderArrangement={fold} ></SvelteImportStuff>
    <!-- <div class={fold.folder.name}></div> -->
</div>  
{/each}
 </div>

<div style="margin-left:5px">
    <AdjustFiles bind:subFiles={folderArrangement.subFiles}></AdjustFiles>
</div>



    
</div>



<style>
    .Test1 {
        margin-left: 5px;
    }
    
</style>

