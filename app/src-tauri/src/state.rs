use serde::Serialize;
use tm_bank_core::types::user::{AuthenticationStatus, UserData};

#[derive(Serialize)]
pub struct Authentication {
    pub status: AuthenticationStatus,
    pub user: Option<UserData>,
}

impl Default for Authentication {
    fn default() -> Self {
        Self {
            status: AuthenticationStatus::Guest,
            user: None,
        }
    }
}

#[derive(Default, Serialize)]
pub struct AppState {
    pub auth: Authentication,
}
