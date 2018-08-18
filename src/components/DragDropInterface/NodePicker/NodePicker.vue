<template>
    <div class="node-picker"
         :class="{unfolded:unfolded}">
        <styl-button v-if="!unfolded" material="transparent"
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
            <styl-button v-for="(blueprint,key) in blueprints"
                         @click.stop="PickNode(blueprint)"
                         :key="key">
                {{ blueprint.label }}
            </styl-button>
        </div>
    </div>
</template>

<script>
    import blueprints from '../../../nodeBehaviours/blueprints';
    import {bus} from '../../../main';
    import StylButton from '../../Shared/Btn';
    import IconClose from '../../Shared/IconClose';
    import IconBurger from '../../Shared/IconBurger';
    import Spiner from '../../Shared/Misc/Spiner';
    import {mapActions} from 'vuex';

    export default {
        data() {
            return {
                blueprints: blueprints,
                unfolded: true,
            }
        },
        methods: {
            ...mapActions(['createNode']),
            PickNode(blueprint) {
                this.createNode(blueprint);
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
