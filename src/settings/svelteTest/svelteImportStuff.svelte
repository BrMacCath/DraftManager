<script lang="ts">
    interface Props{
        tabs: number;
        folder: TFolder;
    }

    let {
        tabs,
        folder
    }:Props =$props();
    let folderChildren:TFolder[] =folder.children.filter((abfile) =>{return abfile instanceof TFolder});
    let fileChildren:TFile[] =folder.children.filter((abfile) =>{return abfile instanceof TFile});
    // Could manage this outside the svelte situation

    import {faFolder,faFile} from "@fortawesome/free-solid-svg-icons";
	import {TFile, TFolder } from "obsidian";
    import Icon from "svelte-awesome/components/Icon.svelte";
</script>

<div class="Test1" >
    <Icon data={faFolder} />{folder.name}
    <!-- {mount(SvelteImportStuff)} -->
     <div class={folder.name}>Test</div>

</div>
{#each folderChildren as fold}
<div class="Test2" >
    <Icon data={faFolder} />{fold.name}
    <div class={fold.name}>Test</div>
</div>  
{/each}


{#each fileChildren as file}
    <div class="Test2"style="margin-left:{tabs}px">
        <Icon data={faFile} /> {file.name}
    </div>
{/each}

<style>
    .Test1 {
        margin-left: 3px;
    }
    
</style>

