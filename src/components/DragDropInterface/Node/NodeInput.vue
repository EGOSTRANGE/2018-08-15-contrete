<template>
    <li class="node-input"
        :class="{'connected': input.connectedOutput !== null}"
        @click="OnClick"
        @mouseenter="OnMouseEnter"
        @mouseleave="OnMouseLeave">
        <span>{{ input.blueprint.label }}</span>
        <dot></dot>
        <transition name="right" appear>
            <div v-if="showScissors"
                 class="input-connection-cut-icon"
                 @click.stop="Disconnect">
                <icon-scisors class="small"></icon-scisors>
            </div>
        </transition>
    </li>
</template>

<script>
    import {bus} from '../../../main';
    import IdTag from '../../Shared/Misc/IdTag';
    import StylButton from '../../Shared/Btn';
    import IconScissors from '../../Shared/IconScissors';
    import Dot from '../../Shared/Misc/Dot'

    export default {
        props: ['input'],
        data() {
            return {
                showScissors: false,
            };
        },
        methods: {
            OnClick() {
                if (!(this.input.connectedOutput !== null))
                    bus.$emit('inputClick', this.input);
            },
            OnMouseEnter() {
                if (this.input.connectedOutput !== null)
                    this.showScissors = true;
                else
                    bus.$emit('inputEnter', this.input);
            },
            OnMouseLeave() {
                if (this.input.connectedOutput !== null)
                    this.showScissors = false;
                else
                    bus.$emit('inputLeave', this.input);
            },
            Disconnect() {
                if (this.showScissors) {
                    this.showScissors = false;
                    bus.$emit('scissorsClick', this.input);
                }
            },
            CalculateConnectionDrawPosition() {
                let boundRect = this.$el.getBoundingClientRect();
                boundRect.x += window.scrollX;
                boundRect.y += window.scrollY;
                this.input.position.x = boundRect.left + 10.0;
                this.input.position.y = (boundRect.top + (boundRect.height / 2.0));
            }
        },
        components: {
            IdTag,
            StylButton,
            IconScisors:
            IconScissors,
            Dot
        },
        mounted() {
            this.CalculateConnectionDrawPosition();
            this.$parent.$data.inputList.push(this);
        }
    }
</script>

<style>
    .node-input {
        position: relative;
        display: inline-block;
        margin: 2px 0;
        padding: 0 5px;
        background: rgba(70, 70, 70, .75);
        border-radius: 0 3px 3px 0;
        text-align: left;
    }

    .node-input.connected {
        background: rgba(100, 100, 100, .75);
        color: rgb(230, 230, 230);
    }

    .node-input:not(.connected):hover {
        background: rgba(200, 200, 200, .75);
        color: rgb(80, 80, 80);
    }

    .node-input span {
        margin-left: 25px;
    }

    .node-input .input-connection-cut-icon {
        position: absolute;
        right: 100%;
        top: 0;
        height: 100%;
        left: -2.25vmin;
        fill: grey;
    }

    .node-input .input-connection-cut-icon:hover {
        fill: lightgrey;
    }
</style>
