import CaseController from "../../Controllers/CaseController";
import Auth from "../../Config/Auth";

module.exports = (router) => {
    router.post("/case/list",Auth,CaseController.list);
    router.post("/case/addBase",Auth,CaseController.addBase);
    router.post("/case/updateImageUrl",Auth,CaseController.updateImageUrl);
    router.post("/case/detailById",Auth,CaseController.detailById);
    router.post("/case/update",Auth,CaseController.updateCase);
    // router.post("/case/delete",Auth,CaseController.delete);
}