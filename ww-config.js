export default {
    editor: {
        label: { en: 'Data Status Indicator' },
        icon: 'monitor',
        customSettingsPropertiesOrder: [
            {
                label: 'Data Sources',
                isCollapsible: true,
                properties: [
                    'bookingHeadersOverview',
                    'bookingItemsOverview',
                    'changeLog',
                    'inventoryDataBookings',
                    'mockupRequestsOverview',
                    'orderplanAttbookings',
                    'orderplanDeliveries',
                    'orderplanHeaders',
                    'orderplanLines',
                    'productionJobs',
                    'teammates',
                ],
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
        bookingHeadersOverview: {
            label: { en: 'booking_headers_overview' },
            type: 'ObjectList',
            section: 'settings',
            bindable: true,
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: { type: 'array', tooltip: 'Array of booking header records' },
            /* wwEditor:end */
        },
        bookingItemsOverview: {
            label: { en: 'booking_items_overview' },
            type: 'ObjectList',
            section: 'settings',
            bindable: true,
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: { type: 'array', tooltip: 'Array of booking item records' },
            /* wwEditor:end */
        },
        changeLog: {
            label: { en: 'change_log' },
            type: 'ObjectList',
            section: 'settings',
            bindable: true,
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: { type: 'array', tooltip: 'Array of change log records' },
            /* wwEditor:end */
        },
        inventoryDataBookings: {
            label: { en: 'inventory_data_bookings' },
            type: 'ObjectList',
            section: 'settings',
            bindable: true,
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: { type: 'array', tooltip: 'Array of inventory data records' },
            /* wwEditor:end */
        },
        mockupRequestsOverview: {
            label: { en: 'mockup_requests_overview' },
            type: 'ObjectList',
            section: 'settings',
            bindable: true,
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: { type: 'array', tooltip: 'Array of mockup request records' },
            /* wwEditor:end */
        },
        orderplanAttbookings: {
            label: { en: 'orderplan_attbookings' },
            type: 'ObjectList',
            section: 'settings',
            bindable: true,
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: { type: 'array', tooltip: 'Array of orderplan attached booking records' },
            /* wwEditor:end */
        },
        orderplanDeliveries: {
            label: { en: 'orderplan_deliveries' },
            type: 'ObjectList',
            section: 'settings',
            bindable: true,
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: { type: 'array', tooltip: 'Array of orderplan delivery records' },
            /* wwEditor:end */
        },
        orderplanHeaders: {
            label: { en: 'orderplan_headers' },
            type: 'ObjectList',
            section: 'settings',
            bindable: true,
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: { type: 'array', tooltip: 'Array of orderplan header records' },
            /* wwEditor:end */
        },
        orderplanLines: {
            label: { en: 'orderplan_lines' },
            type: 'ObjectList',
            section: 'settings',
            bindable: true,
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: { type: 'array', tooltip: 'Array of orderplan line records' },
            /* wwEditor:end */
        },
        productionJobs: {
            label: { en: 'production_jobs' },
            type: 'ObjectList',
            section: 'settings',
            bindable: true,
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: { type: 'array', tooltip: 'Array of production job records' },
            /* wwEditor:end */
        },
        teammates: {
            label: { en: 'teammates' },
            type: 'ObjectList',
            section: 'settings',
            bindable: true,
            defaultValue: [],
            /* wwEditor:start */
            bindingValidation: { type: 'array', tooltip: 'Array of teammate records' },
            /* wwEditor:end */
        },
    },
};
