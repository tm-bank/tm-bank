use serde::Serialize;
use tm_bank_core::user::{AuthenticationStatus, UserData};

use crate::auth::OAuthState;

#[derive(Serialize)]
pub struct Authentication {
    pub status: AuthenticationStatus,
    pub user: Option<UserData>,
    pub auth: OAuthState,
}

impl Default for Authentication {
    fn default() -> Self {
        Self {
            status: AuthenticationStatus::Guest,
            user: None,
            auth: OAuthState { access_token: None }
        }
    }
}

#[derive(Default, Serialize)]
pub struct AppState {
    pub auth: Authentication,
}
