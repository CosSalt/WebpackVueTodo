<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus='autofocus'
      placeholder='接下去要做什么？'
      v-model = 'willTodo'
      @keyup.enter="addTodo"
    >
    <Item 
      :todo="todo"
      v-for="todo in todos"
      :key='todo.id'
      @del='delTodo'
    />
    <Tabs :filter="filter" @toggleFilter='toggleTheFilter'></Tabs>
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
export default {
  components:{
    Item,Tabs
  },
  data(){
    return{
      todos: [],
      filter: 'all',
      id: 0,
      willTodo: '',
    }
  },
  computed:{
    filterTodos(){
      
    }
  },
  methods:{
    addTodo(e){
      debugger;
      if(!this.willTodo) return;
      this.todos.unshift({
        id: this.id++,
        content: this.willTodo.trim(),
        completed: false
      })
      this.willTodo = '';//清空数据
    },
    delTodo(id){
      var todos = this.todos;
      for(let i=0; i< todos.length;i++){
        if(todos[i].id === id){
          todos.splice(i,1);
          break;
        }
      }
    },
    toggleTheFilter(state){
      if(!!state){
        this.filter = state
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app{
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 #aabbcc;
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.5)
}
</style>

