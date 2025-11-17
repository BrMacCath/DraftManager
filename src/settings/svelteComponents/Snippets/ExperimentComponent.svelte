<script lang="ts">
	import { Setting } from "obsidian";
	import { extractTypeChoices } from "types/choices/extractTypeChoices";

    interface Props{
        extractType:string;
        containerEl: HTMLElement;
        saveChanges: () => void;
    }
    let {
        extractType=$bindable(),
        containerEl,
        saveChanges
    }:Props =$props()

    new Setting(containerEl).setName("Extract Type")
    .setDesc("Set which way data will be extracted this.")
    .addDropdown((dropDown)=>{
        dropDown.setValue(extractType);
        for (let i = 0; i < extractTypeChoices.length;i++){
            dropDown.addOption(extractTypeChoices[i],extractTypeChoices[i])
        }
        dropDown.onChange(()=>{
            saveChanges()
        } )
    })

</script>
