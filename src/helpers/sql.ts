export const like = (column: string, search: string) => {
    return `LOWER(${column}) like '%${String(search)
        .replace(/'/g, "\\'")
        .toLowerCase()}%'`;
};
