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

    import {faFolder,faFile} from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome/components/Icon.svelte";
	import type FolderArrangement from "types/FolderTypes/folderArrangement";
    import SvelteImportStuff from "./svelteImportStuff.svelte";
</script>

<div class="Test1" >
    <Icon data={faFolder} />{"  "+folderArrangement.folder}
    <!-- {mount(SvelteImportStuff)} -->
    <div class={folderArrangement.folder}>
{#each folderArrangement.subFolders as fold}
<div class="Test2" >
    <SvelteImportStuff tabs={tabs+5} folderArrangement={fold} ></SvelteImportStuff>
    <!-- <div class={fold.folder.name}></div> -->
</div>  
{/each}
 </div>

{#each folderArrangement.subFiles as file}
    <div class="Test2"style="margin-left:5px">
        <Icon data={faFile} /> {file.file}
    </div>
{/each}

    
</div>



<style>
    .Test1 {
        margin-left: 3px;
    }
    
</style>

