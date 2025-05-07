export default{
    namespaced: true, 
    state: {
        data:null
    },
   
    mutations: {
    setData(state, payload) {
        state.data = payload;
        },
    },
    actions: {

    },
     getters: {
        getData(state){
            return state.data
        }
    }

}