const express = require('express');
const router = express.Router();

const User = require("../models/user");
const AllPost = require("../models/allPosts");
const UnivPost = require("../models/universityPosts");
const Resources = require("../models/Resources");
const UniversityData = require('../models/universitydata');
const AdminPosts = require('../models/AdminPosts');
const HashtagPost = require('../models/hashtagPost');
const HashTagUniv = require('../models/hashTagUniv');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const reqLogin = require('../middleware/reqLogin');

const crypto = require('crypto');
const { sendVerificationEmail, sendResetEmail } = require('../utils/services');



router.post("/signup", async (req, res) => {
    const { email, password, name, university } = req.body;
    if (!email || !password || !name) {
        return res.json({success:false, message: "Add all the data" });
    }
    User.findOne({ email: email }).then((SavedUser) => {
        if (SavedUser) {
            return res.json({success:false, message: "User Already Exists" });
        }
        bcrypt.hash(password, 8)
            .then(async (hashedpassword) => {
                const user = new User({
                    email,
                    password: hashedpassword,
                    name,
                    avatar: req.body.avatar,
                    university
                });
                await user.save()
                    .then(async (user) => {
                        const emailToken = crypto.randomBytes(20).toString("hex");
                        await sendVerificationEmail(user.email,emailToken);
                        res.status(201).json({success:true,message: "User Signup Successfull,Please Verify Your Email" });
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    })
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
        return res.status(422).json({success:false,message: "Please add email and password both" })
    }
    await User.findOne({email})
        .then(SavedUser => {
            if (!SavedUser) {
                return res.status(201).json({success:false,error: 'Invalid email or password' });
            }
            if (SavedUser.verified === false) {
                return res.status(201).json({success:false,error: 'Please Verify your Email' });
            }
            bcrypt.compare(password, SavedUser.password)
                .then((doMatch) => {
                    if (doMatch) {
                        const token = jwt.sign({ _id: SavedUser._id }, "CollegeDostJS")
                        console.log(token);
                        const { _id, name, email, university, avatar, isAdmin, confirmed } = SavedUser;
                        return res.status(201).json({success:true,token, user: { _id, name, email, university, avatar, isAdmin, confirmed } });
                    } else {
                        return res.status(201).send({ success:false, error: 'Invalid email or password' })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
});


router.post("/createglobalpost", reqLogin, async (req, res) => {
    const { body } = req.body;
    if (!body) {
        res.status(422).json({ error: "Kuch toh daldo" });
    }
    const post = new AllPost({
        body: req.body.body,
        postedBy: req.user._id,
        hashtag: req.body.hashtag,
        photo: req.body.pic ? req.body.pic : ""
    });
    await post.save().then(async (result) => {
        if (result.hashtag) {
            for (var i = 0; i < req.body.hashtag.length; i++) {
                console.log(req.body.hashtag[i]);
                const findHashtag = await HashtagPost.findOneAndUpdate({ hashTagtext: req.body.hashtag[i] }, {
                    $inc: {
                        postCounts: 1
                    }
                });
                if (!findHashtag) {
                    const hashtag = await new HashtagPost({
                        hashTagtext: req.body.hashtag[i].toString(),
                    });
                    await hashtag.save().then((resd) => {
                        console.log(hashtag);
                    })
                } else {
                    console.log("Else Block");
                }
            }
        }
        res.json({ post: result })
        console.log("Successfully posted" + result);
    })
        .catch(err => {
            console.log(err);
        })
});



router.post("/createuniversitypost", reqLogin, async (req, res) => {
    const { body } = req.body;
    if (!body) {
        res.status(422).json({ error: "Kuch toh daldo" });
    }
    const post = new UnivPost({
        body: req.body.body,
        university: req.user.university,
        postedBy: req.user._id,
        hashtag: req.body.hashtag,
        photo: req.body.pic ? req.body.pic : ""
    });

    await post.save().then(async (result) => {
        if (result.hashtag) {
            for (var i = 0; i < req.body.hashtag.length; i++) {
                const findHashtag = await HashTagUniv.findOneAndUpdate({ hashTagtext: req.body.hashtag[i] }, {
                    $inc: {
                        postCounts: 1
                    },
                    universityName: req.user.university
                });
                if (!findHashtag) {
                    const hashtag = await new HashTagUniv({
                        hashTagtext: req.body.hashtag[i].toString(),
                        universityName: req.user.university

                    });
                    await hashtag.save().then((resd) => {

                        console.log(hashtag);
                    })
                } else {
                    console.log("Else Block");
                }
            }
        }

        res.json({ post: result })
    })
        .catch(err => {
            console.log(err);
        })
});



router.get('/globalposts', reqLogin, async (req, res) => {
    await AllPost.find()
        .sort('-createdAt')
        .populate("postedBy", "email name university avatar _id")
        .populate("comments.commentedBy", "name email avatar")
        .then(posts => {
            res.json({ posts })
        })
        .catch((err) => {
            console.log(err)
        })
});


router.get('/universityPosts', reqLogin, async (req, res) => {
    await UnivPost.find({ university: req.user.university })
        .sort('-createdAt')
        .populate("postedBy", "email name university avatar _id")
        .populate("comments.commentedBy", "email name university avatar _id")
        .then(post => {
            res.status(201).json({ post })
        })
        .catch(err => {
            console.log(err);
        })
});



router.put('/mainlike', reqLogin, (req, res) => {
    AllPost.findByIdAndUpdate(req.body.postId, {
        $push: {
            likes: req.user._id
        }
    }, {
        new: true
    })
        .populate("postedBy", "name _id avatar").then((s) => {
            res.status(201).json(s)
        })
});

router.post('/addUniversity', (req, res) => {
    const newUniv = new UniversityData({
        universityName: req.body.universityName,
        universityAddress: req.body.universityAddress
    });

    newUniv.save().then((resd) => {
        res.json(resd);
    }).catch((e) => {
        res.json(e);
    })
});

router.post('/getUserDetails', (req, res) => {
    const _id = req.body.id;
    User.findById({ _id }).then((result) => {
        res.json(result);
    })
});



router.put('/takebackmainlike', reqLogin, async (req, res) => {
    await AllPost.findByIdAndUpdate(req.body.id, {
        $pull: {
            likes: req.user._id
        }
    }, {
        new: true
    })
        .populate("postedBy", "name _id avatar").then((s) => {
            res.status(201).json(s)
        })
});


router.put('/maindislike', reqLogin, async (req, res) => {
    console.log(req.body.id)
    await AllPost.findByIdAndUpdate(req.body.id, {
        $push: {
            dislikes: req.user._id
        }
    }, {
        new: true
    })
        .populate("postedBy", "name _id avatar").then((s) => {
            res.status(201).json(s)
        })

});

router.put('/univdislike', reqLogin, (req, res) => {
    console.log(req.body.postId)
    UnivPost.findByIdAndUpdate(req.body.id, {
        $push: {
            dislikes: req.user._id
        }
    }, {
        new: true
    })
        .populate("postedBy", "name _id avatar").then((s) => {
            res.status(201).json(s)
        })

});


router.put('/takebackmaindislike', reqLogin, async (req, res) => {
    await AllPost.findByIdAndUpdate(req.body.id, {
        $pull: {
            dislikes: req.user._id
        }
    }, {
        new: true
    })
        .populate("postedBy", "name _id avatar").then((s) => {
            res.status(201).json(s)
        })
});

router.put('/takebackunivdislike', reqLogin, async (req, res) => {
    await UnivPost.findByIdAndUpdate(req.body.id, {
        $pull: {
            dislikes: req.user._id
        }
    }, {
        new: true
    })
        .populate("postedBy", "name _id avatar").then((s) => {
            res.status(201).json(s)
        })
});


router.put('/takebackunivlike', reqLogin, async (req, res) => {
    await UnivPost.findByIdAndUpdate(req.body.id, {
        $pull: {
            likes: req.user._id
        }
    }, {
        new: true
    })
        .populate("postedBy", "name _id avatar").then((s) => {
            res.status(201).json(s)
        })
});

router.put('/univlike', reqLogin, async (req, res) => {
    await UnivPost.findByIdAndUpdate(req.body.postId, {
        $push: {
            likes: req.user._id
        }
    }, {
        new: true
    })
        .populate("postedBy", "name _id avatar").then((s) => {
            res.status(201).json(s)
        })
});


router.put('/maincomment', reqLogin, async (req, res) => {

    const comment = {
        text: req.body.text,
        commentedBy: req.user._id
    }

    await AllPost.findByIdAndUpdate(req.body.postId, {
        $push: {
            comments: comment
        },
        hasBeenCommented: true
    }, {
        new: true
    })
        .populate("postedBy", "name _id avatar").then((sd) => {
            console.log(sd)
            res.status(201).json(sd)
        });

});


router.get('/getUnivs', async (req, res) => {
    const getUni = await UniversityData.find({});
    console.log(getUni);
        res.status(201).json(getUni);
});


router.put('/univcomment', reqLogin, async (req, res) => {

    const comment = {
        text: req.body.text,
        commentedBy: req.user._id
    }

    await UnivPost.findByIdAndUpdate(req.body.postId, {
        $push: {
            comments: comment
        },
        hasBeenCommented: true
    }, {
        new: true
    })
        .populate("postedBy", "name _id avatar").then((sd) => {
            res.status(201).json(sd)
        })
});


router.delete('/maindelete/:postId', reqLogin, (req, res) => {
    AllPost.findOne({
        _id: req.params.postId
    })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                res.status(422).json({ error: err })
            } else {
                if (post.postedBy._id.toString() === req.user._id.toString()) {
                    post.remove()
                        .then(result => {
                            res.status(200).json(result)
                        }).catch((err) => {
                            console.log(err)
                        })
                }
            }
        })
});





router.delete('/univdelete/:postId', reqLogin, (req, res) => {
    UnivPost.findOne({
        _id: req.params.postId
    })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                res.status(422).json({ error: err })
            } else {
                if (post.postedBy._id.toString() === req.user._id.toString()) {
                    post.remove()
                        .then(result => {
                            res.status(200).json(result)
                        }).catch((err) => {
                            console.log(err)
                        })
                }
            }
        })
});



router.get('/resources', reqLogin, (req, res) => {
    Resources.find({ resourceUniversityName: req.user.university })
        .populate("resourceUploaderName", "name")
        .then(resources => {
            res.json({ resources });
        })
});


router.post('/addResources', reqLogin, async (req, res) => {
    const { resourcesname, resourceUrl } = req.body;
    if (!resourcesname || !resourceUrl) {
        res.status(422).json({ error: "Resources Kidhar Hai ??" });
    }
    const resource = new Resources({
        resourcesname,
        resourceUniversityName: req.user.university,
        resourceUrl,
        resourceUploaderName: req.user._id,
    });

    await resource.save().then(result => {
        res.status(201).json({ resource: result });
    })
        .catch(err => {
            console.log(err);
        })
});



router.get('/getResources', reqLogin, (req, res) => {
    Resources.find({ resourceUniversityName: req.user.university })
        .populate("resourceUploaderName", "name")
        .sort("-createdAt")
        .then((Recentresources) => {
            res.status(201).json({ Recentresources });
        })
});


router.post('/getSearched', reqLogin, async (req, res) => {
    let resourcePattern = new RegExp("^" + req.body.query)
    await Resources.find({
        $and: [{ resourcesname: { $regex: resourcePattern } },
        { resourceUniversityName: req.user.university }]
    })
        .populate("resourceUploaderName", "name")
        .then(resources => {
            res.json(resources);
        }).catch((e) => {
            console.log(e);
        });
});


router.post('/addPostToAdmin', reqLogin, async (req, res) => {
    const reportedPost = await AllPost.findById(req.body.id);
    if (reportedPost) {
        const adminPost = new AdminPosts({
            postId: reportedPost._id,
            body: reportedPost.body,
            photo: reportedPost.photo,
            postedBy: reportedPost.postedBy
        });
        await adminPost.save().then((p) => {
            res.status(201).json({success:true,p});
        });
    }
});




router.post('/addUnivPostToAdmin', reqLogin, async (req, res) => {
    const reportedPost = await UnivPost.findById(req.body.id);
    if (reportedPost) {
        const adminPost = new AdminPosts({
            postId: reportedPost._id,
            body: reportedPost.body,
            photo: reportedPost.photo,
            postedBy: reportedPost.postedBy,
            university: true
        });
        await adminPost.save().then(p => {
            res.status(201).json(p);
        });
    }
});

router.post('/getUserAdmin', async (req, res) => {
    let resourcePattern = new RegExp("^" + req.body.user)
    await User.find({ name: { $regex: resourcePattern } })
        .then(resources => {
            res.json(resources)
        }).catch((e) => {
            console.log(e);
        });
})


router.get('/getAdminPosts', async (req, res) => {
    const posts = await AdminPosts.find({});
    if (posts) {
        res.status(201).json(posts);
    } else {
        res.status(200).json("No Posts");
    }
});


router.get('/topHashtags', reqLogin, async (req, res) => {
    await HashtagPost.find({}).sort("-postCounts").limit(5).then((da) => {
        res.status(201).json(da)
    });
});

router.get('/topHashtagsUniv', reqLogin, async (req, res) => {
    await HashTagUniv.find({ universityName: req.user.university })
        .sort("-postCounts")
        .limit(5).then((s) => {
            res.status(201).json(s)
        })
});

router.post('/getHashtags', reqLogin, async (req, res) => {
    const getHashtagPost = await AllPost.find({ hashtag: req.body.hashtag })
        .sort('-createdAt')
        .populate("postedBy", "email name university avatar _id")
        .populate("comments.commentedBy", "name email _id avatar")
    if (getHashtagPost) {
        res.json(getHashtagPost);
    }
});


router.post('/getHashtagsPosts', reqLogin, async (req, res) => {
    const getHashtagPost = await UnivPost.find({ $and: [{ hashtag: req.body.hashtag }, { university: req.user.university }] })
        .sort('-createdAt')
        .populate("postedBy", "email name university avatar _id")
        .populate("comments.commentedBy", "name email _id avatar")
    if (getHashtagPost) {
        res.status(201).json(getHashtagPost);
    }
});


router.get('/getUserPost', reqLogin, async (req, res) => {
    const pd = await AllPost.find({ postedBy: req.user })
        .sort('-createdAt')
        .populate("postedBy", "email name university avatar _id")
        .populate("comments.commentedBy", "name email _id avatar")
    if (pd) {
        res.status(201).json(pd);
    }
});


router.get('/getUnivUserPost', reqLogin, async (req, res) => {
    const pd = await UnivPost.find({ postedBy: req.user })
        .sort('-createdAt')
        .populate("postedBy", "email name university avatar _id")
        .populate("comments.commentedBy", "name email _id avatar")
    if (pd) {
        res.status(201).json(pd);
    }
});

router.get('/getRecentResources', reqLogin, async (req, res) => {
    const resourceLatest = await Resources.find({ resourceUniversityName: req.user.university })
        .populate("resourceUploaderName", "name")
        .sort("-createdAt")
        .limit(5)

    if (resourceLatest) {
        res.status(201).json(resourceLatest);
    }
});


router.get('/getRecentPosts', reqLogin, async (req, res) => {
    const recentPosts = await AllPost.find({})
        .sort("-createdAt")
        .populate("postedBy", "email name university avatar _id")
        .limit(5)
    res.status(201).json(recentPosts);
});



router.get('/getRecentUnivPosts', reqLogin, async (req, res) => {
    const recentPosts = await UnivPost.find({ university: req.user.university })
        .populate("postedBy", "email name university avatar _id")
        .sort("-createdAt");

    res.status(201).json(recentPosts);
});


router.delete('/deletePost/:id', reqLogin, async (req, res) => {

    const getPost = await AllPost.findOne({ _id: req.params.id });
    if (getPost && getPost.postedBy._id.toString() === req.user._id.toString()) {
        await getPost.remove()
            .then((result) => {
                res.status(201).json(result)
                console.log(result);
            }).catch((err) => {
                console.log(err)
            });
    }
});



router.delete('/deleteAdminPost/:id', reqLogin, async (req, res) => {
    console.log("qbhvfjef");
    const getPost = await AllPost.findOne({ _id: req.params.id });
    const adminPost = await AdminPosts.findOne({ postId: req.params.id });
 
    if (getPost || adminPost) {

       await getPost.remove()
            .then(async (result) => {
                await adminPost.remove()
                res.status(201).json(result);
            }).catch((err) => {
                console.log(err)
            })
    }
});

router.delete('/deleteAdminUnivPost/:id', reqLogin, async (req, res) => {
    const getPost = await UnivPost.findOne({ _id: req.params.id });
    const adminPost = await AdminPosts.findOne({ postId: req.params.id });

    if (getPost || adminPost) {

        getPost.remove()
            .then(async (result) => {
                await adminPost.remove()
                res.status(201).json(result);
            }).catch((err) => {
                console.log(err)
            })
    }
});





router.delete('/deleteUnivPost/:id', reqLogin, async (req, res) => {
    const getPost = await UnivPost.findOne({ _id: req.params.id });

    if (getPost && getPost.postedBy._id.toString() === req.user._id.toString()) {
        getPost.remove()
            .then(result => {
                res.status(201).json(result);
            }).catch((err) => {
                console.log(err)
            })
    }
});


router.get('/getUserDetailsById/:id', reqLogin, async (req, res) => {
    const getDetails = await User.findById(req.params.id);
    if (getDetails) {
        res.status(201).json(getDetails);
    }
});


router.get('/getUnivUserPostById/:id', reqLogin, async (req, res) => {
    const getDetails = await User.findById(req.params.id);
    const getPosts = await UnivPost.find({ postedBy: getDetails })
        .sort('-createdAt')
        .populate("postedBy", "email name university avatar _id")
        .populate("comments.commentedBy", "name email _id avatar")

    if (getPosts) {
        res.status(201).json(getPosts);
    }
});



router.get('/getUserPostById/:id', reqLogin, async (req, res) => {
    const getDetails = await User.findById(req.params.id);
    const getPosts = await AllPost.find({ postedBy: getDetails })
        .sort('-createdAt')
        .populate("postedBy", "email name university avatar _id")
        .populate("comments.commentedBy", "name email _id avatar")

    if (getPosts) {
        res.status(201).json(getPosts);
    }
});


router.post('/searchuser', reqLogin,async (req, res) => {
    const keyword = req.body.query
        ? {
            $or: [
                { name: { $regex: req.body.query, $options: "i" } },
                { email: { $regex: req.body.query, $options: "i" } },
            ],
        }
        : {};
    const user = await User.find(keyword).find({ _id: { $ne: req.user._id } });

    res.status(201).json({ user });
});


router.get('/getBlockedUsers', reqLogin, async (req, res) => {
    await User.findById(req.user._id).select("blockedUsers")
        .populate("email avatar name").then((s) => {
            res.status(201).json(s)
        })
});


router.post('/deleteUser', reqLogin, async (req, res) => {
    const getPost = await User.findOne({ _id: req.body.query });
    if (getPost) {
       await getPost.remove()
            .then((result) => {
                res.status(201).json(result);
            }).catch((err) => {
                console.log(err)
            })
    }
});


router.put('/followUser/:id', reqLogin, async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
        $push: {
            followers: req.user._id
        }
    }, { new: true }).then(async (s) => {
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                following: req.params.id
            }
        }).then((d) => {
            res.status(201).json(d)
        })
    })
});


