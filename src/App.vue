<template>
    <div id="app">
        <node-interface></node-interface>
    </div>
</template>

<script>
    import {bus} from './main';
    import NodeInterface from './components/DragDropInterface/NodeInterface';

    export default {
        components: {
            NodeInterface
        },
        mounted() {
            bus.$emit('appMounted');
        }
    }
</script>

<style language="scss">
    @import 'style/transitions.scss';
    @import 'style/vars.scss';

    #app {
        position: fixed;
        width: 100vw;
        height: 100vh;
    }

    body {
        font-family: Calibri;
        font-size: 20px;
        background-color: rgb(50, 50, 50);
        color: white;
    }

    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    span {
        user-select: none;
    }

    .small span {
        font-size: calc(8px + 1vmin);
    }

    .icon {
        width: calc(10px + 2vmin);
        height: calc(10px + 2vmin);
    }

    .small .icon,
    .small.icon {
        width: calc(8px + 1vmin);
        height: calc(8px + 1vmin);
    }

    .big .icon,
    .big.icon {
        width: calc(10px + 3vmin);
        height: calc(10px + 3vmin);
    }

</style>
