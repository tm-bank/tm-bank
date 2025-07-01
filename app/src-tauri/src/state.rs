use tmbank_core::user::AuthenticationStatus;

pub struct Authentication {
    pub status: AuthenticationStatus,
}

impl Default for Authentication {
    fn default() -> Self {
        Self {
            status: AuthenticationStatus::Guest,
        }
    }
}

#[derive(Default)]
pub struct AppState {
    pub auth: Authentication,
}
