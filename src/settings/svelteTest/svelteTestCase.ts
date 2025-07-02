import SvelteImportStuff from "../svelteTest/svelteImportStuff.svelte";
import { mount,unmount } from "svelte";

type testtt = [string,string[]]

export function svelteMountDiv(data:testtt[], tabs:number, contentEl:HTMLElement){
    for(let i = 0; i< data.length; i++){
        const div = contentEl.createDiv()
        
    }

}