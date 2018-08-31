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
        overflow: scroll;
        top: 0;
        left: 0;
        right: -17px;
        bottom: -17px;
        position: absolute;
        /*position: fixed;*/
        /*width: 100vw;*/
        /*height: 100vh;*/
    }

    body {
        overflow: hidden;
        width: 100%;
        height: 100%;
        position: fixed;
        font-family: Calibri;
        font-size: 20px;
        background-color: rgb(50, 50, 50);
        color: white;
    }

    * {
        margin: 0;
        padding: 0;
        list-style: none;
        font-size: medium;
    }

    span {
        user-select: none;
    }

    .small span {
        font-size: small;
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
