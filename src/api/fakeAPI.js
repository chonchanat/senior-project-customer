import CustomerData from "../fakeData/CustomerData";

function signin(phone, password) {
    return new Promise((resolve, reject) => {
        const foundUser = CustomerData.find(
            (user) => user.phone === phone && user.password === password
        )

        setTimeout(() => {
            if (foundUser) {
                resolve(foundUser);
            } else {
                reject('Not found user');
            }
        }, 1000)
    })
}

export { signin };