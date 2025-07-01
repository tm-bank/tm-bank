pub enum ColorTags {
    RED,
    ORANGE,
    YELLOW,
    GREEN,
    BLUE,
    PURPLE,
    BLACK,
    WHITE,
    GREY,
    PINK,
    BROWN,
    LIME,
    TEAL,
    MAGENTA,
}

impl ToString for ColorTags {
    fn to_string(&self) -> String {
        match self {
            Self::RED => "Red",
            Self::ORANGE => "Orange",
            Self::YELLOW => "Yellow",
            Self::GREEN => "Green",
            Self::BLUE => "Blue",
            Self::PURPLE => "Purple",
            Self::BLACK => "Black",
            Self::WHITE => "White",
            Self::GREY => "Grey",
            Self::PINK => "Pink",
            Self::BROWN => "Brown",
            Self::LIME => "Lime",
            Self::TEAL => "Teal",
            Self::MAGENTA => "Magenta",
        }
        .into()
    }
}

pub enum StyleTags {
    TECH,
    WOOD,
    GRASS,
    DIRT,
    PLASTIC,
    WET,
    REACTOR,
    ICE,
    FULLSPEED,
}

impl ToString for StyleTags {
    fn to_string(&self) -> String {
        match self {
            Self::TECH => "Tech",
            Self::WOOD => "Wood",
            Self::GRASS => "Grass",
            Self::DIRT => "Dirt",
            Self::PLASTIC => "Plastic",
            Self::WET => "Wet",
            Self::REACTOR => "Reactor",
            Self::ICE => "Ice",
            Self::FULLSPEED => "Fullspeed",
        }.into()
    }
}

pub enum ThemeTags {
    DARK,
    TERRAIN,
    NATURE,
    MINIMALISTIC,
    NADEO,
    COMPLEX,
    ABSTRACT,
    TOWERS,
    MEGASTRUCTURES,
    IMMERSIVE,
    VANILLA,
    VANILAPLUSPLUS,
    BLENDER,
    WATER,
    ROCKS,
    SHARP,
    CURVES,
    BLOCKY,
    ZONED,
}

impl ToString for ThemeTags {
    fn to_string(&self) -> String {
        match self {
            Self::DARK => "Dark",
            Self::TERRAIN => "Terrain",
            Self::NATURE => "Nature",
            Self::MINIMALISTIC => "Minimalistic",
            Self::NADEO => "Nadeo",
            Self::COMPLEX => "Complex",
            Self::ABSTRACT => "Abstract",
            Self::TOWERS => "Towers",
            Self::MEGASTRUCTURES => "Megastructures",
            Self::IMMERSIVE => "Immersive",
            Self::VANILLA => "Vanilla",
            Self::VANILAPLUSPLUS => "Vanilaplusplus",
            Self::BLENDER => "Blender",
            Self::WATER => "Water",
            Self::ROCKS => "Rocks",
            Self::SHARP => "Sharp",
            Self::CURVES => "Curves",
            Self::BLOCKY => "Blocky",
            Self::ZONED => "Zoned",
        }.into()
    }
}

pub enum SpecialThemeTags {
    SPACE,
    PIRATES,
    MEDIEVAL,
    MODERN,
    SCIFI,
    CITY,
    FARM,
    FOREST,
    HILLS,
}

impl ToString for SpecialThemeTags {
    fn to_string(&self) -> String {
        match self {
            Self::SPACE => "Space",
            Self::PIRATES => "Pirates",
            Self::MEDIEVAL => "Medieval",
            Self::MODERN => "Modern",
            Self::SCIFI => "Scifi",
            Self::CITY => "City",
            Self::FARM => "Farm",
            Self::FOREST => "Forest",
            Self::HILLS => "Hills",
        }.into()
    }
}

///TODO: Add more block tags
pub enum BlockTags {
    PLATFORM,
    CANOPY,
    BANKED,
    HALFBANKED,
}

impl ToString for BlockTags {
    fn to_string(&self) -> String {
        match self {
            Self::PLATFORM => "Platform",
            Self::CANOPY => "Canopy",
            Self::BANKED => "Banked",
            Self::HALFBANKED => "HalfBanked",
        }.into()
    }
}

pub enum BaseTags {
    VOID,
    NOSTADIUM,
    STADIUM,
    WATERBASE,
    GRASSBASE,
}

impl ToString for BaseTags {
    fn to_string(&self) -> String {
        match self {
            Self::VOID => "Void",
            Self::NOSTADIUM => "NoStadium",
            Self::STADIUM => "Stadium",
            Self::WATERBASE => "WaterBase",
            Self::GRASSBASE => "GrassBase",
        }.into()
    }
}

pub enum Tags {
    Color(ColorTags),
    Style(StyleTags),
    Theme(ThemeTags),
    SpecialTheme(SpecialThemeTags),
    Block(BlockTags),
    Base(BaseTags),
}
