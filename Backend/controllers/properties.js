const Properties = require("../Models/properties");
const errors = require("../utils/error");
const { verifyAdmin } = require("../utils/verifytoken");



const multer = require('multer');
const path = require('path');



// Storing property images

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  // limits:{fileSize: 1000000},
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).array('uploadedImages');

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}




//creating property
const postproperty = async (req, res, next) => {







  upload(req, res, (err) => {

    console.log("called")

    if (err) {
      res.send( {
        msg: err
      });
    } else {
      if (req.file == undefined) {
        res.send( {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.send( {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });







  // try {
  //   const post = new Properties({
  //     img: req.body.image,
  //     title: req.body.propertytitle,
  //     price: req.body.price,
  //     propertyType: req.body.propertytype,
  //     city: req.body.city,
  //     purpose: req.body.purpose,
  //     location: req.body.location,
  //     washrooms: req.body.bath,
  //     landArea: req.body.area,
  //     bedrooms: req.body.rooms,
  //     kitchen: req.body.kitchen,
  //     storeroom: req.body.storeroom,
  //     description: req.body.description,
  //     owner: req.body.owner,
  //   });
  //   console.log(req.body);
  //   await post.save();
  //   res.status(200).send("Property has been Listed");
  // } catch (error) {
  //   next(error);
  // }







};

// const getProperty = async (req, res, next) => {
//   try {
//     console.log("getting All documents");
//     const detail = await Properties.find({}).populate("owner").exec();
//     // const property = await Properties.find({}).populate('owner').exe();
//     detail && res.status(200).json(detail);
//   } catch (error) {
//     next(error);
//   }
// };

const getProperty = async (req, res) => {
  res.json(res.paginatedResults);
};

//getting properties with owner information

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;

    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results.results;

      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}

//edit property
const editProperty = async (req, res, next) => {
  try {
    const property = await Properties.findById(req.params.id);
    if (String(property.owner._id) === req.body.owner || verifyAdmin)
      try {
        const updated = await Properties.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        updated && res.status(200).json(updated);
      } catch (error) {
        next(error);
      }
    else {
      next(errors.createError(401, "You can only update your Property"));
    }
  } catch (error) {
    next(error);
  }
};

//delete a property
const deleteProperty = async (req, res, next) => {
  try {
    const property = await Properties.findById(req.params.id);
    console.log(property);
    console.log(property.owner);
    if (String(property.owner._id) === req.body.owner || verifyAdmin)
      try {
        const deleteProperty = await Properties.findByIdAndDelete(
          req.params.id
        );
        deleteProperty && res.status(200).json(deleteProperty);
        console.log("SuccessFully Deleted property");
      } catch (error) {
        console.log(error);
      }
    else {
      next(errors.createError(401, "you can only delete your property"));
      console.log("You can delete only your property");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postproperty,
  getProperty,
  editProperty,
  deleteProperty,
  paginatedResults,
};
