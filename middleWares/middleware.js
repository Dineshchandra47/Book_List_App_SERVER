const { verify } = require('jsonwebtoken')
const user = require('../models/user');
const secret='secret'

const validateToken = (req, res, next) => {
    const accessToken = req.header("token");
    // const accessToken = req.header.authorization;
    console.log(accessToken)

    if (!accessToken) {
        return res.status(400).json({ message: "User not Logged In" })
    }

    try {
        verify(accessToken, secret, async (err, decode) => {
            if (err) {
                return res.status(400).json({ message: err.message })
            }
            const data = await user.findOne({ _id: decode.data })
            if (data) {
                req.user = data._id
                next()
            } else {
                res.json({ message: "failed" })
            }

        });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = { validateToken };


// router.put("/api/products/:product_id", validateToken, async (req, res) => {
//     try {
//       let product = await Products.find({
//         $and: [
//           { product_id: { $eq: req.params.product_id } },
//           { user: { $eq: req.user } },
//         ],
//       });
//       if (product.length > 0) {
//         const data = await Products.updateOne(
//           {
//             $and: [
//               { product_id: { $eq: req.params.product_id } },
//               { user: { $eq: req.user } },
//             ],
//           },
//           {
//             $set: { product_price: req.body.product_price },
//           }
//         );
//         console.log(data);
//         res.status(200).json({
//           status: "updated successfully",
//           data,
//         });
//       } else {
//         return res.status(501).json({
//           message: "product not found",
//         });
//       }
//     } catch (err) {
//       res.status(500).json({
//         status: "failed",
//         message: err.message,
//       });
//     }
//   });