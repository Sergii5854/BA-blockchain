const chainStore = {
    data:{
        users: ["Sergii", "Andrey"]
    },
    methods:{
        addUser(name){
            chainStore.data.users.push(name)
        }
    }

}

export default chainStore