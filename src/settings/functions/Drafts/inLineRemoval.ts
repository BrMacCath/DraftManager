// This is to remove comments within a line.
// Currently I can't genrealise it as I need 
// to work around escape characters in regular expressions.


export function inLineRemoval(line:string){
    const frontBrace = String.raw`\{\[`;
    const backBrace = String.raw`\]\}`;
    let regString = String.raw`${frontBrace}(.*?)${backBrace}`;
    let re = new RegExp(regString,"g" );
    return line.replace(re,"");
}