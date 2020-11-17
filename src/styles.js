import { css as css } from 'lit-element';

export default css`
    ha-card {
    cursor: pointer;
    margin: auto;
    overflow: hidden;
    padding: 0.5em 1em;
    position: relative;
    }

    ha-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
    }

    .spacer {
    padding-top: 1em;
    }

    .clear {
    clear: both;
    }

    .flow-row {
    display: flex;
    flex-flow: row wrap;
    }

    .flow-column {
    display: flex;
    flex-flow: column wrap;
    }

    .ha-icon {
    height: 0.8em;
    margin-right: 5px;
    color: var(--paper-item-icon-color);
    }

    /* Current Forecast */
    .current {
    flex-wrap: nowrap;
    }

    .current > *:first-child {
    min-width: 100px;
    height: 100px;
    margin-right: 10px;
    }

    .current > *:last-child  {
    margin-left: auto;
    min-width: max-content;
    text-align: right;
    }

    .current > *:last-child sup {
    font-size: initial;
    }

    .current > li {
    font-size: 2em;
    line-height: 1.2;
    align-self: center;
    }

    .current > li > *:last-child {
    line-height: 1;
    font-size: 0.6em;
    color: var(--secondary-text-color);
    }

    /* Details */
    .details {
    justify-content: space-between;
    font-weight: 300;
    }

    .details ha-icon {
    height: 22px;
    margin-right: 5px;
    color: var(--paper-item-icon-color);
    }

    .details > li {
    flex-basis: auto;
    width: 50%;
    }

    .details > li:nth-child(2n) {
    text-align: right;
    }

    .details > li:nth-child(2n) ha-icon {
    margin-right: 0;
    margin-left: 8px;
    float: right;
    }

    /* One Hour Forecast */
    .oneHour {
    height: 1em;
    }

    .oneHour > li {
    background-color: var(--paper-item-icon-color);
    border-right: 1px solid var(--lovelace-background, var(--primary-background-color));
    }

    .oneHour > li:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    }

    .oneHour > li:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: 0;
    }

    /* One Hour Labels */
    .rain-0min, .rain-5min, .rain-10min, .rain-15min, .rain-20min, .rain-25min {
    flex: 1 1 0;
    }

    .rain-35min, .rain-45min, .rain-55min {
    flex: 2 1 0;
    }

    .oneHourLabel > li {
    flex: 1 1 0;
    }

    /* One Hour Header */
    .oneHourHeader {
    justify-content: space-between;
    }

    .oneHourHeader li:last-child {
    text-align: right;
    }

    /* Alert */
    .alert {
    border-radius: 5px;
    padding: 5px 10px;
    font-weight: 600;
    color: var(--primary -text -color);
    margin: 2px;
    }

    .alert > *:first-child {
    margin-right: auto;
    }

    .alert.jaune {
    background-color: rgba(255,235,0,0.5);
    }

    .alert.orange {
    background-color: rgba(255,152,0,0.5);
    }

    .alert.rouge {
    background-color: rgba(244,67,54,0.5);
    }

    /* Forecast */
    .forecast {
    justify-content: space-between;
    flex-wrap: nowrap;
    }

    .forecast > li {
    flex: 1;
    border-right: 0.1em solid #d9d9d9;
    }

    .forecast > *:last-child {
    border-right: 0;
    }

    .forecast ul.day {
    align-items: center;
    }

    .forecast ul.day > *:first-child {
    text-transform: uppercase;
    }

    .forecast ul.day .highTemp {
    font-weight: bold;
    }

    .forecast ul.day .lowTemp {
    color: var(--secondary-text-color);
    }

    .forecast ul.day .icon {
    width: 50px;
    height: 50px;
    margin-right: 5px;
    }`;