<script lang="ts">
	import type FileArrangement from "types/FolderTypes/fileArrangement";

    interface Props{
        subFiles: FileArrangement[]
    }

    let {
        subFiles
    }:Props =$props();
    // let folderChildren:TFolder[] =folder.children.filter((abfile) =>{return abfile instanceof TFolder});
    // let fileChildren:TFile[] =folder.children.filter((abfile) =>{return abfile instanceof TFile});
    // Could manage this outside the svelte situation
    
	export function dragstart (ev:DragEvent, group:string, order:number) {
		ev.dataTransfer?.setData("group", group);
		ev.dataTransfer?.setData("item", String(order));
	}

	export function dragover (ev:DragEvent) {
		ev.preventDefault();
        if(!(ev.dataTransfer == null) ){
		    ev.dataTransfer.dropEffect = 'move';
        }
	}

	export function drop (ev:DragEvent) {
		ev.preventDefault();
		var i = ev.dataTransfer?.getData("item");
		var old_g = ev.dataTransfer?.getData("group");
	// 	const item = groups[old_g].items.splice(i,1)[0];
	// 	groups[new_g].items.push(item);
	// 	groups = groups;
	 }


</script>

{#each subFiles as file,order}
<div class = "subfile">
    {file.file} + {order}
</div>

{/each}