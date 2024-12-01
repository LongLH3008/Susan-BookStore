export interface IInfoUserDto {
    userId: string; // lien ket khoa ngoai voi user
    province: string; // tỉnh
    district: string  // quận
    ward : string // phuong
    address: string; // địa chỉ
    phone : string;
}

export interface InforQueriesDto {
    userId?: string,
    page?: number,
    limit?: number
}

export interface InfoQueryResponseDto {
    data: IInfoUserDto[],
    total: number,
    page: number,
    limit: number
}
