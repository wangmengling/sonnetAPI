import RoleController from "../../Controllers/RoleController";


module.exports = (router) => {
    router.post("/role/list",RoleController.list);
    router.post("/role/add",RoleController.add);
}