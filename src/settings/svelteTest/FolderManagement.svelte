<script lang="ts">
    interface Props{
        tabs: number;
        folderArrangement: FolderArrangement;
    }

    let {
        tabs,
        folderArrangement =$bindable()
    }:Props =$props();
    // let folderChildren:TFolder[] =folder.children.filter((abfile) =>{return abfile instanceof TFolder});
    // let fileChildren:TFile[] =folder.children.filter((abfile) =>{return abfile instanceof TFile});
    // Could manage this outside the svelte situation
    async function handleConfigureChoice(e: any) {
		
        console.log(e.detail)
		
	}
    function sendM(){
        console.log("Got here");
    }
   
    
	import type FolderArrangement from "types/FolderTypes/folderArrangement";
    import SvelteImportStuff from "./svelteImportStuff.svelte";
    import AdjustFiles from "./adjustFiles.svelte";
	import ObsidianIcon from "./ObsidianIcon.svelte";
	import Test from "./Test.svelte";
</script>
<!-- 
<div class="Test1" >
    <ObsidianIcon iconId="folder" size={16} />{"  "+folderArrangement.folder}
    {mount(SvelteImportStuff)}
    <div class={folderArrangement.folder}>
{#each folderArrangement.subFolders as fold}
<div class="Test2" >
    <SvelteImportStuff tabs={tabs+5} folderArrangement={fold} ></SvelteImportStuff>onconfigureChoice={handleConfigureChoice}
    <div class={fold.folder.name}></div> 
</div>  
{/each}
 </div> 
-->
<div style="margin-left:5px">
    <AdjustFiles subFiles={folderArrangement.subFiles} {handleConfigureChoice} ></AdjustFiles>
</div>


<Test sendM={sendM}></Test>

<!--

    
</div>
-->



