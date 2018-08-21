import {mapActions} from 'vuex';

export default {
    methods: {
        ...mapActions(['updateFormElem']),
        Change(e) {
            console.log(e.target.value);
            this.updateFormElem({
                formElem: this.formElem,
                newValue: e.target.value,
            });
        }
    }
};