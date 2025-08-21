import {
  App,
  Editor,
  EditorPosition,
  EditorSuggest,
  EditorSuggestContext,
  EditorSuggestTriggerInfo,
} from 'obsidian';
import ResearchPlugin from 'src/main';

export default class SuggestionIcon extends EditorSuggest<string> {
  defaultArray:Array<string>
  constructor(
    app: App,
    public plugin: ResearchPlugin,
  ) {
    super(app);
    this.defaultArray = ["test", "abc", "Get that here blah"];
  }

  onTrigger(cursor: EditorPosition, editor: Editor): EditorSuggestTriggerInfo {
    // Isolate shortcode starting position closest to the cursor.
    const shortcodeStart = editor
      .getLine(cursor.line)
      .substring(0, cursor.ch)
      .lastIndexOf(this.plugin.settings.citationKey);

    // `onTrigger` needs to return `null` as soon as possible to save processing performance.
    if (shortcodeStart === -1) {
      return null;
    }

    // Regex for checking if the shortcode is not done yet.
    const regex = new RegExp(
      `^(${this.plugin.settings.citationKey})\\w+$`,
      'g',
    );
    const regexOngoingShortcode = editor
      .getLine(cursor.line)
      .substring(shortcodeStart, cursor.ch)
      .match(regex);

    if (regexOngoingShortcode === null) {
      return null;
    }

    const startingIndex = editor
      .getLine(cursor.line)
      .indexOf(regexOngoingShortcode[0])+ this.plugin.settings.citationKey.length;

    return {
      start: {
        line: cursor.line,
        ch: startingIndex,
      },
      end: {
        line: cursor.line,
        ch: startingIndex + regexOngoingShortcode[0].length-this.plugin.settings.citationKey.length,
      },
      query: regexOngoingShortcode[0],
    };
  }

  getSuggestions(context: EditorSuggestContext): string[] {
    const queryLowerCase = context.query
      .substring(this.plugin.settings.citationKey.length)
      .toLowerCase();
    const suggestions = this.defaultArray.filter((e) =>
       e?.includes(queryLowerCase),
    )
    return suggestions;
  }

  renderSuggestion(value: string, el: HTMLElement): void {
    el.innerHTML =`<span>${value}</span>`
  }

  selectSuggestion(value: string): void {
    this.context.editor.replaceRange(
      value,
      this.context.start,
      this.context.end,
    );
  }
}