router.put('/unfollowUser/:id', reqLogin, async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
        $pull: {
            followers: req.user._id
        }
    }, { new: true }).then(async (s) => {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                following: req.params.id
            }
        }).then((d) => {
            res.status(201).json(d)
        })
    })
});

router.put('/blockUser/:id', reqLogin, async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $push: {
            blockedUsers: req.params.id
        }
    }).then(async (a) => {
        await User.findByIdAndUpdate(req.params.id, {
            $push: {
                blockedBy: req.user._id
            }
        }, { new: true }).then((s) => {
            res.status(201).json(s)
        })
    })
});

router.put('/unblockUser/:id', reqLogin.apply, async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $pull: {
            blockedUsers: req.params.id
        }
    }).then(async (a) => {
        await User.findByIdAndUpdate(req.params.id, {
            $pull: {
                blockedBy: req.user._id
            }
        }).then((s) => {
            res.status(201).json(s)
        })
    });
});



router.put('/deleteAllComment', reqLogin, async (req, res) => {
    if (req.user.isAdmin) {
        const pst = await AllPost.findByIdAndUpdate(req.body.postId, {
            $pull: {
                postComments: req.body.commentId
            }
        });

    }
    res.status(201).json({ message: "Comment Deleted" });
});


router.put('/deleteUnivComment', reqLogin, async (req, res) => {
    if (req.user.isAdmin) {
        const pst = await UnivPost.findByIdAndUpdate(req.body.postId, {
            $pull: {
                postComments: req.body.commentId
            }
        });
    }
    res.status(201).json({ message: "Comment Deleted" });
});





