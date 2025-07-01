use crate::items::Item;

pub enum AuthenticationStatus {
    Guest,
    User,
}

pub enum UserRole {
    Member,
    Admin,
}

pub type UserId = u64;

pub struct UserData {
    pub id: UserId,
    pub display_name: String,
    pub items: Vec<Item>,
    pub role: UserRole,
}