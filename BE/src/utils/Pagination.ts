class Pagination<T> {
    private items: T[];
    private totalItems: number;
    private currentPage: number;
    private itemsPerPage: number;

    constructor(items: T[], currentPage: number = 1, itemsPerPage: number = 10) {
        this.items = items;
        this.totalItems = items.length;
        this.currentPage = currentPage;
        this.itemsPerPage = itemsPerPage;
    }

    public getCurrentPage(): number {
        return this.currentPage;
    }

    public getItemsPerPage(): number {
        return this.itemsPerPage;
    }

    public getTotalItems(): number {
        return this.totalItems;
    }

    public getTotalPages(): number {
        return Math.ceil(this.totalItems / this.itemsPerPage);
    }

    public getItems(): T[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.items.slice(startIndex, endIndex);
    }

    public hasNextPage(): boolean {
        return this.currentPage < this.getTotalPages();
    }

    public hasPreviousPage(): boolean {
        return this.currentPage > 1;
    }

    public nextPage(): void {
        if (this.hasNextPage()) {
            this.currentPage++;
        }
    }

    public previousPage(): void {
        if (this.hasPreviousPage()) {
            this.currentPage--;
        }
    }

    public goToPage(page: number): void {
        if (page >= 1 && page <= this.getTotalPages()) {
            this.currentPage = page;
        }
    }
}