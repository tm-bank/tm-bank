pub enum VoteType {
    Positive,
    Negative,
}

pub struct Vote {
    pub id: u64,
    pub is_map: bool,
    pub vote_type: VoteType
}

impl Vote {
    pub fn is_map(&self) -> bool {
        self.is_map
    }

    pub fn is_item(&self) -> bool {
        !self.is_map
    }
}