import video from "../Modals/video.js";
import Points from "../Modals/Points.js";

export const uploadvideo = async (req, res) => {
  if (req.file === undefined) {
    return res
      .status(404)
      .json({ message: "plz upload a mp4 video file only" });
  } else {
    try {
      const file = new video({
        videotitle: req.body.videotitle,
        filename: req.file.originalname,
        filepath: req.file.path.replace(/\\/g, "/"),
        filetype: req.file.mimetype,
        filesize: req.file.size,
        videochanel: req.body.videochanel,
        uploader: req.body.uploader,
      });
      await file.save();
      return res.status(201).json("file uploaded successfully");
    } catch (error) {
      console.error(" error:", error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
};
export const getallvideo = async (req, res) => {
  try {
    const files = await video.find();
    return res.status(200).send(files);
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const increasePoints = async (req, res) => {
  
  const { email } = req.body; 
  console.log(email);
  try {
    let user = await Points.findOne({ email });

    if (!user) {
   
      const newUser = new Points({
        email,
        points: 5,
      });
      await newUser.save();
      return res.status(201).json({ message: "User created with 5 points", points: newUser.points });
    } else {
    
      user.points += 5;
      await user.save();
      return res.status(200).json({ message: "Points increased by 5", points: user.points });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const handlePoints = async (req, res) => {

  try {
    const {email} = req.body;
    console.log(email);
    const userPoints = await Points.findOne({ email });
if (!userPoints) {
  return res.status(404).json({ message: "User not found" });
}
return res.status(200).json(userPoints);
  } catch (error) {
    return res.status(500).json({message: "Server Error"})
  }
};


