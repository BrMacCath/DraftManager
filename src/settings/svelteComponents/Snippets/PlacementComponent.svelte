<script lang="ts">
	import type FileArrangement from "types/FolderTypes/fileArrangement";

    interface Props{
        currentSelection: FileArrangement|FileArrangement;
        organisingList: FileArrangement[]|FileArrangement[];
        saveChanges: ()=> void;
    }

    let {
        currentSelection,
        organisingList,
        saveChanges
    }: Props =$props();
    function moveDown(){
        const entryIndex = organisingList.indexOf(currentSelection);
        const maxEntry = organisingList.length-2;
        if(entryIndex>maxEntry){
            return;
        }
        const tempEntry = organisingList[entryIndex+1];
        organisingList[entryIndex+1] = currentSelection;
        organisingList[entryIndex] = tempEntry;
        saveChanges()
    }
    function moveUp(){
        const entryIndex = organisingList.indexOf(currentSelection);
        if(entryIndex == 0){
            return;
        }
        const tempEntry = organisingList[entryIndex-1];
        organisingList[entryIndex-1] = currentSelection;
        organisingList[entryIndex] = tempEntry;
        saveChanges()
    }
</script>

<style>
    .container{
        display: inline-block;
        height:60px;
        width: 100%;
    }
    .container div{
        width: 50%;
        float: left;
    }
    
    .vert-stack{
        height: 100%;
        display: inline-block;
    }
    .vert-stack div{
        height:45%;
        margin-top: 0%;
        width: 100%;
        padding: 0;
        
    }
    .vert-stack div h2{
        margin-top: 0;
        margin-bottom: 0;
    }
    .buttons button{
        float: right;
        margin-left: 5px;
    }
    .buttons{
        right:0;
    }
</style>
 {#if organisingList.length >1}
<div class="container">
   
    <div  class="vert-stack">
        <div >
            <h2>
                Placement 
            </h2>
        </div>
        
            <div >
                Adjust {currentSelection.name}'s position
            </div>
        
    </div>

    <div  class="vert-stack" >
        <div>

        </div>
        <div class="buttons">
            <button onclick={moveDown}>Move Down</button>           
            <button onclick={moveUp}>Move Up</button>
        </div>
    </div>
    
</div>
{/if}
{#if organisingList.length <= 1}
    <div >
        <h2>
            Placement 
        </h2>
    </div>
    <div>
        <p> {currentSelection.name} cannot be moved</p>
    </div>
{/if}

