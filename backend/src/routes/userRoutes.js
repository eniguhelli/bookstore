const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const auth = require('../middlewares/authMiddleware'); 
const role = require('../middlewares/roleMiddleware'); // admin role check

router.get('/', auth, role(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password'); 
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Update user
router.put('/:id', auth, role(['admin']), async (req, res) => {
  const { name, email, role: userRole } = req.body
  try {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({message:"User not found"})
    user.name = name || user.name
    user.email = email || user.email
    user.role = userRole || user.role
    await user.save()
    res.json(user)
  } catch(e){ console.error(e); res.status(500).json({message:"Error updating user"}) }
})

// Delete user
router.delete('/:id', auth, role(['admin']), async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({message:"User not found"})
    await user.remove()
    res.json({message:"User deleted"})
  } catch(e){ console.error(e); res.status(500).json({message:"Error deleting user"}) }
})


module.exports = router;
