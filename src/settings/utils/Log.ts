import { Notice } from "obsidian";
import { TemplaterError } from "./Error";

export function log_update(msg: string): void {
    const notice = new Notice(`Templater update:${msg}`, 15000);
    // TODO: Find better way for this
    // @ts-ignore
}

export function log_error(e: Error | TemplaterError): void {
    
    if (e instanceof TemplaterError && e.console_msg) {
        // TODO: Find a better way for this
        // @ts-ignore
        const notice = new Notice(`Templater Error: ${e.message}. Check console for more information`, 8000);
        console.error(`Templater Error:`, e.message, "\n", e.console_msg);
    } else {
        // @ts-ignore
        const notice = new Notice(`Templater Error: ${e.message}`, 8000);
    }
}