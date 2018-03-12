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
      v-for="todo in filterTodos"
      :key='todo.id'
      @del='delTodo'
    />
    <Tabs :filter="filter" :todosNum="todosNum" @toggleFilter='toggleTheFilter' 
      @clearCompleted='clearAllCompleted'
    />
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
      debugger
      if(this.filter === 'all'){
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(
        todo => completed === todo.completed
      )
    },
    todosNum(){
      return this.filterTodos.length
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
      let todos = this.todos
      const index = todos.findIndex(item => item.id === id);
      if(index >=0 ){
        todos.splice(index, 1)
      }
    },
    toggleTheFilter(state){
      if(!!state){
        this.filter = state
      }
    },
    clearAllCompleted(){
      if(confirm("确定删除已完成的 todos")){
        this.todos = this.todos.filter(
          todo => !todo.completed
        )
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

