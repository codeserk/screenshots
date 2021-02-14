<template>
  <ion-page>
    <ion-content>
      <birds class="birds" />
      <div class="text-container">
        <div class="frame">
          <img src="/assets/img/us.jpg" />
        </div>
        <div class="typing"></div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import Birds from '@/components/Birds'
import Typed from 'typed.js'

export default defineComponent({
  components: {
    Birds,
  },

  setup() {
    const state = {
      typed: ref(null),
    }

    onMounted(() => {
      state.typed.value = new Typed('.typing', {
        strings: [
          'Hola osilla!',
          'Aunque no lo diga a menudo, yo <strong>te he querio!</strong>',
          'Nunca dejes de hacer la rara ❤️',
        ],
        typeSpeed: 50,
        backSpeed: 20,
        startDelay: 2000,
        backDelay: 2000,
        fadeOutDelay: 100,
        showCursor: false,
      })
    })

    return {
      ...state,
    }
  },
})
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'birds';
  src: url('/assets/font/Lobster.ttf') format('truetype');
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.birds {
  animation: 2s fade-in ease-in-out;
  animation-iteration-count: 1;
}

.text-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'birds', sans-serif;
  text-align: center;

  .typing {
    display: inline;
    margin: 0 20px;
    padding: 12px;
    border-radius: 24px;
    background: #c689feaa;
    color: white;
    font-size: 12vw;
    text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
    filter: drop-shadow(0 0 1px black);

    strong {
      text-decoration: underline;
    }
  }

  .frame {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    margin: 10px 20px;
    padding: 0;
    border: solid 5vmin #eee;
    border-top-color: #ddd;
    border-right-color: #eee;
    border-bottom-color: #fff;
    border-left-color: #eee;
    border-radius: 2px;
    background-color: #ddc;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25) inset, 0 5px 10px 5px rgba(0, 0, 0, 0.25);
    text-align: center;
    opacity: 0;
    animation: 2s fade-in ease-in-out forwards;
    animation-delay: 12s;
    animation-iteration-count: 1;

    &::before {
      content: '';
      position: absolute;
      top: -2vmin;
      right: -2vmin;
      bottom: -2vmin;
      left: -2vmin;
      border-radius: 2px;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25) inset;
    }
    &::after {
      content: '';
      position: absolute;
      top: -2.5vmin;
      right: -2.5vmin;
      bottom: -2.5vmin;
      left: -2.5vmin;
      border-radius: 2px;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25);
    }
  }
}
</style>
