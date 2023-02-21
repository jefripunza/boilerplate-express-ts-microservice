import Rest from "../src/utils/rest";

// ============================================================

describe("Testing - All Utils", () => {
    test("Rest (default)", async () => {
        const result = await Rest({
            url: "http://103.56.206.121/",
        });
        if (result.error) {
            console.log({ error: result.text });
        }
        expect(result.status).toBe(200);
    });

    // test("filename : function", async () => {
    //   //
    // });
});
