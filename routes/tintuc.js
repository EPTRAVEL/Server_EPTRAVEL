const tintucControllers = require("../controllers/tintucControllers");
const router = require("express").Router();

//add tintuc
// router.post(
//   "/addtintuc",
// //   tintucControllers.uploadTintucImg,
//   tintucControllers.addTintuc
// //   tintucControllers.reSetImg
// );

router.post("/add", tintucControllers.uploadTintucImg ,tintucControllers.addTintuc, tintucControllers.reSetImg)

router.get("/", tintucControllers.getAllTintuc);

// router.get("/khuyenmai", tintucControllers.getTintucKhuyenMai);

router.patch(
  "/:id",
  tintucControllers.uploadTintucImg,
  tintucControllers.patchTintuc,
  tintucControllers.reSetImg
);

router.delete("/:id", tintucControllers.deleteTintuc);
module.exports = router;
