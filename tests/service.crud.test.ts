import * as Service from "../src/services/crud.service";
import * as Users from "../src/models/repositories/users.repo";

const users = [
    {
        name: "Paijo Loro Untu Jowo",
        username: "paijo123",
        password: "hahahaha",
    },
    {
        name: "Poniman Lahir Legi",
        username: "ponimanlegi",
        password: "ngawurto",
    },
    {
        name: "Paijem Butuh Hiburan Jowo",
        username: "paijemuwu",
        password: "awokwkwkwk",
    },
];

describe("Testing - CrudService", () => {
    test("CRUD : add", async () => {
        let i = 0;
        while (i < users.length) {
            const user = users[i];
            await Service.add(user.name, user.username, user.password);
            i++;
        }
        const length = await Users.count();
        expect(length).toBe(i + 1); // with superman
    });

    test("CRUD : pagination", async () => {
        const query = {
            search: "Jowo",
        };
        const get_data: any = await Service.pagination(query);
        expect(
            JSON.stringify({
                total_find: get_data.render?.data.length,
                meta_page: get_data.render?.meta.page ? true : false,
                meta_per_page: get_data.render?.meta.perPage ? true : false,
                meta_total: get_data.render?.meta.total ? true : false,
                meta_total_page: get_data.render?.meta.total_page
                    ? true
                    : false,
            }),
        ).toBe(
            JSON.stringify({
                total_find: 2,
                meta_page: true,
                meta_per_page: true,
                meta_total: true,
                meta_total_page: true,
            }),
        );
    });

    test("CRUD : detail", async () => {
        const get_data: any = await Service.detail("3"); // +1 because superman
        expect(get_data.render.username).toBe(users[1].username);
    });

    test("CRUD : edit", async () => {
        const new_username = "mantap_guys";
        const select_target_id = "3";
        await Service.edit(select_target_id, undefined, new_username);
        const get_data: any = await Service.detail(select_target_id);
        expect(get_data.render.username).toBe(new_username);
    });

    test("CRUD : remove", async () => {
        const select_target_id = "4";
        await Service.remove(select_target_id); // comment this...
        const get_data: any = await Service.detail(select_target_id);
        expect(get_data.render).toBe(false);
    });

    // test("filename : function", async () => {
    //   //
    // });
});
