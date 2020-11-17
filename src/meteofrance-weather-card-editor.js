import { LitElement, html, css } from 'lit-element';
import { fireEvent as fireEvent } from 'custom-card-helpers';

import { weatherSensors as weatherSensors } from './const';

import localize from './localize/localize';

export class MeteofranceWeatherCardEditor extends LitElement {
  setConfig(config) {
    this.config = { ...config };
  }

  static get properties() {
    return {
      hass: {},
      config: {}
    };
  }

  get entity() {
    return this.config.entity || "";
  }

  get _name() {
    return this.config.name || "";
  }

  get _icons() {
    return this.config.icons || "";
  }

  get showCurrent() {
    return this.config.current !== false;
  }

  get showDetails() {
    return this.config.details !== false;
  }

  get showForecast() {
    return this.config.forecast !== false;
  }

  get number_of_forecasts() {
    return this.config.number_of_forecasts || 5;
  }

  // Météo France
  // Switches state
  get showOne_hour_forecast() {
    return this.config.one_hour_forecast !== false;
  }

  get showAlert_forecast() {
    return this.config.alert_forecast !== false;
  }

  // Config value
  get _alertEntity() {
    return this.config.alertEntity || "";
  }

  get _cloudCoverEntity() {
    return this.config.cloudCoverEntity || "";
  }

  get _freezeChanceEntity() {
    return this.config.freezeChanceEntity || "";
  }

  get _rainChanceEntity() {
    return this.config.rainChanceEntity || "";
  }

  get _rainForecastEntity() {
    return this.config.rainForecastEntity || "";
  }

  get _snowChanceEntity() {
    return this.config.snowChanceEntity || "";
  }

  get _uvEntity() {
    return this.config.uvEntity || "";
  }

  get _detailEntity() {
    return this.config.detailEntity || "";
  }

  render() {
    if (!this.hass) {
      return html``;
    }

    return html`
      <div class="card-config">
        <div>
          <paper-input
            label=${localize("editor.name")}
            .value="${this._name}"
            .configValue="${"name"}"
            @value-changed="${this._valueChanged}"
          ></paper-input>
          ${this.renderSensorPicker(localize("editor.details"), this._detailEntity, "detailEntity")}
          <paper-input
            label=${localize("editor.icons_location")}
            .value="${this._icons}"
            .configValue="${"icons"}"
            @value-changed="${this._valueChanged}"
          ></paper-input>
          <!-- Primary weather entity -->
          ${this.renderWeatherPicker(localize("editor.entity"), this.entity, "entity")}
          <!-- Switches -->
          <ul class="switches">
            ${this.renderSwitchOption(localize("editor.show_current"), this.showCurrent, "current")}
            ${this.renderSwitchOption(localize("editor.show_details"), this.showDetails, "details")}
            ${this.renderSwitchOption(localize("editor.show_one_hour"), this.showOne_hour_forecast, "one_hour_forecast")}
            ${this.renderSwitchOption(localize("editor.show_alert"), this.showAlert_forecast, "alert_forecast")}
            ${this.renderSwitchOption(localize("editor.show_alert"), this.showForecast, "forecast")}
          </ul>
          <!-- -->
          <paper-input
            label=${localize("editor.number_futur_forecast")}
            type="number"
            min="1"
            max="8"
            value=${this.number_of_forecasts}
            .configValue="${"number_of_forecasts"}"
            @value-changed="${this._valueChanged}"
          ></paper-input>
          <!-- Meteo France weather entities -->
          ${this.renderSensorPicker(localize("sensor.rain_chance"), this._rainChanceEntity, "rainChanceEntity")}
          ${this.renderSensorPicker(localize("sensor.uv"), this._uvEntity, "uvEntity")}
          ${this.renderSensorPicker(localize("sensor.cloud_cover"), this._cloudCoverEntity, "cloudCoverEntity")}
          ${this.renderSensorPicker(localize("sensor.freeze_chance"), this._freezeChanceEntity, "freezeChanceEntity")}
          ${this.renderSensorPicker(localize("sensor.snow_chance"), this._snowChanceEntity, "snowChanceEntity")}
          ${this.renderSensorPicker(localize("sensor.alert"), this._alertEntity, "alertEntity")}
          ${this.renderSensorPicker(localize("sensor.next_rain"), this._rainForecastEntity, "rainForecastEntity")}
        </div>
      </div>
    `;
  }

  renderWeatherPicker(label, entity, configAttr) {
    return this.renderPicker(label, entity, configAttr, "weather");
  }

  renderSensorPicker(label, entity, configAttr) {
    return this.renderPicker(label, entity, configAttr, "sensor");
  }

  renderPicker(label, entity, configAttr, domain) {
    return html`
              <ha-entity-picker
                label="${label}"
                .hass="${this.hass}"
                .value="${entity}"
                .configValue="${configAttr}"
                .includeDomains="${domain}"
                @change="${this._valueChanged}"
                allow-custom-entity
              ></ha-entity-picker>
            `
  }

  renderSwitchOption(label, state, configAttr) {
    return html`
      <li class="switch">
              <ha-switch
                .checked=${state}
                .configValue="${configAttr}"
                @change="${this._valueChanged}"
              ></ha-switch
              ><span>${label}</span>
            </div>
          </li>
    `
  }

  _weatherEntityChanged(entityName) {
    weatherSensors.forEach(
      (sensorSuffix, configAttribute) => {
        const entity = "sensor." + entityName + sensorSuffix;
        if (this.hass.states[entity] !== undefined)
          this.config = {
            ...this.config,
            [configAttribute]: entity,
          };
      }
    )
  }

  _valueChanged(ev) {
    if (!this.config || !this.hass) {
      return;
    }

    const target = ev.target;

    if (this[`show${capitalize(target.configValue)}`] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === "") {
        delete this.config[target.configValue];
      } else {
        if (target.configValue === "entity")
          this._weatherEntityChanged(target.value.split('.')[1]);
        this.config = {
          ...this.config,
          [target.configValue]:
            target.checked !== undefined ? target.checked : target.value,
        };
      }
    }

    fireEvent(
      this,
      "config-changed",
      {
        config: this.config
      },
      {
        bubbles: true,
        composed: true,
      });
  }

  static get styles() {
    return css`
      .switches {
        margin: 8px 0;
        display: flex;
        flex-flow: row wrap;
        list-style: none;
        padding: 0;
      }
      .switch {
        display: flex;
        align-items: center;
        width: 50%;
        height: 40px;
      }
      .switches span {
        padding: 0 16px;
      }
    `;
  }
}

customElements.define("meteofrance-weather-card-editor", MeteofranceWeatherCardEditor);

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}