import Notification from "../models/notification-model.js";
import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in getUserProfile:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString()) {
      return res
        .status(400)
        .json({ error: "You can't follow/unfollow yourself" });
    }

    if (!userToModify || !currentUser) {
      return res.status(400).json({ error: "User not found" });
    }

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      // unfollow the user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      //follow the user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });

      //send notification to the user
      const newNotification = new Notification({
        type: "follow",
        from: req.user._id,
        to: userToModify._id,
      });

      await newNotification.save();

      //TODO: return the id of the user as a response
      res.status(200).json({ message: "User followed Successfully" });
    }
  } catch (error) {
    console.log("Error in followUnfollowUser:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// export const getSuggestedUsers = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     //to ensure not get suggestion of already followed user
//     const usersFollowedByMe = await User.findById(userId).select("following");

//     const users = await User.aggregate([
//       {
//         $match: {
//           _id: { $ne: userId },
//         },
//       },
//       { $sample: { size: 10 } }, //get the 10 user from db for suggestion
//     ]);

//     const filteredUsers = users.filter(
//       (user) => !usersFollowedByMe.following.includes(user._id)
//     );

//     const suggestedUsers = filteredUsers.slice(0, 4);

//     suggestedUsers.forEach((user) => (user.password = null));

//     res.status(200).json(suggestedUsers);
//   } catch (error) {}
// };

export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch users followed by the requesting user
    const { following } = await User.findById(userId).select("following");

    // Find users not followed by the requesting user
    const suggestedUsers = await User.find(
      { _id: { $ne: userId, $nin: following } }, // Not equal to the requesting user and not in the following array
      { password: 0 } // Exclude password field from the result
    )
      .limit(4) // Limit to 4 users
      .lean(); // Convert mongoose documents to plain JavaScript objects

    res.status(200).json(suggestedUsers);
  } catch (error) {
    console.error("Error in getSuggestedUsers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const { fullName, email, username, currentPassword, newPassword, bio, link } =
    req.body;
  let { profileImg, coverImg } = req.body;

  const userId = req.user._id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.json(404).json({ message: "User not found" });
    }
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
    }
    if (
      (!newPassword && currentPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res
        .status(400)
        .json({ error: "Please provide both current pass and new pass" });
    }

    if (currentPassword && newPassword) {
      if (currentPassword === newPassword) {
        return res.status(400).json({
          error: "New password must be different from current password",
        });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: "Current pass is incorrect" });
      }
      const passRegex = /\s/
      if (passRegex.test(newPassword)) {
        return res.status(400).json({
          error: "Password cannot contain spaces",
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          error: "Password must be atleast 6 characters long or more",
        });
      }

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(newPassword, salt);
    }

    if (profileImg) {
      if (user.profileImg) {
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadedResponse.secure_url;
    }
    if (coverImg) {
      if (user.coverImg) {
        await cloudinary.uploader.destroy(
          user.coverImg.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(coverImg);
      coverImg = uploadedResponse.secure_url;
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;

    user = await user.save();
    user.password = undefined; //instead of null

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in updateUser:", error.message);
    res.status(500).json({ error: error.message });
  }
};
