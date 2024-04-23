import store from "../store";


const uploadFile = async (fd) => {
    const token = store.getState().auth.token

    const formd = new FormData()
    formd.append("photo", fd)

    const file = await fetch('http://marketplace.node.ed.asmer.org.ua/upload', {
        method: "POST",
        headers: token ? {Authorization: 'Bearer ' + token} : {},
        body: formd
    })

    return file
}

export default uploadFile