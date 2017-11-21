import RoleController from "../../Controllers/RoleController";
import Auth from "../../Config/Auth";

module.exports = (router) => {
    router.post("/role/list",Auth,RoleController.list);
    router.post("/role/add",Auth,RoleController.add);
}