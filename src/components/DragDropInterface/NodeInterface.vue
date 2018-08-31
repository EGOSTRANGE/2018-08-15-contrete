<template>
    <div class="drag-box"
         @mousemove="UpdateMousePosition">

        <node v-for="node in nodes"
              :node="node"
              :mousePosition="mousePosition"
              :key="node.id">
        </node>
        <draw-box :connections="connections"
                  :showHotConnection="draggingOutput || draggingInput"
                  :hotConnection="hotConnection"
                  @drop="Drop">
        </draw-box>
        <node-picker></node-picker>
        <message-box></message-box>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import {bus} from '../../main';
    import Node from './Node/Node.vue';
    import DrawBox from './DrawBox/ConnectionsDrawBox';
    import NodePicker from './NodePicker/NodePicker';
    import MessageBox from './MessageBox/MessageBox';

    export default {
        data() {
            let mousePosition = {x: 0, y: 0};
            let dummyPlug = {position: mousePosition};
            let hotConnection = {
                input: dummyPlug,
                output: dummyPlug,
                id: 'hot!'
            };
            return {
                mousePosition,
                dummyPlug,
                //visual connections
                inPreview: false,
                draggingInput: false,
                draggingOutput: false,
                hotConnection
            };
        },
        computed: {
            ...mapGetters([
                'nodes',
                'connections',
            ]),
        },
        methods: {
            ...mapActions([
                'connect',
                'disconnect',
                'initFormElem',
            ]),
            UpdateMousePosition(event) {
                this.dummyPlug.position.x = event.pageX;
                this.dummyPlug.position.y = event.pageY;
            },
            //visual
            DragInput(input) {
                this.hotConnection.output = this.dummyPlug;
                this.hotConnection.input = input;
                this.draggingInput = true;
            },
            DragOutput(output) {
                this.hotConnection.output = output;
                this.hotConnection.input = this.dummyPlug;
                this.draggingOutput = true;
            },
            Drop() {
                if (this.draggingOutput || this.draggingInput) {
                    this.draggingOutput = false;
                    this.draggingInput = false;
                }
            },
            Preview(elem) {
                this.inPreview = true;
                if (this.draggingInput)
                    this.hotConnection.output = elem;
                else
                    this.hotConnection.input = elem;
            },
            Unpreview() {
                this.inPreview = false;
                if (this.draggingInput)
                    this.hotConnection.output = this.dummyPlug;
                else this.hotConnection.input = this.dummyPlug;
            },
            Connect() {
                this.inPreview = false;
                this.draggingInput = false;
                this.draggingOutput = false;

                if (this._IsRecursion(this.hotConnection.input, this.hotConnection.output)) {
                    bus.$emit('message', {
                        status: 'warning',
                        text: "Can't connect. Potential endless recursion"
                    });
                    return;
                }
                this.connect({
                    input: this.hotConnection.input,
                    output: this.hotConnection.output,
                });
            },
            _IsRecursion(input, output) {
                return this.IsRecursion(input, output, this.IsRecursion);
            },
            IsRecursion: (input, output, recursion) => {
                if (output.node === input.node)
                    return true;
                else {
                    let finded = false;
                    input.node.outputs.find(nextOutput => {
                        nextOutput.connectedInputs.find(connectedInput => {
                            finded = (recursion(connectedInput, output, recursion));
                            return finded;
                        });
                    });
                    return finded;
                }
            },
        },
        components: {
            Node,
            DrawBox,
            NodePicker,
            MessageBox
        },
        mounted() {
            //vars
            this.dummyPlug.position = this.mousePosition;
            //nodeInputs
            bus.$on('inputClick', input => {
                if (this.draggingOutput)
                    this.Connect();
                else if (!this.draggingInput)
                    this.DragInput(input);
            });
            bus.$on('inputEnter', input => {
                if (this.draggingOutput)
                    this.Preview(input);
            });
            bus.$on('inputLeave', input => {
                if (this.inPreview && this.draggingOutput)
                    this.Unpreview();
            });
            //nodeOutputs
            bus.$on('outputClick', output => {
                if (this.draggingInput) {
                    this.Connect();
                }
                else if (!this.draggingOutput)
                    this.DragOutput(output);
            });
            bus.$on('outputEnter', output => {
                if (this.draggingInput)
                    this.Preview(output);
            });
            bus.$on('outputLeave', output => {
                if (this.inPreview && this.draggingInput)
                    this.Unpreview();
            });
            bus.$on('scissorsClick', input => {
                this.disconnect(input);
            })
        }
    }
</script>

<style>
    .drag-box {
        width: 5000px;
        height: 5000px;
    }
</style>
