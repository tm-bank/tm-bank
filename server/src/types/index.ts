// From core/src/types/tags.rs
export type ColorTags = "RED" | "ORANGE" | "YELLOW" | "GREEN" | "BLUE" | "PURPLE" | "BLACK" | "WHITE" | "GREY" | "PINK" | "BROWN" | "LIME" | "TEAL" | "MAGENTA";
export type StyleTags = "TECH" | "WOOD" | "GRASS" | "DIRT" | "PLASTIC" | "WET" | "REACTOR" | "ICE" | "FULLSPEED";
export type ThemeTags = "DARK" | "TERRAIN" | "NATURE" | "MINIMALISTIC" | "NADEO" | "COMPLEX" | "ABSTRACT" | "TOWERS" | "MEGASTRUCTURES" | "IMMERSIVE" | "VANILLA" | "VANILAPLUSPLUS" | "BLENDER" | "WATER" | "ROCKS" | "SHARP" | "CURVES" | "BLOCKY" | "ZONED";
export type SpecialThemeTags = "SPACE" | "PIRATES" | "MEDIEVAL" | "MODERN" | "SCIFI" | "CITY" | "FARM" | "FOREST" | "HILLS";
export type BlockTags = "PLATFORM" | "CANOPY" | "BANKED" | "HALFBANKED";
export type BaseTags = "VOID" | "NOSTADIUM" | "STADIUM" | "WATERBASE" | "GRASSBASE";

export type Tags =
    | { Color: ColorTags }
    | { Style: StyleTags }
    | { Theme: ThemeTags }
    | { SpecialTheme: SpecialThemeTags }
    | { Block: BlockTags }
    | { Base: BaseTags };

// From core/src/types/user.rs
export type AuthenticationStatus = "Guest" | "User";
export type UserRole = "Member" | "Admin";
export type UserId = number;

// From core/src/types/moderation.rs
export interface Report {
    id: number;
}

// From core/src/types/votes.rs
export type VoteType = "Positive" | "Negative";
export interface Vote {
    id: number;
    is_map: boolean;
    vote_type: VoteType;
}

// From core/src/types/items.rs
export type ItemExchangeId = number;
export interface Item {
    name: string;
    author: UserId;
    tags: Tags[];
    image_urls: string[];
    item_exchange_id: ItemExchangeId;
}

// From core/src/types/user.rs
export interface UserData {
    id: UserId;
    display_name: string;
    avatar_url: string;
    items: Item[];
    role: UserRole;
    votes: Vote[];
    reports: Report[];
}

// From core/src/types/maps.rs
export type ManiaExchangeId = number;
export interface Map {
    id: string;
    name: string;
    author: UserId;
    mania_exchange_id: ManiaExchangeId;
    linked_items: Item[];
    tags: Tags[];
    votes: number;
}
