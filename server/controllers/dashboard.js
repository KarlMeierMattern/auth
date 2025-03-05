export const dashboard = async (req, res) => {
  const userEmail = req.user.email;
  res.json({ message: userEmail });
};
