export default function changeVault(vault:string){
    const scheme= "obsidian://";
    const action = "open?";
    const setVaultParameter ="vault=";
    const targetParameter ="_external";
    const test = window.open(scheme+action+setVaultParameter+vault,targetParameter);
}