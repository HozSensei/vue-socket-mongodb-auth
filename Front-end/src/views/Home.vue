<template>
  <div class="home">
    <h1>Home page</h1>
    <button @click="sendMessage">Test server Socket.io</button><button @click="logout">Log out</button>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'Home',
  components: {
    
  },
  data() {
    return{
      socket : io('localhost:8081')
    }
  },
  methods:{
    logout(){
      this.$auth0.logout({ returnTo: window.location.origin });
    },
    sendMessage(e) {
        e.preventDefault();

        this.socket.emit('SEND_MESSAGE', {
            user: 'Hoz',
            message: 'Hello World'
        });
    }
  },
  mounted() {
    this.socket.on('MESSAGE', (data) => {
        console.log(data);
    });
  }
}
</script>
