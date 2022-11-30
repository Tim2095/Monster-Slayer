const getRandomValue = function(min,max) {
  return Math.floor(Math.random() * (max - min)) + min
}
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      winner: null,
      currentRound: 0,
    };
  },

  watch: {
    playerHealth(value) {
      if(value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw'
      } else if(value < 0) {
        this.winner = 'monster'
      }
    },

    monsterHealth(value) {
      if(value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw'
      } else if(value < 0) {
        this.winner = 'player'
      }
    }
  },

  computed: {
    monsterBarStyle() {
      if(this.monsterHealth < 0) {
        return {width: '0%'}
      }
      return { width: this.monsterHealth + "%" };
    },

    playerBarStyle() {
      if(this.playerHealth < 0) {
        return {width: '0%'}
      }
      return { width: this.playerHealth + "%" };
    },

    specialAttackUse() {
      return this.currentRound % 3 !== 0
    }
  },

  methods: {
    playerAttack() {
      this.currentRound++
      const attackValue = getRandomValue(5, 13)
      this.monsterHealth -= attackValue;
      this.monsterAttack()
    },

    monsterAttack() {
      const attackValue = getRandomValue(5, 15)
      this.playerHealth -= attackValue;
    },

    specialAttack() {
      this.currentRound++
      const attackValue = getRandomValue(8, 17)
      this.monsterHealth -= attackValue
      this.monsterAttack()
    },

    healPlayer() {
      this.currentRound++
      const healValue = getRandomValue(8, 14)
      this.playerHealth += healValue
      this.monsterAttack()
    },

    surrender() {
      this.playerHealth = 0
      this.winner = 'monster'
    },

    newGame() {
      this.playerHealth = 100
      this.monsterHealth = 100
      this.winner = null
      this.currentRound = 0
    }
  },
});

app.mount("#main-app");
