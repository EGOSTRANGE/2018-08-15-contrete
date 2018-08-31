export default {
    props: ['formElem'],
    methods: {
        Change(e) {
            this.$emit('change', e.target.value);
        },
    },
};