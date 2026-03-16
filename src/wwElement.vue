<template>
    <div class="data-status">
        <div class="status-list">
            <div v-for="source in sources" :key="source.key" class="status-row">
                <span class="status-dot" :class="source.hasData ? 'dot-green' : 'dot-yellow'"></span>
                <span class="status-label">{{ source.label }}</span>
                <span class="status-count">{{ source.count }}</span>
            </div>
        </div>
        <button class="btn-refresh" @click="onRefresh">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            Refresh
        </button>
    </div>
</template>

<script>
import { computed } from 'vue';

const KEYS = [
    'booking_headers_overview',
    'booking_items_overview',
    'change_log',
    'inventory_data_bookings',
    'mockup_requests_overview',
    'orderplan_attbookings',
    'orderplan_deliveries',
    'orderplan_headers',
    'orderplan_lines',
    'production_jobs',
    'teammates',
];

export default {
    props: {
        content: { type: Object, required: true },
        wwEditorState: { type: Object, default: null },
    },
    emits: ['trigger-event'],
    setup(props, { emit }) {
        const dataObj = computed(() => {
            const raw = props.content?.dataSource;
            if (!raw || typeof raw !== 'object') return {};
            return raw;
        });

        const sources = computed(() =>
            KEYS.map(key => {
                const arr = dataObj.value[key];
                const count = Array.isArray(arr) ? arr.length : 0;
                return {
                    key,
                    label: key,
                    count,
                    hasData: count > 0,
                };
            })
        );

        function onRefresh() {
            /* wwEditor:start */
            if (props.wwEditorState?.isEditing) return;
            /* wwEditor:end */
            emit('trigger-event', { name: 'refresh', event: { value: null } });
        }

        return { sources, onRefresh };
    },
};
</script>

<style lang="scss" scoped>
.data-status {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 13px;
    padding: 12px;
    border-radius: 8px;
    background: #fff;
    border: 1px solid #e5e7eb;
}

.status-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 12px;
}

.status-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
}

.dot-green {
    background: #22c55e;
    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
}

.dot-yellow {
    background: #eab308;
    box-shadow: 0 0 0 2px rgba(234, 179, 8, 0.2);
}

.status-label {
    flex: 1;
    color: #374151;
}

.status-count {
    color: #9ca3af;
    font-size: 12px;
    min-width: 30px;
    text-align: right;
}

.btn-refresh {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background: #f9fafb;
    color: #374151;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;

    svg {
        width: 14px;
        height: 14px;
    }

    &:hover {
        background: #f3f4f6;
        border-color: #d1d5db;
    }

    &:active {
        background: #e5e7eb;
    }
}
</style>
