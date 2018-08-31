<template>
    <transition name="engrose" appear>
        <path :fill="fill" :stroke="stroke" :d="d" stroke-linecap="round" class="engrosed"></path>
    </transition>
</template>

<script>
    export default {
        props: ['start', 'end', 'fill', 'stroke', 'strokeWidth'],
        computed: {
            d() {
                let m = 'M' + this.start.x + ',' + this.start.y + ' ';
                let mid = Math.abs((this.end.x - this.start.x) / 2);
                let cVector1 = 'C' + (this.start.x + mid) + ',' + this.start.y + ' ';
                let cVector2 = (this.end.x - mid) + ',' + this.end.y + ' ';
                let cEnd = this.end.x + ',' + this.end.y;
                return m + cVector1 + cVector2 + cEnd;
            }
        }
    }
</script>

<style>
    .engrosed {
        stroke-width: 3px;
    }

    .engrose-enter {
        stroke-width: 0;
    }

    .engrose-enter-active {
        stroke-width: 3px;
        transition: .1s;
    }

    .engrose-leave {
        stroke-width: 3px;
    }

    .engrose-leave-active {
        stroke-width: 0;
        transition: .1s;
    }
</style>
