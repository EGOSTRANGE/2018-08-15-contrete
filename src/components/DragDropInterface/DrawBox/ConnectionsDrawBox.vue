<template>
  <svg class="draw-box"
       width="100%"
       height="100%"
       @click.stop="$emit('drop')">
    <cubic-bezier v-for="(connection,index) in connections"
                  :start="connection.output.position"
                  :end="connection.input.position"
                  fill="none"
                  stroke="skyblue"
                  strokeWidth="3"
                  :key="connection.input.id">
    </cubic-bezier>
    <cubic-bezier v-if="showHotConnection"
                  :start="hotConnection.output.position"
                  :end="hotConnection.input.position"
                  fill="none"
                  stroke="skyblue"
                  strokeWidth="3"
                  :key="'hot'">
    </cubic-bezier>
  </svg>
</template>

<script>
  import CubicBezier from './CubicBezier';
  import {mapGetters} from 'vuex';

  export default {
    props: ['hotConnection', 'showHotConnection'],
    computed: {
      ...mapGetters([
        'connections',
      ]),
    },
    components: {
      CubicBezier
    }
  }
</script>

<style>

</style>
