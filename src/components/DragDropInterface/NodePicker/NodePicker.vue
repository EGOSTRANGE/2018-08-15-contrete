<template>
    <div class="node-picker"
         :class="{unfolded:unfolded}">
        <styl-button material="transparent"
                     @click.stop="unfolded=true">
            <icon-burger></icon-burger>
        </styl-button>
        <div class="picker-body">
            <div>
                <styl-button material="transparent"
                             @click.stop="unfolded=false">
                    <icon-close class="small"></icon-close>
                </styl-button>
            </div>
            <styl-button v-for="(blueprint, key) in blueprints"
                         @click.stop="PickNode(key)"
                         :key="key">
                {{ blueprint.label }}
            </styl-button>
        </div>
        <!--<transition name="left" appear="">-->
        <!--<spiner v-if="!blueprintsUpdated"></spiner>-->
        <!--</transition>-->
    </div>
</template>

<script>
    import {bus} from '../../../main';
    import StylButton from '../../Form/Btn';
    import IconClose from '../../Form/IconClose';
    import IconBurger from '../../Form/IconBurger';
    import Spiner from '../../Misc/Spiner';
    // import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        data() {
            return {
                blueprints: {
                    num: {
                        label: 'Number',
                        inputs: [],
                        outputs: [{
                            label: 'out',
                        }],
                        formElems: [
                            {
                                label: 'Number',
                                type: 'Num',
                            }
                        ],
                    },
                    sum: {
                        label: 'Sum',
                        inputs: [
                            {
                                label: 'A',
                            },
                            {
                                label: 'B'
                            }
                        ],
                        outputs: [
                            {
                                label: 'out',
                            }
                        ],
                        formElems: [],
                    },
                },
                unfolded: true,
            }
        },
        methods: {
            ...mapActions(['createNode']),
            PickNode(key) {
                console.log(key);
                console.log(this.blueprints[key]);
                this.createNode(this.blueprints[key]);
            },
        },
        components: {
            StylButton,
            IconClose,
            IconBurger,
            Spiner
        },
    }
</script>

<style>
    .node-picker {
        position: fixed;
        top: 0;
        left: 0;
    }

    .picker-body {
        position: absolute;
        top: 0;
        display: flex;
        background: rgb(70, 70, 70);
        flex-direction: column;
        width: 10vw;
        height: 100vh;
        transform: translateX(-100%);
        transition: .2s ease-in-out;
        padding: 35px 15px;
        box-shadow: 3px 0 3px 0 rgba(0, 0, 0, .2);
    }

    .picker-body > div {
        position: absolute;
        right: 0;
        top: 0;
    }

    .node-picker.unfolded .picker-body {
        transform: translateX(0);
    }
</style>
