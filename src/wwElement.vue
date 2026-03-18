<template>
    <div class="data-status" v-click-outside="() => open = false">
        <button class="status-trigger" @click="open = !open">
            <span v-if="isLoading" class="loader"></span>
            <div v-else class="dot-row">
                <span v-for="source in sources" :key="source.key" class="status-dot" :class="source.hasData ? 'dot-green' : 'dot-gray'"></span>
            </div>
            <span class="trigger-label">{{ isLoading ? 'Loading...' : 'Data Status' }}</span>
            <svg class="chevron" :class="{ 'is-open': open }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9" />
            </svg>
        </button>
        <div v-if="open" class="dropdown">
            <div class="status-list">
                <div v-for="source in sources" :key="source.key" class="status-row">
                    <span class="status-dot" :class="source.hasData ? 'dot-green' : 'dot-gray'"></span>
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
    </div>
</template>

<script>
import { ref, computed } from 'vue';

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
    'production_capacity',
    'production_jobs',
    'teammates',
];

export default {
    props: {
        content: { type: Object, required: true },
        wwEditorState: { type: Object, default: null },
    },
    emits: ['trigger-event'],
    directives: {
        'click-outside': {
            mounted(el, binding) {
                el._clickOutside = (e) => {
                    if (!el.contains(e.target)) binding.value();
                };
                document.addEventListener('pointerdown', el._clickOutside);
            },
            unmounted(el) {
                document.removeEventListener('pointerdown', el._clickOutside);
            },
        },
    },
    setup(props, { emit }) {
        const open = ref(false);

        const dataObj = computed(() => {
            const raw = props.content?.dataSource;
            if (!raw || typeof raw !== 'object') return {};
            return raw;
        });

        const isLoading = computed(() => {
            const obj = dataObj.value;
            if (!obj || Object.keys(obj).length === 0) return true;
            return KEYS.every(key => {
                const arr = obj[key];
                return !Array.isArray(arr) || arr.length === 0;
            });
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

        return { open, isLoading, sources, onRefresh };
    },
};
</script>

<style lang="scss" scoped>
.data-status {
    position: relative;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 13px;
}

.status-trigger {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background: #fff;
    cursor: pointer;
    transition: border-color 0.15s;
    width: 100%;

    &:hover {
        border-color: #d1d5db;
    }
}

.loader {
    width: 14px;
    height: 14px;
    border: 2px solid #e5e7eb;
    border-top-color: #6b7280;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    flex-shrink: 0;
}
@keyframes spin {
    to { transform: rotate(360deg); }
}

.dot-row {
    display: flex;
    gap: 3px;
    align-items: center;
}

.trigger-label {
    flex: 1;
    text-align: left;
    color: #374151;
    font-weight: 500;
}

.chevron {
    width: 14px;
    height: 14px;
    color: #9ca3af;
    transition: transform 0.15s;
    &.is-open { transform: rotate(180deg); }
}

.dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    z-index: 9999;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    padding: 10px;
}

.status-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 10px;
}

.status-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 3px 0;
}

.status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
}

.dot-green {
    background: #22c55e;
    box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
}

.dot-gray {
    background: #9ca3af;
    box-shadow: 0 0 0 2px rgba(156, 163, 175, 0.2);
}

.status-label {
    flex: 1;
    color: #374151;
    font-size: 12px;
}

.status-count {
    color: #9ca3af;
    font-size: 11px;
    min-width: 28px;
    text-align: right;
}

.btn-refresh {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    padding: 7px 10px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background: #f9fafb;
    color: #374151;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;

    svg {
        width: 13px;
        height: 13px;
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
