// import {mapActions} from 'vuex';

export default {
    props: ['formElem','index'],
    methods: {
        Change(e) {
            console.log('login value of input: ' + e.target.value);
            this.$emit('change', e.target.value);
        },
    },
};