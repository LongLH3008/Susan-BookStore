export function getMondayAndSunday(arg?: { lastweek: boolean }) {
    let today = new Date();
    if (arg?.lastweek) {
        const check = new Date(); // Lấy ngày hiện tại
        const lastWeek = new Date(check); // Tạo một bản sao của ngày hiện tại
        lastWeek.setDate(check.getDate() - 7); // Trừ đi 7 ngày
        today = lastWeek
    }
    const dayOfWeek = today.getDay(); // Lấy thứ trong tuần (0=Chủ nhật, 1=Thứ Hai, ..., 6=Thứ Bảy)

    let monday, sunday;

    if (dayOfWeek === 1) {
        // Nếu hôm nay là thứ 2
        monday = new Date(today); // Giữ nguyên ngày hôm nay
        sunday = new Date(today);
        sunday.setDate(sunday.getDate() + 6); // Chủ Nhật cuối tuần
    } else if (dayOfWeek === 0) {
        // Nếu hôm nay là Chủ Nhật
        monday = new Date(today);
        monday.setDate(monday.getDate() - 6); // Thứ Hai tuần trước
        sunday = new Date(today); // Chủ Nhật là hôm nay
    } else {
        // Nếu không phải Thứ Hai hay Chủ Nhật
        monday = new Date(today);
        monday.setDate(monday.getDate() - (dayOfWeek - 1)); // Tính Thứ Hai vừa qua
        sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6); // Chủ Nhật cuối tuần
    }

    return {
        monday: monday.toISOString().split('T')[0], // Format YYYY-MM-DD
        sunday: sunday.toISOString().split('T')[0], // Format YYYY-MM-DD
    };
}

export const getTimeMonth = (value: number) => {
    const year = new Date().getFullYear();
    let end;
    if (value == 4 || value == 6 || value == 9 || value == 11) {
        end = 30
    } else {
        end = 31
    }
    return {
        from: `${year}-${value}-01;`,
        to: `${year}-${value}-${value == 2 ? 28 : end}`
    }
}