router.get('/getUsers', async (req, res) => {
    const users = await User.find({});
    res.status(201).json(users)
});


router.get('/loadUser',reqLogin,async (req, res) => {
    await User.findById(req.user._id).select("-password").then((u) => {
        res.status(201).json({ user: u });
    })
});



router.post('/forgotPassword', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const t = crypto.randomBytes(20).toString("hex");
            user.resetPasswordToken = t;
            user.resetPasswordExpire = Date.now() + 10 * 10 * 600;
            await user.save();
            const passwordLink = `${process.env.FRONTEND_URL}/resetPassword/${t}`;
            sendResetEmail(passwordLink, email);
            res.status(201).json({
                success: true,
                message: "Reset Password Link Sent"
            });
        } else {
             res.status(201).json({
                success: false,
                message: "Invalid Email"
            });
        }
    } catch (e) {
        res.status(401).json(e)
    }
});


router.post('/resetPassword/:token', async (req, res) => {
    const token = req.params.token;
    const { password } = req.body;
    const t = await User.findOne({
        $and: [{
            resetPasswordToken: token,
        }]
    });
    if (t) {
        const hashed = await bcrypt.hash(password, 8);
        await User.findOneAndUpdate({ email: t.email }, {
            password: hashed,
            resetPasswordToken:null,
            resetPasswordExpire: null
        });
        res.status(201).json({
            success:true,
            message: "Password Changed Successfully"
        })
    } else {
        res.status(201).json({
            success:false,
        })
    }
});


router.post('/user/verifyEmail', async (req, res) => {
    const token = req.body.token;
    const find = await User.findOne({ verifyEmailToken: token });
    if (find) {
        find.verified = true;
        find.verifyEmailToken = null;
        await find.save();
        return res.status(201).json({success:true, message: "User Verified Successfully" });
    }
    return res.status(201).json({success:false, message: "Invalid or Expired Token" });
});


module.exports = router;