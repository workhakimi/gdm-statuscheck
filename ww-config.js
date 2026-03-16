export default {
    editor: {
        label: { en: 'Data Status Indicator' },
        icon: 'monitor',
        customSettingsPropertiesOrder: [
            {
                label: 'Data Source',
                isCollapsible: true,
                properties: ['dataSource'],
            },
        ],
    },
    triggerEvents: [
        {
            name: 'refresh',
            label: { en: 'On Refresh' },
            event: { value: null },
            default: true,
        },
    ],
    properties: {
        dataSource: {
            label: { en: 'Data source object' },
            type: 'Object',
            section: 'settings',
            bindable: true,
            defaultValue: {},
            /* wwEditor:start */
            bindingValidation: {
                type: 'object',
                tooltip: '{ booking_headers_overview: [...], booking_items_overview: [...], ... }',
            },
            /* wwEditor:end */
        },
    },
};
