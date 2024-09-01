
export interface GiaoHangNhanhDto {
    payment_type_id: number, // 1 bên người gủi thanh toán , 2 bên người nhận thanh toán *
    note?: string, // 
    required_note: required_note, // *
    return_phone?: string, // số điện thoại trả hàng khi không giao được 
    return_address?: string, // địa trỉ trả hàng khi không giao được 
    return_district_id?: string, // 
    return_ward_code?: string,
    client_order_code?: string,
    from_name?: string, // tên người gủi 
    from_phone?: string, // sdt người gửi 
    from_address?: string, // địa trỉ người gủi 
    from_ward_name?: string, // phường xá người gửi 
    from_district_name?: string, // quạn huyện người gửi hàng 
    from_province_name?: string, // tỉnh người gửi hàng 
    to_name: string, // tên ngườu nhận hàng *
    to_phone: string, // sdt người nhận hàng *
    to_address: string, // địa chỉ shipper tới giao hàng * 
    to_ward_name: string, // phường xã người nhận hàng *
    to_district_name: string, // quận huyện người nhận hàng *
    to_province_name: string, // tỉnh người nhận hàng * 
    cod_amount: number, // tiền thu hộ cho người gửi 
    content?: string, // nội dung đơn hàng 
    weight: number, // khối lượng đơn hàng *
    length: number, // chiều dài đơn hàng (cm) max: 200*
    width: number,  // chiều rộng đơn hàng (cm) max 200*
    height: number, // chiều cao đơn hàng (cm) max 200*
    cod_failed_amount?: number,
    pick_station_id?: number, // mã bưu cục
    deliver_station_id?: null,
    insurance_value?: number,
    service_id: number, // 2: chuyển phát thương mại, 5 chuyển phát truyền thống *
    service_type_id?: number
    coupon?: null,
    pickup_time?: number,
    pick_shift?: number[]
    items: productItem[]
}

interface productItem {
    name: string, //*
    code: string, //*
    quantity: number, //*
    price: number,
    length: number,
    width: number,
    weight: number,
    height: number
}

enum required_note 
{
    CHOTHUHANG,
    CHOXEMHANGKHONGTHU,
    KHONGCHOXEMHANG
}