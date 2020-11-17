import { LitElement, html } from 'lit-element';
import { hasConfigOrEntityChanged, fireEvent } from 'custom-card-helpers';

import './meteofrance-weather-card-editor';
import localize from './localize/localize';
import styles from './styles';

import { defaultIconPath, weatherIconsDay, phenomenaIcons, weatherSensors, weatherIconsNight, windDirections, rainForecastValues } from './const';

window.customCards = window.customCards || [];
window.customCards.push({
  type: "meteofrance-weather-card",
  name: "Carte Météo France par HACF",
  description: "Carte pour l'intégration Météo France.",
  preview: true,
  documentationURL: "https://github.com/hacf-fr/lovelace-meteofrance-weather-card",
});

class MeteofranceWeatherCard extends LitElement {
  static get properties() {
    return {
      config: {},
      hass: {},
    };
  }

  static get styles() {
    return styles;
  }

  static async getConfigElement() {
    //await import("./meteofrance-weather-card-editor.js");
    return document.createElement("meteofrance-weather-card-editor");
  }

  static getStubConfig(hass, unusedEntities, allEntities) {
    let entities = this.getDefaultWeatherEntity(unusedEntities, allEntities);

    if (entities) {
      let sensors = this.getWeatherEntitiesFromEntity(hass, entities.entity.split(".")[1], allEntities);
      entities = {
        ...entities,
        ...sensors
      };
    }
    return entities;
  }

  static getDefaultWeatherEntity(unusedEntities, allEntities) {
    let entity = unusedEntities.find((eid) => eid.split(".")[0] === "weather");
    if (!entity) {
      entity = allEntities.find((eid) => eid.split(".")[0] === "weather");
    }
    return { entity };
  }

  static getWeatherEntitiesFromEntity(hass, entityName, allEntities) {
    let entities = {};
    weatherSensors.forEach(
      (sensor) => {
        const sensorName = "sensor." + entityName + sensor[0];
        if (hass.states[sensorName] !== undefined) {
          let sensor = allEntities[sensorName];
          if (!sensor) {
            entities = {
              ...entities,
              [sensor[1]]: sensorName,
            };
          }
        }
      }
    )
    return entities;
  }

  get entity() {
    return this.getSensor("entity");
  }

