type ProcessingCallback = (row: any, i: number) => Promise<any>;

export const createPromise = async (
    array: any[],
    processing: ProcessingCallback,
): Promise<any[]> => {
    let i = 0;
    const result = [];
    while (i < array.length) {
        const row = array[i];
        result.push(await processing(row, i));
        i++;
    }
    return result;
};

export const delay = async (timeout = 500) => {
    return await new Promise((resolve) => setTimeout(resolve, timeout));
};
