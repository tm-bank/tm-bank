use crate::types::{items::Item, tags::Tags, user::UserId};

pub type ManiaExchangeId = u64;
pub struct Map {
    pub id: String,
    pub name: String,
    pub author: UserId,
    pub mania_exchange_id: ManiaExchangeId,
    pub linked_items: Vec<Item>,
    pub tags: Vec<Tags>,
    pub votes: u64,
}