  getSensor(name) {
    return this.hass.states[this.config[name]];
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error(localize("error.no_entity"));
    }
    this.config = config;
  }

  shouldUpdate(changedProps) {
    return hasConfigOrEntityChanged(this, changedProps);
  }

  isSelected(option) {
    return option === undefined || option === true;
  }

  render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    this.numberElements = 0;

    if (!this.entity) {
      return html`
        <style>
          .not-found {
            flex: 1;
            background-color: yellow;
            padding: 8px;
          }
        </style>
        <ha-card>
          <div class="not-found">
            ${localize("error.entity_unavailable")}: ${this.config.entity}
          </div>
        </ha-card>
      `;
    }

    return html`
      <ha-card @click="${this._handleClick}">
        ${this.isSelected(this.config.current)
        ? this.renderCurrent() : ""}

        ${this.isSelected(this.config.details)
        ? this.renderDetails() : ""}

        ${this.isSelected(this.config.one_hour_forecast)
        ? this.renderOneHourForecast() : ""}

        ${this.isSelected(this.config.alert_forecast)
        ? this.renderAlertForecast() : ""}

        ${this.isSelected(this.config.forecast)
        ? this.renderForecast(this.entity.attributes.forecast) : ""}
      </ha-card>
    `;
  }

  renderCurrent() {
    this.numberElements++;
    return html`
        <ul class="flow-row current">
          <li style="background: none, url('${this.getWeatherIcon(
      this.entity.state.toLowerCase(),
      this.getSensor("sun.sun")
    )}') no-repeat; background-size: contain;">
          </li>
          <li>
            ${this.getPhenomenaText(this.entity.state, this.getSensor("sun.sun"))}
            ${this.config.name
        ? html` <div> ${this.config.name} </div>`
        : ""}
          </li>
          <li>
              ${this.getUnit("temperature") == "°F"
        ? Math.round(this.entity.attributes.temperature)
        : this.entity.attributes.temperature}
              <sup>${this.getUnit("temperature")}</sup>
            <ul>
              ${this.renderMeteoFranceDetail(this.getSensor("detailEntity"))}
            </ul>
          </li>
        </ul>
    `;
  }

  renderDetails() {
    const sun = this.hass.states["sun.sun"];
    let next_rising;
    let next_setting;

    if (sun) {
      next_rising = new Date(sun.attributes.next_rising);
      next_setting = new Date(sun.attributes.next_setting);
    }

    this.numberElements++;

    return html`
      <ul class="flow-row details ${this.numberElements > 1 ? " spacer" : ""}">
        <!-- Cloudy -->
        ${this.renderMeteoFranceDetail(this.getSensor("cloudCoverEntity"))}
        <!-- Wind -->
        ${this.renderDetail(
      (this.entity.attributes.wind_bearing == undefined
        ? " "
        : windDirections[parseInt((this.entity.attributes.wind_bearing + 11.25) / 22.5)] + " ")
      + this.entity.attributes.wind_speed, localize("weather.wind"), "mdi:weather-windy", this.getUnit("speed"))}
        <!-- Rain -->
        ${this.renderMeteoFranceDetail(this.getSensor("rainChanceEntity"))}
        <!-- Humidity -->
        ${this.renderDetail(this.entity.attributes.humidity, localize("weather.humidity"), "mdi:water-percent", "%")}
        <!-- Freeze -->
        ${this.renderMeteoFranceDetail(this.getSensor("freezeChanceEntity"))}
        <!-- Pressure -->
        ${this.renderDetail(this.entity.attributes.pressure, localize("weather.air_pressure"), "mdi:gauge", this.getUnit("air_pressure"))}
        <!-- Snow -->
        ${this.renderMeteoFranceDetail(this.getSensor("snowChanceEntity"))}
        <!-- UV -->
        ${this.renderMeteoFranceDetail(this.getSensor("uvEntity"))}
      </ul>
      <ul class="flow-row details">
        <!-- Sunset up -->
        ${next_rising
        ? this.renderDetail(next_rising.toLocaleTimeString(), localize("weather.sunset_up"), "mdi:weather-sunset-up")
        : ""}
        <!-- Sunset down -->
        ${next_setting
        ? this.renderDetail(next_setting.toLocaleTimeString(), localize("weather.sunset_down"), "mdi:weather-sunset-down")
        : ""}
      </ul>
    `;
  }

  renderMeteoFranceDetail(entity) {
    return entity !== undefined
      ? this.renderDetail(
        entity.state,
        localize((entity.entity_id).replace((this.config.entity).split(".")[1] + "_", "")),
        entity.attributes.icon,
        entity.attributes.unit_of_measurement)
      : ""
  }

  renderDetail(state, label, icon, unit) {
    return html`
      <li>
        <ha-icon icon="${icon}" title="${label}"></ha-icon>
        ${state}${unit ? html`${unit}` : ""}
      </li>
    `
  }

  renderOneHourForecast() {
    const rainForecast = this.getSensor("rainForecastEntity");

    if (!rainForecast || rainForecast.length === 0) {
      return html``;
    }

    this.numberElements++;

    const startHour = this.getOneHourBeginHour(rainForecast);

    return html`
      <ul class="flow-row oneHourHeader ${this.numberElements > 1 ? " spacer" : ""}">
        <li> ${startHour} </li>
        <li>${this.getOneHourNextRainText(rainForecast)}</li>
        <li> ${startHour + 1} </li>
      </ul>
      <ul class="flow-row oneHour">
        ${html`
        ${this.getOneHourForecast(rainForecast).map(
      (forecast) => html`
        <li class="rain-${forecast[0]}min" style="opacity: ${forecast[1]}" title="${forecast[2] + " " + (forecast[0] == 0
          ? " actuellement"
          : "dans " + forecast[0] + " min")}">
        </li>`
    )}
        `}
      </ul>
      <ul class="flow-row oneHourLabel">
        <li></li>
        <li>10</li>
        <li>20</li>
        <li>30</li>
        <li>40</li>
        <li>50</li>
      </ul>`;
  }

  renderAlertForecast() {
    const alertForecast = this.getSensor("alertEntity");

    if (!alertForecast) {
      return html``;
    }

    this.numberElements++;

    return html`
      ${this.renderAlertType("Rouge", alertForecast)}
      ${this.renderAlertType("Orange", alertForecast)}
      ${this.renderAlertType("Jaune", alertForecast)}`;
  }

  renderAlertType(level, alertForecast) {
    const alerts = this.getAlertForecast(level, alertForecast);

    if (alerts.length == 0)
      return html``

    let lclevel = level.toLowerCase();

    return html`
    <ul class="flow-row alert ${lclevel}">
      <li>
        <ha-icon icon="mdi:alert"></ha-icon>Vigilance ${lclevel} en cours
      </li>
        ${this.getAlertForecast(level, alertForecast).map(
      (phenomena) => html`
      <li>
        <ha-icon icon="${phenomena[1]}" title="${phenomena[0]}"></ha-icon>
      </li>`
    )}
      </div>
    </ul>`
  }

  renderForecast(forecast) {
    if (!forecast || forecast.length === 0) {
      return html``;
    }

    const lang = this.hass.selectedLanguage || this.hass.language;
    const isDaily = this.isDailyForecast(forecast);

    this.numberElements++;

    return html`
      <ul class="flow-row forecast ${this.numberElements > 1 ? " spacer" : ""}">
        ${forecast
        .slice(
          0,
          this.config.number_of_forecasts
            ? this.config.number_of_forecasts
            : 5
        )
        .map(
          (daily) => this.renderDailyForecast(daily, lang, isDaily)
        )}
      </ul>`;
  }

  renderDailyForecast(daily, lang, isDaily) {
    return html`
        <li>
          <ul class="flow-column day">
            <li>
            ${isDaily
        ? new Date(daily.datetime).toLocaleDateString(lang, {
          weekday: "short",
        })
        : new Date(daily.datetime).toLocaleTimeString(lang, {
          hour: "2-digit",
          minute: "2-digit",
        })}
            </li>
            <li class="icon" style="background: none, url('${this.getWeatherIcon(
          daily.condition.toLowerCase()
        )}') no-repeat; background-size: contain">
            </li>
            <li class="highTemp">
            ${daily.temperature}${this.getUnit("temperature")}
            </li>
          ${daily.templow !== undefined
        ? html`
            <li class="lowTemp">
            ${daily.templow}${this.getUnit("temperature")}
            </li>
          `
        : ""}
          ${daily.precipitation !== undefined &&
        daily.precipitation !== null
        ? html`
            <li class="precipitation">
              ${Math.round(daily.precipitation * 10) / 10} ${this.getUnit("precipitation")}
            </li>
          `
        : ""}
          ${daily.precipitation_probability !== undefined &&
        daily.precipitation_probability !== null
        ? html`
            <li class="precipitation_probability">
            ${Math.round(daily.precipitation_probability)} ${this.getUnit("precipitation_probability")}
            </li>
          `
        : ""}
          </ul>
        </li>`;
  }

  isDailyForecast(forecast) {
    const diff = new Date(forecast[1].datetime) - new Date(forecast[0].datetime);
    return diff > 3600000;
  }

  getOneHourBeginHour(rainForecastEntity) {
    const options = { hour: '2-digit', minute: '2-digit' };

    const beginHour = new Date(rainForecastEntity.attributes["forecast_time_ref"]);
    return beginHour.toLocaleTimeString([], options);
  }

  getOneHourForecast(rainForecastEntity) {
    let rainForecastList = [];
    for (let [time, value] of Object.entries(
      rainForecastEntity.attributes["1_hour_forecast"]
    )) {
      if (time != undefined && time.match(/[0-9]*min/g)) {
        time = time.replace("min", "").trim();
        rainForecastList.push([time, rainForecastValues.get(value), value]);
      }
    }

    return rainForecastList;
  }

  getOneHourNextRainText(rainForecastEntity) {
    for (let [time, value] of Object.entries(
      rainForecastEntity.attributes["1_hour_forecast"]
    )) {
      if (time != undefined && rainForecastValues.get(value) > 0.1) {
        return value + ((time == "0 min") ? " actuellement !" : " dans " + time + ".");
      }
    }

    return "Pas de pluie dans l'heure."
  }

  getAlertForecast(color, alertEntity) {
    if (alertEntity == undefined) {
      return [];
    }

    let phenomenaList = [];
    for (const [currentPhenomena, currentPhenomenaColor] of Object.entries(
      alertEntity.attributes
    )) {
      if (currentPhenomenaColor == color) {
        phenomenaList.push([
          currentPhenomena,
          phenomenaIcons[currentPhenomena],
        ]);
      }
    }

    return phenomenaList;
  }

  getWeatherIcon(condition, sun) {
    return `${this.config.icons
      ? this.config.icons
      : defaultIconPath
      }${sun && sun.state == "below_horizon"
        ? weatherIconsNight[condition]
        : weatherIconsDay[condition]
      }.svg`;
  }

  getPhenomenaText(phenomena, sun) {
    return `${sun && sun.state == "below_horizon" && phenomena == "sunny"
      ? localize("phenomena.clear-night")
      : localize("phenomena." + phenomena)
      }`;
  }

  getUnit(measure) {
    const lengthUnit = this.hass.config.unit_system.length;
    switch (measure) {
      case "air_pressure":
        return lengthUnit === "km" ? "hPa" : "inHg";
      case "length":
        return lengthUnit;
      case "precipitation":
        return lengthUnit === "km" ? "mm" : "in";
      case "precipitation_probability":
        return "%";
      case "speed":
        return lengthUnit === "km" ? "km/h" : "mph";
      default:
        return this.hass.config.unit_system[measure] || "";
    }
  }

  _handleClick() {
    fireEvent(
      this,
      "hass-more-info",
      {
        entityId: this.config.entity
      },
      {
        bubbles: true,
        composed: true,
      });
  }

  getCardSize() {
    return 3;
  }
}
customElements.define("meteofrance-weather-card", MeteofranceWeatherCard);
