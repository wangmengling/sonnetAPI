import StyleController from "../../Controllers/StyleController";
import Auth from "../../Config/Auth";

module.exports = (router) => {
    router.post("/style/list",Auth,StyleController.list);
    router.post("/style/add",Auth,StyleController.add);
    router.post("/style/update",Auth,StyleController.update);
    router.post("/style/delete",Auth,StyleController.delete);
}