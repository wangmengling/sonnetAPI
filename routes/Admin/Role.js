import RoleController from "../../Controllers/RoleController";
import Auth from "../../Config/Auth";

module.exports = (router) => {
    router.post("/role/list",Auth,RoleController.list);
    router.post("/role/add",Auth,RoleController.add);
    router.post("/role/update",Auth,RoleController.update);
    router.post("/role/delete",Auth,RoleController.delete);
}