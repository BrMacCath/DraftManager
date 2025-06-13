import { TFile } from "obsidian"

export default async function createDraft(fileName:string,template:string):Promise<void>{
    console.log(fileName)
    const fileTFile:TFile = this.app.vault.getFileByPath(fileName)
    console.log(fileTFile)
    let fileTest = await this.app.vault.read(fileTFile);
    // this.app.vault.cachedRead()
    // this.app.cachedRead()

}