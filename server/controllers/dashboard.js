export const dashboard = async (req, res) => {
  const userEmail = req.user.email;
  const userId = req.params.id;
  console.log("Hello and welcome:", userId);
  res.json({ message: userEmail });
};
