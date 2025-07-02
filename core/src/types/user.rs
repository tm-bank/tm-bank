use serde::Serialize;

use crate::types::{items::Item, moderation::Report, votes::Vote};

#[derive(Serialize)]
pub enum AuthenticationStatus {
    Guest,
    User,
}

#[derive(Clone, Serialize)]
pub enum UserRole {
    Member,
    Admin,
}

pub type UserId = u64;

#[derive(Clone, Serialize)]
pub struct UserData {
    pub id: UserId,
    pub display_name: String,
    pub avatar_url: String,
    pub items: Vec<Item>,
    pub role: UserRole,
    pub votes: Vec<Vote>,
    pub reports: Vec<Report>
}