use tauri::Runtime;
use tauri_plugin_store::StoreExt;

/// Store the remote JWT in the key-value store.
#[tauri::command]
pub async fn store_auth<R: Runtime>(
    token: String,
    app: tauri::AppHandle<R>,
    window: tauri::Window<R>,
) -> Result<(), String> {
    let store = app.get_store("state.json").unwrap();

    println!("Saving {token} to KV store.");
    store.set("jwt-token", token);

    Ok(())
}
