import store from "../store";


const uploadFile = async (fd) => {
    const token = store.getState().auth.token

    console.log(token)

    const formd = new FormData()

    formd.append("photo", fd)

    console.log(formd.keys())


    const file = await fetch('http://marketplace.node.ed.asmer.org.ua/upload', {
        method: "POST",
        headers: token ? {Authorization: 'Bearer ' + token} : {},
        body: formd
    }).then(res => res.json())

    console.log(file)
}

export default uploadFile