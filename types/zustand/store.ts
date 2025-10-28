import type DraftManagerSettings from "src/settings/DraftManagerPluginSettings";
import { DEFAULT_SETTINGS } from "src/settings/DraftManagerPluginSettings";
import { createStore } from "zustand/vanilla";
type SettingState = DraftManagerSettings;

export const settingsStore = ( () =>{
    const useSettingsStore = createStore<SettingState>((set, _get) => ({
		...structuredClone(DEFAULT_SETTINGS),
	}));

	const { getState, setState, subscribe } = useSettingsStore;

	return {
		getState,
		setState,
		subscribe,
	};
})();