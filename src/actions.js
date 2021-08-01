export const getAll = async () => {
    return (await fetch("/counterparty/all", {method: "GET"})).json();
}

export const deleteItem = async (id) => {
    return (await fetch(`/counterparty/${id}`, {
        method: "DELETE"
    })).json()
}

export const findByName = async (name) => {
    return (await fetch(`/counterparty/${name}`, {method: "GET"})).json();
}

export const findByAccountAndBic = async (account, bic) => {
    return (await fetch(`/counterparty?account=${account}&bic=${bic}`, {method: "GET"})).json();
}
