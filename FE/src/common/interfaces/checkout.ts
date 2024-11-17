type product = {
    bookId: string
    quantity: number,
    code: null | string
}

interface ICheckout {
    userId: string
    paymentMethod: 'COD'
    name: string
    phone: string
    address: string
    ward: string
    district: string
    province: string
    country: string
    districtId: number,
    wardCode: string
    products: product[]
}

interface ICaclCheckout {
    userId: string,
    products: product[]
}

interface IBankingPayment {
    amount: number,
    bankCode: string,
    orderInfo: { products: product[] }
}