export const description = {
    img: {
        description: "image as blob",
        optional: true,
        TYPE: "string",
    },
    label: {
        description: "text label",
        optional: true,
        TYPE: "string",
    },
    tooltip: {
        description: "text tooltip",
        optional: true,
        TYPE: "string",
    },
    disabled: {
        description: "makes the widget disabled",
        optional: true,
        TYPE: "boolean",
    },
    hidden: {
        description: "hides the widget",
        optional: true,
        TYPE: "boolean",
    },
    exec: {
        description: "action on click",
        optional: true,
        TYPE: "(ctx: any, me: IButtonState) => void",
    },
    init: {
        description: "action through initialisation",
        optional: true,
        TYPE: "(ctx: any, me: IButtonState) => void",
    },
};
