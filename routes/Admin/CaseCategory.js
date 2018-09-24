import CaseCategoryController from "../../Controllers/CaseCategoryController";
import Auth from "../../Config/Auth";

module.exports = (router) => {
    router.post("/caseCategory/list",Auth,CaseCategoryController.list);
    router.post("/caseCategory/add",Auth,CaseCategoryController.add);
    router.post("/caseCategory/update",Auth,CaseCategoryController.update);
    router.post("/caseCategory/delete",Auth,CaseCategoryController.delete);
}