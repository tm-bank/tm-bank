use serde::Serialize;

use crate::types::{tags::Tags, user::UserId};

pub type ItemExchangeId = u64;

#[derive(Clone, Serialize)]
pub struct Item {
    pub name: String,
    pub author: UserId,
    pub tags: Vec<Tags>,
    pub image_urls: Vec<String>,
    pub item_exchange_id: ItemExchangeId, 
}