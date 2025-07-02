use std::sync::Mutex;

use serde::Serialize;
use tauri::State;
use tm_bank_core::user::UserData;

use crate::state::AppState;

#[derive(Clone, Serialize)]
pub struct OAuthState {
    pub access_token: Option<String>,
}

#[tauri::command]
pub async fn start_discord_oauth(
    app_handle: tauri::AppHandle,
    state: State<'_, Mutex<AppState>>,
) -> Result<(), String> {
    let client_id = "1372578649991286915";
    let redirect_uri = "tmb://callback";
    let scope = "identify email";

    let auth_url = format!(
        "https://discord.com/api/oauth2/authorize?client_id={}&redirect_uri={}&response_type=code&scope={}",
        client_id,
        urlencoding::encode(redirect_uri),
        urlencoding::encode(scope)
    );

    tauri_plugin_opener::open_url(auth_url, None::<&str>)
        .map_err(|e| format!("Failed to open browser: {}", e))?;

    Ok(())
}

#[tauri::command]
pub async fn get_user_info(app_handle: tauri::AppHandle, state: State<'_, Mutex<AppState>>) -> Result<UserData, String> {
    state
        .lock()
        .map_err(|e| e.to_string())?
        .auth
        .user
        .clone()
        .ok_or_else(|| "Cannot return user data for None".to_string())
}
