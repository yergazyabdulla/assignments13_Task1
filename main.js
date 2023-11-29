Vue.component('timeline-event', {
    props: ['event'],
    template: `
        <div class="timeline-event">
            <div class="event-date">{{ event.date }}</div>
            <div class="event-details">
                <h3>{{ event.title }}</h3>
                <p>{{ event.description }}</p>
            </div>
        </div>
    `,
});

Vue.component('timeline', {
    props: ['events'],
    data() {
        return {
            sortOrder: 'asc',
        };
    },
    computed: {
        sortedEvents() {
            const events = [...this.events];
            return events.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            });
        },
    },
    template: `
        <div class="timeline">
            <label for="sortOrder">Sort Order:</label>
            <select id="sortOrder" v-model="sortOrder">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
            <div v-for="event in sortedEvents" :key="event.title">
                <timeline-event :event="event"></timeline-event>
            </div>
        </div>
    `,
});

new Vue({
    el: '#app',
    data: {
        events: [
            {
                title: 'Event 1',
                date: '2023-01-01',
                description: 'Description for Event 1.',
            },
            {
                title: 'Event 2',
                date: '2023-02-15',
                description: 'Description for Event 2.',
            },
        ],
    },
    template: '<timeline :events="events"></timeline>',
});
