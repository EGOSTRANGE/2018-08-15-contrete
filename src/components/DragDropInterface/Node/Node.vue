<template>
    <transition name="fade" appear>
        <div class="node"
             :key="'node-'+node.id"
             :class="{dragged:dragged}"
             :style="{transform:'translate('+offset.x+'px'+', ' + offset.y+'px)'}">
            <div class="node-content"
                 :style="{'transform-origin':(offset.x - dragOffset.x)+'px '+(offset.y-dragOffset.y)+'px'}">
                <div class="node-bar draggable-area"
                     @click.stop="DragDrop">
                    <span>{{ node.blueprint.label }}</span>
                    <btn material="transparent"
                         @click.stop="Delete">
                        <icon-close class="small"></icon-close>
                    </btn>
                </div>
                <div class="node-body">
                    <div v-if="node.outputs.length>0" class="node-output-area">
                        <ul>
                            <node-output v-for="output in node.outputs"
                                         :output="output"
                                         :key="output.id">
                            </node-output>
                        </ul>
                    </div>

                    <div v-if="node.formElems.length>0" class="node-form-area">
                        <ul>
                            <li v-for="formElem in node.formElems">
                                <form-elem :form-elem="formElem"
                                           :key="formElem.id">
                                </form-elem>
                            </li>
                        </ul>
                    </div>

                    <div v-if="node.inputs.length>0" class="node-input-area">
                        <ul>
                            <node-input v-for="input in node.inputs"
                                        :input="input"
                                        :key="input.id">
                            </node-input>
                        </ul>
                    </div>
                </div>
            </div>
            {{node.state}}
        </div>
    </transition>
</template>

<script>
    import {mapActions} from 'vuex';
    import NodeInput from './NodeInput';
    import NodeOutput from './NodeOutput';
    import Btn from '../../Shared/Btn';
    import Spiner from '../../Shared/Misc/Spiner';
    import IconClose from '../../Shared/IconClose';
    import FormElem from './FormElems/FormElem';

    export default {
        props: ['node', 'mousePosition'],
        data() {
            return {
                inputList: [],
                outputList: [],
                dragOffset: {x: 30, y: 30},
                offset: {x: 30, y: 30},
                dragged: false,
                evaluation: 0,
            };
        },
        methods: {
            ...mapActions(['update', 'deleteNode']),
            DragDrop(event) {
                this.dragOffset.x = event.clientX;
                this.dragOffset.y = event.clientY;

                if (this.dragged)
                    this.Drop();
                else
                    this.Drag();
                console.log(this.dragOffset.x + ', ' + this.dragOffset.y);
            },
            Drag() {
                this.dragged = true;
                this.UpdateNodePosition();
            },
            Drop() {
                this.dragged = false;
                this.UpdateNodePosition();
            },
            Delete() {
                this.deleteNode(this.node);
            },
            UpdateNodePosition() {
                this.offset.x = this.mousePosition.x - this.dragOffset.x;
                this.offset.y = this.mousePosition.y - this.dragOffset.y;
                this.CalculateChildrenPositions();
                if (this.dragged)
                    window.requestAnimationFrame(this.UpdateNodePosition);
            },
            CalculateChildrenPositions() {
                this.inputList.map((elem) => {
                    elem.CalculateConnectionDrawPosition();
                });
                this.outputList.map((elem) => {
                    elem.CalculateConnectionDrawPosition();
                });
            },
        },
        components: {
            NodeInput,
            NodeOutput,
            FormElem,
            Btn,
            Spiner,
            IconClose,
        },
        mounted() {
            this.offset.x = this.mousePosition.x - this.dragOffset.x;
            this.offset.y = this.mousePosition.y - this.dragOffset.y;
            this.Drag();
        }
    }
</script>

<style>
    .node {
        position: absolute;
        top: 0;
        left: 0;
    }

    .node-content {
        min-width: 100px;
        display: block;
        position: relative;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .2);
        transition: box-shadow .2s, transform .2s, border .2s;
        transform: scale(1);
        border-radius: 3px;
        border: 1px solid rgba(0, 0, 0, .125);
    }

    .node.dragged {
        z-index: 1;
    }

    .node.dragged .node-content {
        box-shadow: 0 15px 12px -7px rgba(0, 0, 0, .2);
        /*transform: scale(1.025);*/
    }

    .node-bar {
        position: relative;
        display: flex;
        justify-content: space-between;
        background: rgb(100, 100, 100);
        border-radius: 3px 3px 0 0;
        padding: 3px 3px 3px 10px;
        font-weight: bold;
        cursor: move;
        font-size: 24px;
    }

    .node-body {
        background: rgba(160, 160, 160, .8);
        border-radius: 0 0 3px 3px;
    }

    .node-output-area {
        text-align: right;
        padding: 5px 0 5px 15px;
    }

    .node-output-area ul,
    .node-input-area ul {
        display: flex;
        flex-direction: column;
    }

    .node-form-area {
        padding: 5px 15px;
    }

    .node-input-area {
        text-align: left;
        padding: 5px 15px 5px 0;
    }
</style>
