use tauri::Manager;

mod auth;
mod state;

use state::AppState;
#[cfg(desktop)]
use tauri_plugin_deep_link::DeepLinkExt;
use tauri_plugin_store::StoreExt;

use crate::auth::store_auth;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    add_plugins(tauri::Builder::default())
        .invoke_handler(tauri::generate_handler![store_auth])
        .setup(|app| {
            app.manage(AppState::default());

            // Install deep-link tmb:
            #[cfg(desktop)]
            app.deep_link().register("tmb")?;

            let store = app.store("state.json")?;

            #[cfg(any(target_os = "linux", all(debug_assertions, windows)))]
            {
                use tauri_plugin_deep_link::DeepLinkExt;
                app.deep_link().register_all()?;
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn add_plugins(builder: tauri::Builder<tauri::Wry>) -> tauri::Builder<tauri::Wry> {
    builder
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            let _ = app
                .get_webview_window("main")
                .expect("no main window")
                .set_focus();
        }))
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_http::init())
}
