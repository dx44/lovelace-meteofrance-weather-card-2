export const defaultIconPath = "/local/community/lovelace-meteofrance-weather-card/icons/";

export const weatherIconsDay = {
    clear: "day",
    "clear-night": "night",
    cloudy: "cloudy",
    fog: "fog",
    hail: "rainy-7",
    lightning: "thunder",
    "lightning-rainy": "lightning-rainy",
    partlycloudy: "cloudy-day-3",
    pouring: "rainy-6",
    rainy: "rainy-5",
    snowy: "snowy-6",
    "snowy-rainy": "snowy-rainy",
    sunny: "day",
    windy: "windy",
    "windy-variant": "windy",
    exceptional: "!!",
};

export const weatherIconsNight = {
    ...weatherIconsDay,
    clear: "night",
    sunny: "night",
    partlycloudy: "cloudy-night-3",
    "windy-variant": "cloudy-night-3",
};

export const windDirections = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSO",
    "SO",
    "OSO",
    "O",
    "ONO",
    "NO",
    "NNO",
    "N",
];

export const phenomenaIcons = {
    "Vent violent": "mdi:weather-windy",
    "Pluie-inondation": "mdi:weather-pouring",
    Orages: "mdi:weather-lightning",
    Inondation: "mdi:home-flood",
    "Neige-verglas": "mdi:weather-snowy-heavy",
    Canicule: "mdi:weather-sunny-alert",
    "Grand-froid": "mdi:snowflake",
    Avalanches: "mdi:image-filter-hdr",
    "Vagues-submersion": "mdi:waves",
};

export const rainForecastValues = new Map([
    ["Pas de valeur", 0.1],
    ["Temps sec", 0.1],
    ["Pluie faible", 0.4],
    ["Pluie modérée", 0.7],
    ["Pluie forte", 1],
]);

export const weatherSensors = [
    ["cloudCoverEntity", "_cloud_cover"],
    ["rainChanceEntity", "_rain_chance"],
    ["freezeChanceEntity", "_freeze_chance"],
    ["snowChanceEntity", "_snow_chance"],
    ["uvEntity", "_uv"],
    ["rainForecastEntity", "_next_rain"]
];
