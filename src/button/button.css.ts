import { css } from 'lit'

export const styles = css`
    @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Open Sans'), local('OpenSans'),
            url(https://themes.googleusercontent.com/static/fonts/opensans/v6/K88pR3goAWT7BTt32Z01mz8E0i7KZn-EPnyo3HZu7kw.woff)
                format('woff');
    }

    .dapplet-widget-results {
        position: relative;
        display: flex;
        align-items: center;

        font-family: 'Open Sans', sans-serif;

        border: 1px solid #d0d7de;
        border-radius: 9em;

        cursor: pointer;

        transition-property: all;
        transition-duration: 0.3s;
        transition-timing-function: ease-in-out;
    }

    .dapplet-widget-results:hover,
    .dapplet-widget-results.active {
        background: #ffffff;
        border: 1px solid #8028c6;
    }

    .dapplet-widget-results > img {
        width: 18px;
        margin: 0 6px 0 10px;
    }

    .dapplet-widget-results > div {
        display: inline-block;
        margin-right: 10px;
        margin-bottom: 1px;

        font-size: 14px;
        line-height: 17px;

        background: #57606a;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .dapplet-widget-results.active.changed > div {
        animation-name: change-color;
        animation-timing-function: ease-in-out;
        animation-duration: 1.5s;
        animation-iteration-count: 1;
    }

    .dapplet-widget-results.inactive.changed > div {
        animation-name: change-color-reverse;
        animation-timing-function: ease-in-out;
        animation-duration: 1.5s;
        animation-iteration-count: 1;
    }

    @keyframes change-color {
        0% {
            background: linear-gradient(149.06deg, #8028c6 13%, #363170 111.18%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        20% {
            background: linear-gradient(
                149.06deg,
                rgba(128, 40, 198, 0.2) 13%,
                rgba(54, 49, 112, 0.2) 111.18%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        80% {
            background: linear-gradient(
                149.06deg,
                rgba(128, 40, 198, 0.2) 13%,
                rgba(54, 49, 112, 0.2) 111.18%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        100% {
            background: linear-gradient(149.06deg, #8028c6 13%, #363170 111.18%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    }

    @keyframes change-color-reverse {
        0% {
            background: linear-gradient(149.06deg, #8028c6 13%, #363170 111.18%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        20% {
            background: linear-gradient(
                149.06deg,
                rgba(128, 40, 198, 0.2) 13%,
                rgba(54, 49, 112, 0.2) 111.18%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        80% {
            background: linear-gradient(
                149.06deg,
                rgba(128, 40, 198, 0.2) 13%,
                rgba(54, 49, 112, 0.2) 111.18%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        100% {
            background: #57606a;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    }

    .dapplet-widget-results:hover > div,
    .dapplet-widget-results.active > div {
        background: linear-gradient(149.06deg, #8028c6 13%, #363170 111.18%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .dapplet-widget-results.inactive.changed::before,
    .dapplet-widget-results.active.changed::after {
        position: absolute;
        right: 6px;

        background: linear-gradient(149.06deg, #8028c6 13%, #363170 111.18%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;

        opacity: 0;
        animation-name: up-and-down;
        animation-timing-function: ease-in-out;
        animation-duration: 1.5s;
        animation-iteration-count: 1;
    }

    .dapplet-widget-results.active.changed::after {
        content: '+1';
    }

    .dapplet-widget-results.inactive.changed::before {
        content: '-1';
    }

    @keyframes up-and-down {
        0% {
            top: 0;
            opacity: 0;
        }
        20% {
            top: -22px;
            opacity: 0.9;
        }
        30% {
            top: -20px;
            opacity: 1;
        }
        80% {
            top: -20px;
            opacity: 1;
        }
        100% {
            top: 0px;
            opacity: 0;
        }
    }

    :host {
        display: table;
        padding: 2px 8px 2px 20px;
    }
`
