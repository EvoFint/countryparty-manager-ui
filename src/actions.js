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

export const addNewItem = async (form) => {
    return (await fetch('/counterparty',
        {
            method: "POST",
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })).json();
}

export const changeItem = async (form) => {
    return (await fetch('/counterparty',
        {
            method: "PUT",
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    )).json();
}
