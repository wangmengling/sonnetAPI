import ColorController from "../../Controllers/ColorController";
import Auth from "../../Config/Auth";

module.exports = (router) => {
    router.post("/color/list",Auth,ColorController.list);
    router.post("/color/add",Auth,ColorController.add);
    router.post("/color/update",Auth,ColorController.update);
    router.post("/color/delete",Auth,ColorController.delete);
}