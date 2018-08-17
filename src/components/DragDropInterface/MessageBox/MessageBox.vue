<template>
  <div class="message-box"
       :class="{'unfolded':unfolded}">
    <btn class="message-box-btn"
         material="transparent"
         @click="unfolded=!unfolded">
      <transition name="fade" appear mode="out-in">
        <icon-close v-if="unfolded" class="small"></icon-close>
        <icon-panel v-else></icon-panel>
      </transition>
    </btn>
    <div class="message-board">
      <message v-for="(message,index) in messages"
               :message="message"
               :key="message.id"
               @deleteMessage="DeleteMessage(index)">
      </message>
    </div>
  </div>
</template>

<script>
  import IconPanel from '../../Shared/IconPanel';
  import IconClose from '../../Shared/IconClose';
  import {bus} from '../../../main';
  import Message from './Message';
  import Btn from '../../Shared/Btn';

  export default {
    data() {
      return {
        messages: [],
        unfolded: false,
        scrolling: false,
        id: 0,
      }
    },
    methods: {
      DeleteMessage(index) {
        this.messages.splice(index, 1);
      }
    },
    components: {
      Message,
      Btn,
      IconPanel,
      IconClose,
    },
    mounted() {
      bus.$on('message', response => {
        response.id = this.id;
        this.id++;
        this.messages.unshift(response);
        if (response.status === 'warning' || response.status === 'danger')
          this.unfolded = true;
      });
    }
  }
</script>

<style>
  .message-box {
    right: 5px;
    bottom: 5px;
    position: fixed;
    transform: translateX(102%);
    transition: .2s;
    width: 200px;
    height: 300px;
    background: rgb(70, 70, 70);
    border-radius: 3px;
  }

  .message-board {
    overflow-y: scroll;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
  }

  .message-box.unfolded {
    transform: translateX(0);
  }

  .message-box-btn {
    position: absolute;
    right: 100%;
    bottom: 0;
    margin-bottom: 0;
    margin-right: 5px;
  }

  .message-box > .btn {
    position: absolute;
    right: 100%;
    bottom: 0;
  }
</style>
