<script lang="ts">
    interface Props{
        tabs: number;
        folder: TFolder;
    }

    let {
        tabs,
        folder
    }:Props =$props();
    let total = folder.children
    let folderChildren:TFolder[] =[];
    let fileChildren:TFile[] =[];
    
    function sortFileType(){
        for(let i=0;i++;i<total.length){
            if(total[i] instanceof TFolder){
                folderChildren.push(total[i])
            }
        }
    }

    import {faFolder,faFile} from "@fortawesome/free-solid-svg-icons";
	import { fips } from "crypto";
	import { TFile, TFolder } from "obsidian";
    import Icon from "svelte-awesome/components/Icon.svelte";
</script>
{#each total as abFile}
    {#if abFile instanceof TFolder}
        {folderChildren.push(abFile)}
    {:else if abFile instanceof TFile}
        {fileChildren.push(abFile)}
    {/if}
{/each}

<div class="Test1" >
    <Icon data={faFolder} />{folder.name}
</div>
{#each folderChildren as fold}
<div class="Test2" >
    <Icon data={faFolder} />{fold.name}
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


