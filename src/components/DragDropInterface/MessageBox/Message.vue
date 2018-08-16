<template>
  <transition name="top" appear>
    <div class="message" :class="{
         'primary':message.status==='primary',
         'success':message.status==='success',
         'warning':message.status==='warning',
         'danger':message.status==='danger'
       }">
      <p>{{message.status}}</p>
      <p>{{message.text}}</p>
      <btn material="transparent"
           @click.stop="$emit('deleteMessage')">
        <icon-close class="small"></icon-close>
      </btn>
    </div>
  </transition>
</template>

<script>
  import Btn from '../../Form/Btn';
  import IconClose from '../../Form/IconClose';

  export default {
    props: ['message'],
    components: {
      Btn,
      IconClose
    }
  }
</script>

<style>
  .message {
    position: relative;
    background: lightgray;
    color: rgb(60, 60, 60);
    border-radius: 3px;
    padding: 5px;
    margin: 5px 5px 0 5px;
  }

  .message p:first-child {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 3px;
  }

  .message p {
    font-weight: normal;
    font-size: 16px;
    font-style: italic;
  }

  .message > .btn {
    position: absolute;
    top: 0;
    right: 0;
  }

  .message.danger {
    background: rgb(180, 94, 85);
  }

  .message.warning {
    background: rgb(185, 183, 84);
  }

  .message.primary {
    background: rgb(104, 138, 203);
  }

  .message.success {
    background: #5aaa7b;
  }
</style>
